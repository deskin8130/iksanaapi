import BlogCategory from "../models/BlogCategory";

export class BlogCategoryController {

    static async Create(req, res, next){  

        try {
            let blogCategory:any = await new BlogCategory(req.body).save();
            res.json({
                message:'Blog Category Save Successfully',
                data:blogCategory,
                status_code:200
            });

        } catch (e) {
            next(e)
        }
        
   
    }

    static async Update(req, res, next) {
        const blogCategoryId = req.blogCategory._id;
        try {
            const blogCategory = await BlogCategory.findOneAndUpdate({_id: blogCategoryId}, req.body, {new: true, useFindAndModify: false});
            res.send(blogCategory);
        } catch (e) {
            next(e);
        }

    }

    static async Category(req, res, next){
        const blogCategory = req.blogCategory;
        const data = {
            message : 'Success',
            data:blogCategory
        };
        res.json(data);
    }

    static async AllCategory(req, res, next){

        try {
            const blogCategory = await BlogCategory.find({status:true}, {category:1}).sort({sequence:1}).populate({path:'blogs', select:['slug', 'name', 'image'], options: { sort: { 'sequence': 1 } } });
            const data = {
                message : 'Success',
                data:blogCategory
            }; 
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    static async AllAdminCategory(req, res, next){

        try {
            const blogCategory = await BlogCategory.find().sort({sequence:1}).populate({path:'blogs', select:['slug', 'name', 'image','-blog_category_id'], options: { sort: { 'sequence': 1 } } });
            const data = {
                message : 'Success',
                data:blogCategory
            }; 
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    static async Delete(req, res, next) {
        const blogCategory = req.blogCategory;
        try {
            await blogCategory.remove();
            res.json({
                message:'Success ! Blog Category Deleted Successfully',
                status_code: 200
            });
        } catch (e) {
            next(e);
        }
    }

} 