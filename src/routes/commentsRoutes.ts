import express  from  'express';
const router = express.Router();
import commentController from '../controllers/commentController';
import { authMiddleware } from '../controllers/authController';

router.get('/:id', commentController.getById.bind(commentController));
router.get('/', commentController.getAll.bind(commentController));
router.post('/', authMiddleware, commentController.create.bind(commentController));
router.delete('/:id', authMiddleware, commentController.deleteItem.bind(commentController));
router.put('/:id', commentController.update.bind(commentController));


export default router;