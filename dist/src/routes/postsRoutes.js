"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const postController_1 = __importDefault(require("../controllers/postController"));
router.get('/:id', postController_1.default.getById.bind(postController_1.default));
router.get('/', postController_1.default.getAll.bind(postController_1.default));
router.post('/', postController_1.default.create.bind(postController_1.default));
router.delete('/:id', postController_1.default.deleteItem.bind(postController_1.default));
router.put('/:id', postController_1.default.update.bind(postController_1.default));
exports.default = router;
//# sourceMappingURL=postsRoutes.js.map