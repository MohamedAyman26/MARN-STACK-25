import cartModel from "../models/cartModel";
import orderModel, { IOrder } from "../models/orderModel";

export const checkoutCart = async (userId: string): Promise<IOrder> => {
    const cart = await cartModel.findOne({ userId, status: "active" });
    if (!cart) throw new Error("Active cart not found");
    if (cart.items.length === 0) throw new Error("Cart is empty");

    // إنشاء الـ Order
    const order = await orderModel.create({
        userId,
        items: cart.items,
        totalAmount: cart.totalAmount,
        status: "pending",
    });

    // تحديث الكارت إلى completed
    cart.status = "completed";
    await cart.save();

    return order;
};
