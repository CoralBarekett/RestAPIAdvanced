import express  from  'express';
const router = express.Router();
import Post from '../controllers/postController';

router.get('/:id', Post.getPostById);
router.get('/', Post.getAllPosts);
router.post('/', Post.createPost);
router.delete('/:id', Post.deletePost);
router.put('/:id', Post.updatePost);

export default router;