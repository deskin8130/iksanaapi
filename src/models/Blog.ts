import * as mongoose from 'mongoose';
import { model } from 'mongoose';
import { Utils } from '../utils/Utils';

const BlogSchema = new mongoose.Schema({
    blog_category_id         : {type: mongoose.Types.ObjectId, required: true, ref: 'blog_categorys'},
    name                     : {type: String, required: true},
    slug                     : {type: String, required: true},
    sub_heading              : {type: String, required: true},
    short_description        : {type: String, required: true},
    description              : {type: String, required: true},
    author                   : {type: String, required: true},
    tags                     : {type: String, required: false},
    seo_title                : {type: String, required: false},
    seo_keywords             : {type: String, required: false},
    seo_description          : {type: String, required: false},
    image                    : {type: String, required: false},
    sequence                 : {type: Number, required: false},
    status                   : {type: Boolean, required: true, default: true},
    created_at               : {type: Date, required: true, default: Utils.indianTimeZone},
    updated_at               : {type: Date, required: true, default: Utils.indianTimeZone},
},{ id : false });

BlogSchema.set('toObject', { virtuals: true });
BlogSchema.set('toJSON', { virtuals: true });

BlogSchema.virtual('portfolios', {   
    ref: 'blog_portfolios', 
    localField: '_id',
    foreignField: 'blog_id',
    //justOne: true
    //count: true
});

export default model('blogs', BlogSchema);

