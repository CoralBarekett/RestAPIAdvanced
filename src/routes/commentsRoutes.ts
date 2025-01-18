import express  from  'express';
const router = express.Router();
import commentController from '../controllers/commentController';

router.get('/:id', commentController.getById.bind(commentController));
router.get('/', commentController.getAll.bind(commentController));
router.post('/', commentController.create.bind(commentController));
router.delete('/:id', commentController.deleteItem.bind(commentController));
router.put('/:id', commentController.update.bind(commentController));


export default router;