import Blog from "../models/Blog";
import * as fs from 'fs';

export class BlogController {

    static async Create(req, res, next){  

        let fileObject:any = {};
        if(req.files.image){
            const imageUrl:any = req.files.image[0].path.replace(/\\/g, "/");
            fileObject.image=imageUrl;
        }

        var insert = {...req.body, ...fileObject}; 

        try {

            let blog:any = await new Blog(insert).save();
            res.json({
                message:'Blog Save Successfully',
                data:blog,
                status_code:200
            });

        } catch (e) {
            next(e)
        }
        
   
    }

    static async Blog(req, res, next){
        const blog = req.blog;
        const data = {
            message : 'Success',
            data:blog
        };
        res.json(data);
    }

    static async BlogCategory(req, res, next){

        try {
            const blog = await Blog.find({blog_category_id:req.blog_category._id}, {__v: 0});
            const data = {
                message : 'Success',
                category : req.blog_category,
                data:blog
            };
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    static async All(req, res, next){
        try {
            if(req.query.limit){
                var blog = await Blog.find({status:true}).limit(parseInt(req.query.limit)).sort({sequence:1}).populate({path:'blog_category_id'});
            }else{
                var blog = await Blog.find({status:true}).sort({sequence:1}).populate({path:'blog_category_id'});
            }
            
            const data = {
                message : 'Success',
                data:blog
            };
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    static async adminAll(req, res, next){

        try {
            const blog = await Blog.find({}, {__v: 0}).sort({sequence:1}).populate({path:'blog_category_id'});
            const data = {
                message : 'Success',
                data:blog
            };
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    static async Delete(req, res, next) {
        const blog = req.blog;
        try {
            await fs.unlink(blog['image'], async (err) => {
                if (err) throw err;
            });
            await blog.remove();
            res.json({
                message:'Success ! Blog Deleted Successfully',
                status_code: 200
            });
        } catch (e) {
            next(e);
        }
    }

    static async Update(req, res, next) {
        const blogId = req.blog._id;

        let fileObject:any = {};
        if(req.files.image){
            const imageUrl:any = req.files.image[0].path.replace(/\\/g, "/");
            fileObject.image=imageUrl;
        }

        var update = {...req.body, ...fileObject, updated_at: new Date()}; 

        try {
            const blog = await Blog.findOneAndUpdate({_id: blogId}, update, {new: true, useFindAndModify: false});
            res.send(blog);
        } catch (e) {
            next(e);
        }

    }

} 