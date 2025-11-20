import express from "express";
import validateJWT from "../middewares/validateJWT";
import { 
  getActiveCartForUser, 
  addItemToCart, 
  updateCartItem, 
  deleteCartItem, 
   
} from "../services/cartService";

const router = express.Router();

// GET active cart
router.get("/", validateJWT, async (req, res) => {
  try {
    const userId = (req as any).user._id.toString();
    const cart = await getActiveCartForUser(userId);
    res.status(200).json(cart);
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Server error" });
  }
});

// ADD item
router.post("/items", validateJWT, async (req, res) => {
  try {
    const userId = (req as any).user._id.toString();
    const { productId, quantity } = req.body;
    if (!productId || !quantity) return res.status(400).json({ error: "productId & quantity required" });

    const cart = await addItemToCart(userId, productId, quantity);
    res.status(200).json(cart);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE item
router.put("/items", validateJWT, async (req, res) => {
  try {
    const userId = (req as any).user._id.toString();
    const { productId, quantity } = req.body;
    if (!productId || quantity === undefined) return res.status(400).json({ error: "productId & quantity required" });

    const cart = await updateCartItem(userId, productId, quantity);
    res.status(200).json(cart);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE item
router.delete("/items/:productId", validateJWT, async (req, res) => {
  try {
    const userId = (req as any).user._id.toString();
    const { productId } = req.params;
    if (!productId) return res.status(400).json({ error: "productId required" });

    const cart = await deleteCartItem(userId, productId);
    res.status(200).json(cart);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// CHECKOUT

export default router;
