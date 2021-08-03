var { Product } = require("../models/product");
var { User } = require("../models/user");

module.exports.bookOrder = async (req, res) => {
  try {
    const order = await User.findByIdAndUpdate(
      req.body.userId,
      {
        $push: {
          orders: req.body.orders,
        },
      },
      { new: true }
    );
    if (order) {
      let reverse = order.orders.reverse();
      const id = reverse[0]._id;
      reverse[0].products.map(async (p) => {
        await Product.findByIdAndUpdate(p.productId, {
          $push: {
            order: { orderId: id },
          },
        });
      });
      res.send(order);
    } else {
      res.send({ message: "Order failed" });
    }
  } catch (error) {
    res.send(error);
  }
};

module.exports.getAllOrder = async (req, res) => {
  try {
    const orders = await User.find({});
    if (orders) {
      let array = [];
      orders.map((o) => o.orders.map((i) => array.push(i)));
      res.send(array);
    } else {
      res.send({ message: "Order not found" });
    }
  } catch (error) {
    res.send(error);
  }
};

module.exports.getOrderByAdminId = async (req, res) => {
  try {
    const orders = await User.findById(req.params.id);
    if (orders) {
      res.send(orders.orders);
    } else {
      res.send({ message: "Order not found" });
    }
  } catch (error) {
    res.send(error);
  }
};
