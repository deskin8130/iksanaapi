"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogCategoryValidators = void 0;
const express_validator_1 = require("express-validator");
const BlogCategory_1 = require("../../models/BlogCategory");
class BlogCategoryValidators {
    static create() {
        return [
            (0, express_validator_1.body)('category', 'Audio Category Name Is Required').custom((category, { req }) => {
                return BlogCategory_1.default.findOne({ category: category }).then(blogCategory => {
                    if (blogCategory) {
                        throw new Error('Audio Category Already Exist');
                    }
                    else {
                        return true;
                    }
                });
            })
        ];
    }
    static category() {
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
                return BlogCategory_1.default.findOne({ _id: id }, { __v: 0 }).then((blogCategory) => {
                    if (blogCategory) {
                        req.blogCategory = blogCategory;
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
                return BlogCategory_1.default.findOne({ _id: id }, { __v: 0 }).then((blogCategory) => {
                    if (blogCategory) {
                        req.blogCategory = blogCategory;
                        return true;
                    }
                    else {
                        throw new Error('Blog Category Does Not Exist');
                    }
                });
            })];
    }
    static delete() {
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
                return BlogCategory_1.default.findOne({ _id: id }, { __v: 0 }).then((blogCategory) => {
                    if (blogCategory) {
                        req.blogCategory = blogCategory;
                        return true;
                    }
                    else {
                        throw new Error('Blog Category Does Not Exist');
                    }
                });
            })];
    }
}
exports.BlogCategoryValidators = BlogCategoryValidators;
