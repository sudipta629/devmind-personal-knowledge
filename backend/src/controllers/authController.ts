import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';
import { db } from '../config/firebase';

export const syncUser = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const user = req.user;
    if (!user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const userRef = db.collection('users').doc(user.uid);
    const doc = await userRef.get();

    if (!doc.exists) {
      const newUser = {
        id: user.uid,
        email: user.email,
        fullName: user.name || 'New User',
        username: user.email?.split('@')[0] || `user_${user.uid.substring(0, 5)}`,
        avatar: user.picture || '',
        createdAt: new Date().toISOString(),
      };
      await userRef.set(newUser);
      res.status(201).json({ message: 'User synced successfully', user: newUser });
    } else {
      res.status(200).json({ message: 'User already exists', user: doc.data() });
    }
  } catch (error) {
    console.error('Error syncing user', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
