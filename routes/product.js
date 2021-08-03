const express = require("express");
const router = express.Router();
const {
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getAllProduct,
  archiveProduct,
} = require("../controller/product");

const { auth } = require("../auth/index");
// if user is admin and have jwt token then it will create product
// body parameter
// {
// 	"name":"Iphone 11 pro",
// 	"description":"This is description of Iphone 11 Pro mobile",
// 	"userId":"61043797e9a4251bd24ed4c8",
// 	"price":123,
// 	"isActive":"true"
// }
// Authorization token header require
router.post(
  "/addProduct",
  auth.authenticateToken,
  auth.requireAdmin,
  addProduct
);

// if user is admin and have jwt token then it will create product
// body parameter
// {
// 	"name":"Iphone 11 pro",
// 	"description":"This is description of Iphone 11 Pro mobile",
// 	"userId":"61043797e9a4251bd24ed4c8",
// 	"price":123,
// 	"isActive":"true"
// }
// header params product id that you want to update
// Authorization token header require
router.put("/:id", auth.authenticateToken, auth.requireAdmin, updateProduct);

// return all products
// Authorization token header require
router.get("/", auth.authenticateToken, getAllProduct);

// return product with products id
// http://localhost:8000/api/product/61064d0902909907c1e7806f
// Authorization token header require
router.get("/:id", auth.authenticateToken, getProduct);

// if user is admin then it will delete the product
// header params product id that you want to delete
// http://localhost:8000/api/product/61064d0902909907c1e7806f
// body params of admin that delete the record
// {
//     userId:"XXXXX"
// }
// Authorization token header require
router.delete("/:id", auth.authenticateToken, auth.requireAdmin, deleteProduct);

// if user is admin then it will archive the product with product id
// header params product id that you want to archive
// http://localhost:8000/api/product/61062cc063f786040883f7fb/archive
// body params of admin that delete the record
// {
//     userId:"XXXXX"
// }
// Authorization token header require
router.put(
  "/:id/archive",
  auth.authenticateToken,
  auth.requireAdmin,
  archiveProduct
);

module.exports.Product = router;
