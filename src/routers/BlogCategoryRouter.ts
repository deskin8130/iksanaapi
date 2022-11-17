import { Router } from "express";
import { BlogCategoryController } from "../controllers/BlogCategoryController";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { Utils } from "../utils/Utils";
import { BlogCategoryValidators } from "./validators/BlogCategoryValidators";

class BlogCategoryRouter {
    public router: Router;
    constructor(){
        this.router=Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();

    }

    getRoutes(){
        this.router.get('/id/:id', BlogCategoryValidators.category(), GlobalMiddleWare.checkError, BlogCategoryController.Category);
        this.router.get('/all', BlogCategoryController.AllCategory);
        this.router.get('/admin/all', GlobalMiddleWare.adminAuthenticate, BlogCategoryController.AllAdminCategory);
    }
    postRoutes(){
        this.router.post('/create', GlobalMiddleWare.adminAuthenticate, BlogCategoryValidators.create(), GlobalMiddleWare.checkError, BlogCategoryController.Create);
    }
    patchRoutes(){
        this.router.patch('/update/:id', GlobalMiddleWare.adminAuthenticate, BlogCategoryValidators.update(), GlobalMiddleWare.checkError, BlogCategoryController.Update);
    }
    deleteRoutes(){
        this.router.delete('/delete/:id', GlobalMiddleWare.adminAuthenticate, BlogCategoryValidators.delete(), GlobalMiddleWare.checkError,BlogCategoryController.Delete)
    }
}

export default new BlogCategoryRouter().router;