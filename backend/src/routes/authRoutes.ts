import { Router } from 'express';
import { syncUser } from '../controllers/authController';
import { verifyToken } from '../middlewares/authMiddleware';

const router = Router();

// Endpoint for frontend to sync newly registered/logged in user to Firestore
router.post('/sync', verifyToken, syncUser);

export default router;
