"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const BlogController_1 = require("../controllers/BlogController");
const GlobalMiddleWare_1 = require("../middlewares/GlobalMiddleWare");
const Utils_1 = require("../utils/Utils");
const BlogValidators_1 = require("./validators/BlogValidators");
class BlogRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get('/all', BlogController_1.BlogController.All);
        // API
        this.router.get('/admin/all', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, BlogController_1.BlogController.adminAll);
        this.router.get('/blog_category/:id', BlogValidators_1.BlogValidators.Blog_category(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, BlogController_1.BlogController.BlogCategory);
        this.router.get('/:slug', BlogValidators_1.BlogValidators.Blog(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, BlogController_1.BlogController.Blog);
    }
    postRoutes() {
        this.router.post('/create', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, new Utils_1.Utils().BlogMulter.fields([{ name: 'image' }]), BlogValidators_1.BlogValidators.create(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, BlogController_1.BlogController.Create);
    }
    patchRoutes() {
        this.router.patch('/update/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, new Utils_1.Utils().BlogMulter.fields([{ name: 'image' }]), BlogValidators_1.BlogValidators.update(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, BlogController_1.BlogController.Update);
    }
    deleteRoutes() {
        this.router.delete('/delete/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, BlogValidators_1.BlogValidators.delete(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, BlogController_1.BlogController.Delete);
    }
}
exports.default = new BlogRouter().router;
