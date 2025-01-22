import request from 'supertest';
import appInit from '../server';
import mongoose from 'mongoose';
import commentModel from '../models/commentModel';
import { Express } from 'express';

let app: Express;

beforeAll(async () => {
    console.log('Before all tests');
    app = await appInit();
    await commentModel.deleteMany();
});

afterAll(() => {
    console.log('After all tests');
    mongoose.connection.close();
});

let commentId = "";
const testComment = {
    comment: 'Test Comment 1',
    postId: "zxcvlker78ityknp4567uhnkl",
    owner: 'Coral'
}

const invalidComment = {
    comment: 'Test Comment 1',
}


describe("Comments test suite", () => {
    test("Comment test get all", async () => {
        const response = await request(app).get('/comments');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveLength(0);
    });

    test("Test adding new comment", async () => {
        const response = await request(app)
            .post('/comments')
            .send(testComment);
        expect(response.statusCode).toBe(201);
        expect(response.body.comment).toBe(testComment.comment);
        expect(response.body.postId).toBe(testComment.postId);
        expect(response.body.owner).toBe(testComment.owner);
        commentId = response.body._id;
    });

    test("Test adding invalid comment", async () => {
        const response = await request(app)
            .post('/comments')
            .send(invalidComment);
        expect(response.statusCode).toBe(400);
    });

    test("Test get all comments after adding", async () => {
        const response = await request(app).get('/comments');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveLength(1);
    });

    test("Test get comment by id", async () => {
        const response = await request(app).get('/comments/' + commentId);
        expect(response.statusCode).toBe(200);
        expect(response.body._id).toBe(commentId);
        // expect(response.body.comment).toBe(testComment.comment);
        // expect(response.body.postId).toBe(testComment.postId);
        // expect(response.body.owner).toBe(testComment.owner);
    });

    test("Test get comment by owner", async () => {
        const response = await request(app).get('/comments?owner=' + testComment.owner);
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0].owner).toBe(testComment.owner);
    });

    // Test get comment with invalid commentId
    test("Test get comment with invalid commentId", async () => {
        const response = await request(app).get('/comments/zxdcui34589gbbnm9gh');
        expect(response.statusCode).toBe(400);
    });

    // Test get non-existent comment
    test("Test get non-existent comment", async () => {
        const response = await request(app).get('/comments/' + new mongoose.Types.ObjectId());
        expect(response.statusCode).toBe(404);
    });

    test("Test update comment", async () => {
        const response = await request(app)
            .put('/comments/' + commentId)
            .send({ comment: 'Updated Comment' });
        expect(response.statusCode).toBe(200);
        expect(response.body.comment).toBe('Updated Comment');
    });

    // Test update comment with invalid postId
    test("Test update comment with invalid postId", async () => {
        const response = await request(app)
            .put('/comments/a3s4d56g8b90j9hgf6ds4')
            .send(testComment);
        expect(response.statusCode).toBe(400);
    });

    test('Test delete comment', async () => {
        const response = await request(app).delete('/comments/' + commentId);
        expect(response.statusCode).toBe(200);
    });

    // Test delete with invalid commentId
    test("Test delete comment with invalid commentId", async () => {
        const response = await request(app).delete('/comments/as45xcfg89hvc6d5sd6f7g8h');
        expect(response.statusCode).toBe(400);
    });

});