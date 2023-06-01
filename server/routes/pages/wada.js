import express from 'express';
import wadaController from '../../controller/pages/wadaController.js';
const wadaClient = express.Router();


wadaClient.post("/create",(req,res) =>{
    wadaController.create(req,res)
})

wadaClient.delete("/delete/:id",async (req,res) =>{
    wadaController.delete(req,res);
})
wadaClient.get('/',(req,res) =>{
    wadaController.show(req,res)
});
wadaClient.put('/edit/:id',(req,res) =>{
    wadaController.update(req,res)
});
wadaClient.get("/get/:id",(req,res) =>{
    wadaController.getData(req,res);
})
export default wadaClient;