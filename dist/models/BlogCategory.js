"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const Utils_1 = require("../utils/Utils");
const BlogCategorySchema = new mongoose.Schema({
    category: { type: String, required: true },
    sequence: { type: Number, required: false },
    status: { type: Boolean, required: true, default: true },
    created_at: { type: Date, default: Utils_1.Utils.indianTimeZone },
    updated_at: { type: Date, default: Utils_1.Utils.indianTimeZone },
}, { id: false });
BlogCategorySchema.set('toObject', { virtuals: true });
BlogCategorySchema.set('toJSON', { virtuals: true });
BlogCategorySchema.virtual('blogs', {
    ref: 'blogs',
    localField: '_id',
    foreignField: 'blog_category_id',
});
exports.default = (0, mongoose_1.model)('blog_categorys', BlogCategorySchema);
