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
exports.BlogController = void 0;
const Blog_1 = require("../models/Blog");
const fs = require("fs");
class BlogController {
    static Create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let fileObject = {};
            if (req.files.image) {
                const imageUrl = req.files.image[0].path.replace(/\\/g, "/");
                fileObject.image = imageUrl;
            }
            var insert = Object.assign(Object.assign({}, req.body), fileObject);
            try {
                let blog = yield new Blog_1.default(insert).save();
                res.json({
                    message: 'Blog Save Successfully',
                    data: blog,
                    status_code: 200
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static Blog(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = req.blog;
            const data = {
                message: 'Success',
                data: blog
            };
            res.json(data);
        });
    }
    static BlogCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blog = yield Blog_1.default.find({ blog_category_id: req.blog_category._id }, { __v: 0 });
                const data = {
                    message: 'Success',
                    category: req.blog_category,
                    data: blog
                };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static All(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.query.limit) {
                    var blog = yield Blog_1.default.find({ status: true }).limit(parseInt(req.query.limit)).sort({ sequence: 1 }).populate({ path: 'blog_category_id' });
                }
                else {
                    var blog = yield Blog_1.default.find({ status: true }).sort({ sequence: 1 }).populate({ path: 'blog_category_id' });
                }
                const data = {
                    message: 'Success',
                    data: blog
                };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static adminAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blog = yield Blog_1.default.find({}, { __v: 0 }).sort({ sequence: 1 }).populate({ path: 'blog_category_id' });
                const data = {
                    message: 'Success',
                    data: blog
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
            const blog = req.blog;
            try {
                yield fs.unlink(blog['image'], (err) => __awaiter(this, void 0, void 0, function* () {
                    if (err)
                        throw err;
                }));
                yield blog.remove();
                res.json({
                    message: 'Success ! Blog Deleted Successfully',
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
            const blogId = req.blog._id;
            let fileObject = {};
            if (req.files.image) {
                const imageUrl = req.files.image[0].path.replace(/\\/g, "/");
                fileObject.image = imageUrl;
            }
            var update = Object.assign(Object.assign(Object.assign({}, req.body), fileObject), { updated_at: new Date() });
            try {
                const blog = yield Blog_1.default.findOneAndUpdate({ _id: blogId }, update, { new: true, useFindAndModify: false });
                res.send(blog);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.BlogController = BlogController;
