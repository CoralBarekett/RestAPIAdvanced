import request from 'supertest';
import appInit from '../server';
import mongoose from 'mongoose';
import postModel from '../models/postModel';
import testPostsData from './testPosts.json';
const testPosts: Post[] = testPostsData as Post[];
import { Express } from 'express';

interface Post {
    title: string;
    content: string;
    owner: string;
    _id?: string;
}

let app: Express;

beforeAll(async () => {
    console.log('Before all tests');
    app = await appInit();
    await postModel.deleteMany();
});

afterAll(() => {
    console.log('After all tests');
    mongoose.connection.close();
});

describe("Posts test", () => {
    test("Test get all post empty", async () => {
        const response = await request(app).get('/posts');
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(0);
    });

    test("Test create new post", async () => {
        for (let post of testPosts) {
            const response = await request(app)
                .post('/posts')
                .send(post);
            expect(response.statusCode).toBe(201);
            expect(response.body.title).toBe(post.title);
            expect(response.body.content).toBe(post.content);
            expect(response.body.owner).toBe(post.owner);
            (post as Post)._id = response.body._id;
        }
    });

    // Test invalid post creation
    test("Test create invalid post", async () => {
        const invalidPost =
        {
            title: 'Test Post 1',
            content: 'Test content 1',
        };
        const response = await request(app)
            .post('/posts')
            .send(invalidPost);
        expect(response.statusCode).toBe(400);
    });

    test("Test get all post", async () => {
        const response = await request(app).get('/posts');
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(testPosts.length);
    });

    test("Test get post by id", async () => {
        const response = await request(app).get('/posts/' + testPosts[0]._id);
        expect(response.statusCode).toBe(200);
        expect(response.body._id).toBe(testPosts[0]._id);
    });

    // Test get post with invalid ID
    test("Test get post with invalid id", async () => {
        const response = await request(app).get('/posts/invalidid');
        expect(response.statusCode).toBe(400);
    });

    // Test get non-existent post
    test("Test get non-existent post", async () => {
        const response = await request(app).get('/posts/' + new mongoose.Types.ObjectId());
        expect(response.statusCode).toBe(404);
    });

    test("Test get post by owner", async () => {
        const response = await request(app).get('/posts?owner=' + testPosts[0].owner);
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
    });

    test("Test update post", async () => {
        const newPost = {
            title: 'Test Post 1 updated',
            content: 'Test Post 1 content updated',
            owner: 'Coral'
        };
        const response = await request(app)
            .put('/posts/' + testPosts[0]._id)
            .send(newPost);
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe(newPost.title);
        expect(response.body.content).toBe(newPost.content);
        expect(response.body.owner).toBe(newPost.owner);
    });

    // Test update with invalid ID
    test("Test update post with invalid id", async () => {
        const response = await request(app)
            .put('/posts/invalidid')
            .send(testPosts[0]);
        expect(response.statusCode).toBe(400);
    });

    test('Test delete post', async () => {
        const response = await request(app).delete('/posts/' + testPosts[0]._id);
        expect(response.statusCode).toBe(200);

        const responseGet = await request(app).get('/posts/' + testPosts[0]._id);
        expect(responseGet.statusCode).toBe(404);
    });

    // Test delete with invalid ID
    test("Test delete post with invalid id", async () => {
        const response = await request(app).delete('/posts/s45d6fvbuj9gfh8jinf67gh');
        expect(response.statusCode).toBe(400);
    });

});