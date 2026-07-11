require("dotenv").config({ path: "./config.env" });

const mongoose = require("mongoose");
const Product = require("./models/ProductModel");

const products = [
  ["iPhone 15", "iphone15.jpg"],
  ["Samsung Galaxy S24", "s24.jpg"],
  ["OnePlus 12", "oneplus12.jpg"],
  ["MacBook Air M3", "macbookairm3.jpg"],
  ["Dell XPS 15", "dellxps15.jpg"],
  ["HP Victus 15", "hpvictus.jpg"],
  ["Sony WH-1000XM5", "sony.jpg"],
  ["Apple AirPods Pro", "airpods.jpg"],
  ["Apple Watch Series 9", "applewatch.jpg"],
];

async function updateProducts() {
  try {
await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");
    console.log("MongoDB Connected");

    for (const [name, image] of products) {
      const result = await Product.updateOne(
        { name },
        { $set: { image } }
      );

      console.log(
        `${name} -> ${result.modifiedCount ? "Updated" : "Not changed"}`
      );
    }

    console.log("All products processed");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
  }
}

updateProducts();