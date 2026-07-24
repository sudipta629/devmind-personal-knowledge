import { Router } from 'express';
import { getArticles, getArticleBySlug, createArticle, updateArticle, deleteArticle } from '../controllers/articleController';
import { verifyToken } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', getArticles);
router.get('/:slug', getArticleBySlug);
router.post('/', verifyToken, createArticle);
router.put('/:id', verifyToken, updateArticle);
router.delete('/:id', verifyToken, deleteArticle);

export default router;
