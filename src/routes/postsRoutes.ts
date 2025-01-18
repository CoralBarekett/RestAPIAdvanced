import express  from  'express';
const router = express.Router();
import postController from '../controllers/postController';

router.get('/:id', postController.getById.bind(postController));
router.get('/', postController.getAll.bind(postController));
router.post('/', postController.create.bind(postController));
router.delete('/:id', postController.deleteItem.bind(postController));
router.put('/:id', postController.update.bind(postController));

export default router;