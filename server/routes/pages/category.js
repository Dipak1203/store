import express from 'express';
import categoryController from '../../controller/pages/categoryController.js';
const categoryClient = express.Router();


categoryClient.post("/create",(req,res) =>{
    categoryController.create(req,res)
})

categoryClient.delete("/delete/:id",async (req,res) =>{
    categoryController.delete(req,res);
})
categoryClient.get('/',(req,res) =>{
    categoryController.show(req,res)
});
categoryClient.put('/edit/:id',(req,res) =>{
    categoryController.update(req,res)
});
categoryClient.get("/get/:id",(req,res) =>{
    categoryController.getData(req,res);
})
export default categoryClient;