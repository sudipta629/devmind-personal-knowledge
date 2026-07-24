import { Request, Response } from 'express';
import { db } from '../config/firebase';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';

export const getArticles = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, category, tag, authorId } = req.query;
    let query: FirebaseFirestore.Query = db.collection('articles');

    if (status) query = query.where('status', '==', status);
    if (category) query = query.where('categorySlug', '==', category);
    if (tag) query = query.where('tags', 'array-contains', tag);
    if (authorId) query = query.where('author.id', '==', authorId);

    const snapshot = await query.orderBy('publishedAt', 'desc').get();
    const articles = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    res.json(articles);
  } catch (error) {
    console.error('Error fetching articles', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getArticleBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;
    const snapshot = await db.collection('articles').where('slug', '==', slug).limit(1).get();

    if (snapshot.empty) {
      res.status(404).json({ error: 'Article not found' });
      return;
    }

    const doc = snapshot.docs[0];
    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error('Error fetching article', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createArticle = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const user = req.user!;
    const data = req.body;
    
    const slug = data.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || 'untitled';
    
    const newArticle = {
      ...data,
      slug: slug + '-' + Math.random().toString(36).substr(2, 5),
      author: {
        id: user.uid,
        name: user.name || user.email?.split('@')[0],
        avatar: user.picture || ''
      },
      publishedAt: new Date().toISOString(),
      views: 0,
      status: data.status || 'PUBLISHED',
      createdAt: new Date().toISOString()
    };

    const docRef = await db.collection('articles').add(newArticle);
    res.status(201).json({ id: docRef.id, ...newArticle });
  } catch (error) {
    console.error('Error creating article', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateArticle = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  // Implementation...
  res.json({ message: 'Not implemented yet' });
};

export const deleteArticle = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  // Implementation...
  res.json({ message: 'Not implemented yet' });
};
