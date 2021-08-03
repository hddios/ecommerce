const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Course is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdOne: {
    type: Date,
    default: new Date(),
  },
  order: [
    {
      orderId: {
        type: String,
        required: [true, "Order ID is required"],
      },
    },
  ],
});

module.exports.Product = mongoose.model("Product", productSchema);
