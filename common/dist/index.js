"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogInput = exports.createBlogInput = exports.signupInput = exports.siginInput = void 0;
const zod_1 = __importDefault(require("zod"));
exports.siginInput = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string(),
});
exports.signupInput = zod_1.default.object({
    email: zod_1.default.string().email({
        message: 'Invalid email',
    }),
    password: zod_1.default.string().min(6, {
        message: 'Minimum 6 character required',
    }),
    name: zod_1.default.string().optional(),
});
exports.createBlogInput = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string(),
});
exports.updateBlogInput = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string(),
});
