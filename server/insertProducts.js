const mongoose = require("mongoose");
const fs = require("fs");
require("dotenv").config({ path: "./config.env" });

const Product = require("./models/ProductModel"); // ✅ Fixed

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected");

    const products = JSON.parse(
      fs.readFileSync("./products.json", "utf8")
    );

    await Product.deleteMany({});
    await Product.insertMany(products);

    console.log("✅ All products inserted successfully!");

    process.exit();
  })
  .catch((err) => {
    console.log(err);
  });