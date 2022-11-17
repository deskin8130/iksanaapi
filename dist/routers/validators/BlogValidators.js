"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogValidators = void 0;
const express_validator_1 = require("express-validator");
const Blog_1 = require("../../models/Blog");
const BlogCategory_1 = require("../../models/BlogCategory");
class BlogValidators {
    static create() {
        return [(0, express_validator_1.body)('blog_category_id', 'Blog Category Is Required').isAlphanumeric().custom((blog_category_id, { req }) => {
                return BlogCategory_1.default.findOne({ _id: blog_category_id }).then(blog_category => {
                    if (blog_category) {
                        return true;
                    }
                    else {
                        throw new Error('Blog Category Not Exist');
                    }
                });
            }),
            (0, express_validator_1.body)('name', 'name is Required').isString(),
            (0, express_validator_1.body)('slug', 'slug is Required').isString(),
            (0, express_validator_1.body)('sub_heading', 'description is Required').isString(),
            (0, express_validator_1.body)('short_description', 'short_description is Required').isString(),
            (0, express_validator_1.body)('description', 'description is Required').isString(),
            (0, express_validator_1.body)('author', 'author is Required').isString(),
        ];
    }
    static Blog() {
        return [(0, express_validator_1.param)('slug').custom((slug, { req }) => {
                return Blog_1.default.findOne({ slug: slug }, { __v: 0 }).populate({ path: 'blog_category_id' }).then((blog) => {
                    if (blog) {
                        req.blog = blog;
                        return true;
                    }
                    else {
                        throw new Error('Blog Does Not Exist');
                    }
                });
            })];
    }
    static Blog_category() {
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
                return BlogCategory_1.default.findOne({ _id: id }, { __v: 0 }).then((blog_category) => {
                    if (blog_category) {
                        req.blog_category = blog_category;
                        return true;
                    }
                    else {
                        throw new Error('Blog Category Does Not Exist');
                    }
                });
            })];
    }
    static update() {
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
                return Blog_1.default.findOne({ _id: id }, { __v: 0 }).then((blog) => {
                    if (blog) {
                        req.blog = blog;
                        return true;
                    }
                    else {
                        throw new Error('Blog Does Not Exist');
                    }
                });
            })];
    }
    static delete() {
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
                return Blog_1.default.findOne({ _id: id }, { __v: 0 }).then((blog) => {
                    if (blog) {
                        req.blog = blog;
                        return true;
                    }
                    else {
                        throw new Error('Blog Does Not Exist');
                    }
                });
            })];
    }
}
exports.BlogValidators = BlogValidators;
