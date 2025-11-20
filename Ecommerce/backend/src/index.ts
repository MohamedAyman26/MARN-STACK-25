import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import cartRoute from "./routes/cartRoute";
import { seedInitialproducts } from "./services/productService";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/e-commerce";

app.use(express.json()); 

// ===== Routes =====
app.get("/", (req: Request, res: Response) => {
  res.send("Hello Abo elshaber");
});

app.use("/user", userRoute);
app.use("/products", productRoute);
app.use("/cart", cartRoute);

// ===== Seed initial products =====
seedInitialproducts();

// ===== Connect to DB =====
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ Connected to DB"))
  .catch(err => console.error("❌ Failed to connect to DB:", err));

// ===== Start server =====
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
