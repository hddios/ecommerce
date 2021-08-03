const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
// const port = 8000;
//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { User } = require("./routes/user");
const { Product } = require("./routes/product");
const { Order } = require("./routes/bookOrder");
//const productRoute = require("./routes/productRoute");

//connect to database
mongoose.connect(
  "mongodb+srv://REDACTED@zuitt-bootcamp.6m7e8.mongodb.net/Capstone2?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true }
);
//notification
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log(`We're connected to MongoDB Database`);
});

//schema & model

//routes
app.use("/api/user", User);
app.use("/api/product", Product);
app.use("/api/order", Order);

app.listen(process.env.PORT || 8000, () =>
  console.log(`Server is now running at port ${process.env.PORT || 8000}`)
);
