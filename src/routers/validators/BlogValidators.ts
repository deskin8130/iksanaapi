import { body, param, query } from "express-validator";
import Blog from "../../models/Blog";
import BlogCategory from "../../models/BlogCategory";

export class BlogValidators{

    static create(){

        return  [   body('blog_category_id', 'Blog Category Is Required').isAlphanumeric().custom((blog_category_id, {req})=>{
                        return  BlogCategory.findOne({_id:blog_category_id}).then(blog_category => { 
                                    if(blog_category){
                                        return true;
                                    }else{
                                        throw new Error('Blog Category Not Exist');
                                    }
                                })
                    }),
                    body('name', 'name is Required').isString(),
                    body('slug', 'slug is Required').isString(),
                    body('sub_heading', 'description is Required').isString(),
                    body('short_description', 'short_description is Required').isString(),
                    body('description', 'description is Required').isString(),
                    body('author', 'author is Required').isString(),
                ]
        
    }

    static Blog() { 
        return [param('slug').custom((slug, {req}) => {
            return Blog.findOne({slug: slug}, {__v: 0}).populate({path:'blog_category_id'}).then((blog) => {
                if (blog) {
                    req.blog = blog;
                    return true;
                } else {
                    throw new Error('Blog Does Not Exist');
                }
            })
        })]
    }

    static Blog_category() {
        return [param('id').custom((id, {req}) => {
            return BlogCategory.findOne({_id: id}, {__v: 0}).then((blog_category) => {
                if (blog_category) {
                    req.blog_category = blog_category;
                    return true;
                } else {
                    throw new Error('Blog Category Does Not Exist');
                }
            })
        })]
    }

    static update() {
        return [param('id').custom((id, {req}) => {
            return Blog.findOne({_id: id}, {__v: 0}).then((blog) => {
                if (blog) {
                    req.blog = blog;
                    return true;
                } else {
                    throw new Error('Blog Does Not Exist');
                }
            })
        })]
    }

    static delete() {
        return [param('id').custom((id, {req}) => {
            return Blog.findOne({_id: id}, {__v: 0}).then((blog) => {
                if (blog) {
                    req.blog = blog;
                    return true;
                } else {
                    throw new Error('Blog Does Not Exist');
                }
            })
        })]
    }


}