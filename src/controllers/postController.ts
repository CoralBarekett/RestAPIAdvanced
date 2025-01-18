import postModel, { IPost } from "../models/postModel";
import { Request, Response } from "express";
import BaseController from "./baseController";

class PostsController extends BaseController<IPost> {
    constructor() {
        super(postModel);
    }

    async create(req: Request, res: Response): Promise<void> {
        const post = {
            ...req.body
        }
        req.body = post;
        await super.create(req, res);
    }
}

export default new PostsController();