import express from "express";
import usersController from '../controller/usersController.js'
const usersClient = express.Router();

usersClient.delete("/delete/:id", async (req, res) => {
  usersController.delete(req, res);
});
usersClient.put("/edit/:id", (req, res) => {
  usersController.update(req, res);
});
usersClient.get("/get/:id", (req, res) => {
  usersController.getData(req, res);
});
export default usersClient;
