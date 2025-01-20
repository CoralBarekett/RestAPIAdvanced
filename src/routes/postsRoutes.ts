import express from 'express';
const router = express.Router();
import postController from '../controllers/postController';
import { authMiddleware } from '../controllers/authController';

// Public routes
router.get('/:id', postController.getById.bind(postController));
router.get('/', postController.getAll.bind(postController));

// Protected routes - require authentication
router.post('/', authMiddleware, postController.create.bind(postController));
router.put('/:id', authMiddleware, postController.update.bind(postController));
router.delete('/:id', authMiddleware, postController.deleteItem.bind(postController));

export default router;