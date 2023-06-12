import express from 'express';
import CountController from '../../controller/Count/CountController.js';

const countRouter = express.Router();


countRouter.get("/wada",async(req,res) =>{
    await CountController.count(req,res,"wada");
});
countRouter.get("/category",async(req,res) =>{
    await CountController.count(req,res,"category");
});
countRouter.get("/branch",async(req,res) =>{
    await CountController.count(req,res,"branch");
});
countRouter.get("/users",async(req,res) =>{
    await CountController.count(req,res,"users");
});
countRouter.get("/product",async(req,res) =>{
    await CountController.count(req,res,"product");
});


export default countRouter;