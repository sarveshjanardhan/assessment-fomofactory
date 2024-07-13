import mongoose from "mongoose";
import dotenv from "dotenv";
import { fetchPriceData } from "./services";
import { PriceData } from "./models";
import express from "express";
import cors from "cors";

// PART I: Polling data every 20 seconds and adding to mongoDB
dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI as string;
const POLL_INTERVAL = 20000;

async function connectToDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

async function pollAndStoreData() {
  const priceData = await fetchPriceData();
  for (const data of priceData) {
    const newPriceData = new PriceData({
      symbol: data.symbol,
      price: data.price,
    });
    try {
      await newPriceData.save();
      console.log(`Stored price data for ${data.symbol}`);
    } catch (error) {
      console.error(`Error storing price data for ${data.symbol}:`, error);
    }
  }
}

async function main() {
  await connectToDatabase();
  setInterval(pollAndStoreData, POLL_INTERVAL);
}

main().catch(console.error);

// PART II: API endpoint to fetch data for the Next.js app
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.get("/api/prices", async (req, res) => {
  const { symbol } = req.query;
  try {
    const data = await PriceData.find({ symbol })
      .sort({ timestamp: -1 })
      .limit(20);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
