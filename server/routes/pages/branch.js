import express from 'express';
import branchController from '../../controller/pages/branchController.js';
const branchClient = express.Router();


branchClient.post("/create",(req,res) =>{
    branchController.create(req,res)
})

branchClient.delete("/delete/:id",async (req,res) =>{
    branchController.delete(req,res);
})
branchClient.get('/',(req,res) =>{
    branchController.show(req,res)
});
branchClient.put('/edit/:id',(req,res) =>{
    branchController.update(req,res)
});
branchClient.get("/get/:id",(req,res) =>{
    branchController.getData(req,res);
})
export default branchClient;