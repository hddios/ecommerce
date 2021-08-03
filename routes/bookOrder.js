const express = require("express");
const router = express.Router();
const {
  bookOrder,
  getAllOrder,
  getOrderByAdminId,
} = require("../controller/order");

const { auth } = require("../auth/index");

// http://localhost:8000/api/order
// body params
// {
// 	"userId":"61043797e9a4251bd24ed4c8",
// 	"orders": [ {	
// 		"products":[
// 		{
// 			"productId":"61064b727342fb079b85b85a",
// 			"quantity":23
// 		},
// 		{
// 			"productId":"61064d0902909907c1e7806f",
// 			"quantity":23
// 		},
// 		],
// 			"totalAmount":200
// 	}]
// }
// Authorization token header require
router.post("/", auth.authenticateToken, bookOrder);

// header params order id 
// http://localhost:8000/api/order/1234213kjnjsdf2134
// Authorization token header require
router.get("/:id", auth.authenticateToken, getOrderByAdminId);

// http://localhost:8000/api/order/orders
// body params 
// {
//     userId:"xxxxxx"
// }
// Authorization token header require
router.post("/orders", auth.authenticateToken, auth.requireAdmin, getAllOrder);

module.exports.Order = router;
