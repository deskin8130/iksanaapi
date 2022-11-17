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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogCategoryController = void 0;
const BlogCategory_1 = require("../models/BlogCategory");
class BlogCategoryController {
    static Create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let blogCategory = yield new BlogCategory_1.default(req.body).save();
                res.json({
                    message: 'Blog Category Save Successfully',
                    data: blogCategory,
                    status_code: 200
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static Update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const blogCategoryId = req.blogCategory._id;
            try {
                const blogCategory = yield BlogCategory_1.default.findOneAndUpdate({ _id: blogCategoryId }, req.body, { new: true, useFindAndModify: false });
                res.send(blogCategory);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static Category(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const blogCategory = req.blogCategory;
            const data = {
                message: 'Success',
                data: blogCategory
            };
            res.json(data);
        });
    }
    static AllCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blogCategory = yield BlogCategory_1.default.find({ status: true }, { category: 1 }).sort({ sequence: 1 }).populate({ path: 'blogs', select: ['slug', 'name', 'image'], options: { sort: { 'sequence': 1 } } });
                const data = {
                    message: 'Success',
                    data: blogCategory
                };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static AllAdminCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blogCategory = yield BlogCategory_1.default.find().sort({ sequence: 1 }).populate({ path: 'blogs', select: ['slug', 'name', 'image', '-blog_category_id'], options: { sort: { 'sequence': 1 } } });
                const data = {
                    message: 'Success',
                    data: blogCategory
                };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static Delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const blogCategory = req.blogCategory;
            try {
                yield blogCategory.remove();
                res.json({
                    message: 'Success ! Blog Category Deleted Successfully',
                    status_code: 200
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.BlogCategoryController = BlogCategoryController;
