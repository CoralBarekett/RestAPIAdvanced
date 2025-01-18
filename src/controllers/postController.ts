import postModel from '../models/postModel';
import { Request, Response } from 'express';

const getPostById = async (req: Request, res: Response): Promise<void> => {
    const postId = req.params.id;
    try {
        console.log('Posts get by id service');
        const post = await postModel.findById(postId);
        if (!post) {
            res.status(404).send('Post not found');
        } else {
            res.status(200).send(post);
        }
    } catch (error: any) {
        res.status(400).send(error.message);
    }
};

const getAllPosts = async (req: Request, res: Response): Promise<void> => {
    const ownerFilter = req.query.owner as string | undefined;
    try {
        console.log('Posts get all posts service');
        if (ownerFilter) {
            const posts = await postModel.find({ owner: ownerFilter });
            res.status(200).send(posts);
        } else {
            const posts = await postModel.find();
            res.status(200).send(posts);
        }
    } catch (error: any) {
        res.status(400).send(error.message);
    }
};

const createPost = async (req: Request, res: Response): Promise<void> => {
    const post = req.body;
    try {
        console.log('Posts create service');
        const newPost = await postModel.create(post);
        res.status(201).send(newPost);
    } catch (error: any) {
        res.status(400).send(error.message);
    }
};

const deletePost = async (req: Request, res: Response): Promise<void> => {
    const postId = req.params.id;
    try {
        console.log('Posts delete service');
        const post = await postModel.findByIdAndDelete(postId);
        if (!post) {
            res.status(404).send('Post not found');
        } else {
            res.status(200).send(post);
        }
    } catch (error: any) {
        res.status(400).send(error.message);
    }
};

const updatePost = async (req: Request, res: Response): Promise<void> => {
    const postId = req.params.id;
    const post = req.body;
    try {
        console.log('Posts update service');
        const updatedPost = await postModel.findByIdAndUpdate(postId, post, { new: true });
        if (!updatedPost) {
            res.status(404).send('Post not found');
        } else {
            res.status(200).send(updatedPost);
        }
    } catch (error: any) {
        res.status(400).send(error.message);
    }
};

export default {
    getPostById,
    getAllPosts,
    createPost,
    deletePost,
    updatePost,
};