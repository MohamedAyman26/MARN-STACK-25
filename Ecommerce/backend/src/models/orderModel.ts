import mongoose, { Schema, Document } from "mongoose";
import { ICartItem } from "./cartModel";

export interface IOrder extends Document {
    userId: string;
    items: ICartItem[];
    totalAmount: number;
    status: "pending" | "completed" | "cancelled";
    createdAt: Date;
}

const OrderSchema = new Schema<IOrder>({
    userId: { type: String, required: true },
    items: [{ type: Schema.Types.Mixed, required: true }], // نسخ عناصر الكارت
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ["pending", "completed", "cancelled"], default: "pending" },
    createdAt: { type: Date, default: Date.now },
});

const orderModel = mongoose.model<IOrder>("Order", OrderSchema);
export default orderModel;
