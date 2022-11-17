"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const BlogCategoryController_1 = require("../controllers/BlogCategoryController");
const GlobalMiddleWare_1 = require("../middlewares/GlobalMiddleWare");
const BlogCategoryValidators_1 = require("./validators/BlogCategoryValidators");
class BlogCategoryRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get('/id/:id', BlogCategoryValidators_1.BlogCategoryValidators.category(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, BlogCategoryController_1.BlogCategoryController.Category);
        this.router.get('/all', BlogCategoryController_1.BlogCategoryController.AllCategory);
        this.router.get('/admin/all', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, BlogCategoryController_1.BlogCategoryController.AllAdminCategory);
    }
    postRoutes() {
        this.router.post('/create', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, BlogCategoryValidators_1.BlogCategoryValidators.create(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, BlogCategoryController_1.BlogCategoryController.Create);
    }
    patchRoutes() {
        this.router.patch('/update/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, BlogCategoryValidators_1.BlogCategoryValidators.update(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, BlogCategoryController_1.BlogCategoryController.Update);
    }
    deleteRoutes() {
        this.router.delete('/delete/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, BlogCategoryValidators_1.BlogCategoryValidators.delete(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, BlogCategoryController_1.BlogCategoryController.Delete);
    }
}
exports.default = new BlogCategoryRouter().router;
