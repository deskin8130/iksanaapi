import { Router } from "express";
import { BlogController } from "../controllers/BlogController";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { Utils } from "../utils/Utils";
import { BlogValidators } from "./validators/BlogValidators";

class BlogRouter {
    public router: Router;
    constructor(){
        this.router=Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();

    }

    getRoutes(){
        
        this.router.get('/all', BlogController.All);

        // API
        this.router.get('/admin/all', GlobalMiddleWare.adminAuthenticate, BlogController.adminAll);
        this.router.get('/blog_category/:id', BlogValidators.Blog_category(), GlobalMiddleWare.checkError, BlogController.BlogCategory);
        this.router.get('/:slug', BlogValidators.Blog(), GlobalMiddleWare.checkError, BlogController.Blog);
    }
    postRoutes(){
        this.router.post('/create', GlobalMiddleWare.adminAuthenticate, new Utils().BlogMulter.fields([{ name: 'image'}]), BlogValidators.create(), GlobalMiddleWare.checkError, BlogController.Create);
    }
    patchRoutes(){
        this.router.patch('/update/:id', GlobalMiddleWare.adminAuthenticate, new Utils().BlogMulter.fields([{ name: 'image'}]), BlogValidators.update(), GlobalMiddleWare.checkError, BlogController.Update);
    }
    deleteRoutes(){
        this.router.delete('/delete/:id', GlobalMiddleWare.adminAuthenticate, BlogValidators.delete(), GlobalMiddleWare.checkError,BlogController.Delete)
    }
}

export default new BlogRouter().router;