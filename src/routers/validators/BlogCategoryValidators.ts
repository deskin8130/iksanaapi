import { body, param, query } from "express-validator";

import BlogCategory from "../../models/BlogCategory";

export class BlogCategoryValidators{

    static create(){

        return  [ 
                    body('category', 'Audio Category Name Is Required').custom((category, {req})=>{
                        return  BlogCategory.findOne({category:category}).then(blogCategory => {
                                    if(blogCategory){
                                        throw new Error('Audio Category Already Exist');
                                    }else{
                                        return true;
                                    }
                                })
                    })
    
                ];
        
    }

    static category() {
        return [param('id').custom((id, {req}) => {
            return BlogCategory.findOne({_id: id}, {__v: 0}).then((blogCategory) => {
                if (blogCategory) {
                    req.blogCategory = blogCategory;
                    return true;
                } else {
                    throw new Error('Blog Category Does Not Exist');
                }
            })
        })]
    }

    static update() {
        return [param('id').custom((id, {req}) => {
            return BlogCategory.findOne({_id: id}, {__v: 0}).then((blogCategory) => {
                if (blogCategory) {
                    req.blogCategory = blogCategory;
                    return true;
                } else {
                    throw new Error('Blog Category Does Not Exist');
                }
            })
        })]
    }

    static delete() {
        return [param('id').custom((id, {req}) => {
            return BlogCategory.findOne({_id: id}, {__v: 0}).then((blogCategory) => {
                if (blogCategory) {
                    req.blogCategory = blogCategory;
                    return true;
                } else {
                    throw new Error('Blog Category Does Not Exist');
                }
            })
        })]
    }


}