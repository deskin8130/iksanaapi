import * as mongoose from 'mongoose';
import { model } from 'mongoose';
import { Utils } from '../utils/Utils';

const BlogCategorySchema = new mongoose.Schema({
    category                 : {type: String, required: true},
    sequence                 : {type: Number, required: false},
    status                   : {type: Boolean, required: true, default: true},
    created_at               : {type: Date, default: Utils.indianTimeZone},
    updated_at               : {type: Date, default: Utils.indianTimeZone},
},{ id : false });

BlogCategorySchema.set('toObject', { virtuals: true });
BlogCategorySchema.set('toJSON', { virtuals: true });

BlogCategorySchema.virtual('blogs', {   
    ref: 'blogs', 
    localField: '_id',
    foreignField: 'blog_category_id',
});

export default model('blog_categorys', BlogCategorySchema);

    