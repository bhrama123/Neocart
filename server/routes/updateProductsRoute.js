const router = require("express").Router();
const Product = require("../models/ProductModel");

const products = [
  [
    "iPhone 15",
    "https://commons.wikimedia.org/wiki/Special:FilePath/Apple%20iPhone%2015.png"
  ],
  [
    "Samsung Galaxy S24",
    "https://commons.wikimedia.org/wiki/Special:FilePath/Samsung%20Galaxy%20S24%2001.jpg"
  ],
  [
    "OnePlus 12",
    "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800"
  ],
  [
    "Google Pixel 9",
    "https://commons.wikimedia.org/wiki/Special:FilePath/Pixel%209%20Pro%20XL%20and%20Pixel%209.jpg"
  ],

  [
    "MacBook Air M3",
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800"
  ],
  [
    "Dell XPS 15",
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800"
  ],
  [
    "HP Victus 15",
    "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800"
  ],
  [
    "Lenovo Legion 5",
    "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=800"
  ],

  [
    "Sony WH-1000XM5",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800"
  ],
  [
    "Apple AirPods Pro",
    "https://commons.wikimedia.org/wiki/Special:FilePath/AirPods%20(cropped).jpg"
  ],
  [
    "JBL Tune 760NC",
    "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800"
  ],
  [
    "boAt Rockerz 450",
    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800"
  ],

  [
    "Apple Watch Series 9",
    "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=800"
  ],
  [
    "Samsung Galaxy Watch 6",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800"
  ],
  [
    "Noise ColorFit Pro 5",
    "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800"
  ],
  [
    "Fire-Boltt Phoenix",
    "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800"
  ],

  [
    "Logitech MX Master 3S",
    "https://images.unsplash.com/photo-1527814050087-3793815479db?w=800"
  ],
  [
    "Redragon K552 Keyboard",
    "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800"
  ],
  [
    "Xiaomi Power Bank 20000mAh",
    "https://images.unsplash.com/photo-1609592806596-b43bada2f2c6?w=800"
  ],
  [
    "Logitech C920 Webcam",
{
  name: "Logitech C920 Webcam",
  image: "logitechc920new.jpg"
}  ]
];

router.get("/", async (req, res) => {
  try {
    const results = [];

    for (const [name, image] of products) {
      const result = await Product.updateOne(
        { name },
        { $set: { image } }
      );

      results.push({
        name,
        image,
        matched: result.matchedCount,
        modified: result.modifiedCount
      });
    }

    res.json({
      success: true,
      message: "All product images updated",
      results
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;