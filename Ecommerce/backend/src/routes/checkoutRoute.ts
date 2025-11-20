import express from "express";
import validateJWT from "../middewares/validateJWT";
import { checkoutCart } from "../services/checkoutCart";

const router = express.Router();

router.post("/checkout", validateJWT, async (req, res) => {
    try {
        const userId = (req as any).user?._id?.toString();
        if (!userId) return res.status(401).json({ error: "Unauthorized" });

        const order = await checkoutCart(userId);
        res.status(200).json({ message: "Checkout successful", order });
    } catch (err: any) {
        res.status(400).json({ error: err.message || "Checkout failed" });
    }
});

export default router;
