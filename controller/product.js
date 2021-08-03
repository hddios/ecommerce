var { Product } = require("../models/product");
module.exports.addProduct = async (req, res) => {
  try {
    const { name, description, price, isActive } = req.body;
    const product = await Product({ name, description, price, isActive });
    product.save();
    res.send(product);
  } catch (error) {
    res.send(error);
  }
};

module.exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (product) {
      res.send(product);
    } else {
      res.send({ message: "Product not found" });
    }
  } catch (error) {
    res.send(error);
  }
};

module.exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, isActive } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, isActive },
      { new: true }
    );
    res.send(product);
  } catch (error) {
    res.send(error);
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete(req.params.id);
    res.send(product);
  } catch (error) {
    res.send(error);
  }
};

module.exports.getAllProduct = async (req, res) => {
  try {
    const product = await Product.find({ isActive: true });
    res.send(product);
  } catch (error) {
    res.send(error);
  }
};

module.exports.archiveProduct = async (req, res) => {
  try {
    const product = await Product.updateOne(
      { _id: req.params.id },
      { $set: { isActive: false } }
    );
    if (product) {
      res.send(product);
    } else {
      res.send({ message: "Product not found" });
    }
  } catch (error) {
    res.send(error);
  }
};
