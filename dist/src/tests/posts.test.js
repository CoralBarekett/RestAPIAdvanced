"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const mongoose_1 = __importDefault(require("mongoose"));
const postModel_1 = __importDefault(require("../models/postModel"));
const testPosts_json_1 = __importDefault(require("./testPosts.json"));
const testPosts = testPosts_json_1.default;
let app;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Before all tests');
    app = yield (0, server_1.default)();
    yield postModel_1.default.deleteMany();
}));
afterAll(() => {
    console.log('After all tests');
    mongoose_1.default.connection.close();
});
describe("Posts test", () => {
    test("Test get all post empty", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/posts');
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(0);
    }));
    test("Test create new post", () => __awaiter(void 0, void 0, void 0, function* () {
        for (let post of testPosts) {
            const response = yield (0, supertest_1.default)(app)
                .post('/posts')
                .send(post);
            expect(response.statusCode).toBe(201);
            expect(response.body.title).toBe(post.title);
            expect(response.body.content).toBe(post.content);
            expect(response.body.owner).toBe(post.owner);
            post._id = response.body._id;
        }
    }));
    // Test invalid post creation
    test("Test create new post fail", () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidPost = {
            title: 'Test Post 1',
            content: 'Test content 1',
        };
        const response = yield (0, supertest_1.default)(app)
            .post('/posts')
            .send(invalidPost);
        expect(response.statusCode).toBe(400);
    }));
    test("Test get all post", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/posts');
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(testPosts.length);
    }));
    test("Test get post by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/posts/' + testPosts[0]._id);
        expect(response.statusCode).toBe(200);
        expect(response.body._id).toBe(testPosts[0]._id);
    }));
    // Test get post with invalid ID
    test("Test get post with invalid id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/posts/invalidid');
        expect(response.statusCode).toBe(400);
    }));
    // Test get non-existent post
    test("Test get non-existent post", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/posts/' + new mongoose_1.default.Types.ObjectId());
        expect(response.statusCode).toBe(404);
    }));
    test("Test filter post by owner", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/posts?owner=' + testPosts[0].owner);
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
    }));
    test("Test update post", () => __awaiter(void 0, void 0, void 0, function* () {
        const newPost = {
            title: 'Test Post 1 updated',
            content: 'Test Post 1 content updated',
            owner: 'Coral'
        };
        const response = yield (0, supertest_1.default)(app)
            .put('/posts/' + testPosts[0]._id)
            .send(newPost);
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe(newPost.title);
        expect(response.body.content).toBe(newPost.content);
        expect(response.body.owner).toBe(newPost.owner);
    }));
    // Test update with invalid ID
    test("Test update post with invalid id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .put('/posts/invalidid')
            .send(testPosts[0]);
        expect(response.statusCode).toBe(400);
    }));
    test('Test delete post', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).delete('/posts/' + testPosts[0]._id);
        expect(response.statusCode).toBe(200);
        const responseGet = yield (0, supertest_1.default)(app).get('/posts/' + testPosts[0]._id);
        expect(responseGet.statusCode).toBe(404);
    }));
    // Test delete with invalid ID
    test("Test delete post with invalid id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).delete('/posts/invalidid');
        expect(response.statusCode).toBe(400);
    }));
});
//# sourceMappingURL=posts.test.js.map