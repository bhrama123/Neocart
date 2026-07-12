require("dotenv").config({ path: "./config.env" });

const mongoose = require("mongoose");
const Product = require("./models/ProductModel");

const products = [
  ["iPhone 15", "iphone15.jpg"],
  ["Samsung Galaxy S24", "s24.jpg"],
  ["OnePlus 12", "oneplus12.jpg"],
  ["Google Pixel 9", "pixel19.jpg"],

  ["Apple MacBook Air M3", "macbookairm3.jpg"],
  ["Dell XPS 15", "dellxps15.jpg"],
  ["HP Victus 15", "hpvictus.jpg"],
  ["Lenovo Legion 5", "lenovolegion5.jpg"],

  ["Sony WH-1000XM5", "sonywh1000xm5.jpg"],
  ["Apple AirPods Pro", "airpodspro.jpg"],
  ["JBL Tune 770NC", "jbl760nc.jpg"],
  ["boAt Rockerz 550", "boat450.jpg"],

  ["Apple Watch Series 10", "applewatch9.jpg"],
  ["Samsung Galaxy Watch 7", "galaxywatch6.jpg"],
  ["Noise ColorFit Pro", "noisecolorfit5.jpg"],
  ["Fire-Boltt Ninja", "firebolttphonix.jpg"],

  ["Logitech MX Master 3S", "logitechmxmaster3s.jpg"],
  ["Mechanical Keyboard", "redragonk552.jpg"],
  ["Xiaomi Power Bank", "xiaomipowerbank.jpg"],
  ["Logitech C920 Webcam", "logitechc920new.jpg"],
];

async function updateProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    for (const [name, image] of products) {
      const result = await Product.updateOne(
        { name: name },
        { $set: { image: image } }
      );

      console.log(
        `${name} -> matched: ${result.matchedCount}, modified: ${result.modifiedCount}`
      );
    }

    console.log("ALL IMAGES UPDATED");
  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.disconnect();
  }
}

updateProducts();