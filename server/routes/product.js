import express from "express";
import productController from "../controller/productController.js";
const productRouter = express.Router();

productRouter.post("/create", (req, res) => {
  productController.register(req, res);
});
productRouter.get("/", (req, res) => {
  productController.show(req, res);
});
productRouter.delete("/delete/:id", async (req, res) => {
  productController.delete(req, res);
});
productRouter.put("/edit/:id", (req, res) => {
  productController.update(req, res);
});
productRouter.get("/get/:id", (req, res) => {
  productController.getData(req, res);
});
export default productRouter;
