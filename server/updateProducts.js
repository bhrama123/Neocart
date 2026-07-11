require("dotenv").config({ path: "./config.env" });

const mongoose = require("mongoose");
const Product = require("./models/ProductModel");

const products = [
  ["iPhone 15", "iphone15.jpg"],
  ["Samsung Galaxy S24", "s24.jpg"],
  ["OnePlus 12", "oneplus12.jpg"],
  ["Google Pixel 9", "pixel9.jpg"],

  ["MacBook Air M3", "macbookairm3.jpg"],
  ["Dell XPS 15", "dellxps15.jpg"],
  ["HP Victus 15", "hpvictus15.jpg"],
  ["Lenovo Legion 5", "lenovolegion5.jpg"],

  ["Sony WH-1000XM5", "sonywh1000xm5.jpg"],
  ["Apple AirPods Pro", "airpodspro.jpg"],
  ["JBL Tune 760NC", "jbl760nc.jpg"],
  ["boAt Rockerz 450", "boat450.jpg"],

  ["Apple Watch Series 9", "applewatch9.jpg"],
  ["Samsung Galaxy Watch 6", "galaxywatch6.jpg"],
  ["Noise ColorFit Pro 5", "noisecolorfit5.jpg"],
  ["Fire-Boltt Phoenix", "firebolttphoenix.jpg"],

  ["Logitech MX Master 3S", "logitechmxmaster3s.jpg"],
  ["Redragon K552 Keyboard", "redragonk552.jpg"],
  ["Xiaomi Power Bank 20000mAh", "xiaomipowerbank.jpg"],
  ["Logitech C920 Webcam", "logitechc920.jpg"],
];

async function updateProducts() {
  try {
await mongoose.connect(process.env.MONGO_URI);
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