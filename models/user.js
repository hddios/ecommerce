const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password name is required"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  orders: [
    {
      products: [
        {
          productId: {
            type: String,
            required: [true, "Product ID is required"],
          },
          quantity: {
            type: Number,
            required: [true, "Product ID is required"],
          },
        },
      ],
      totalAmount: {
        type: Number,
        required: [true, "Total amount is required."],
      },
      purchasedOn: {
        type: Date,
        default: new Date(),
      },
    },
  ],
});

module.exports.User = mongoose.model("User", userSchema);
