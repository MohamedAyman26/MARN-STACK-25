import mongoose, { Schema, Document, Types } from "mongoose";

export interface ICartItem {
    product: Types.ObjectId;
    quantity: number;
    unitprice: number;
}

export interface ICart extends Document {
    userId: string;
    items: ICartItem[];
    totalAmount: number;
    status: "active" | "completed";
}

const CartItemSchema = new Schema<ICartItem>({
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, default: 1 },
    unitprice: { type: Number, required: true },
});

const CartSchema = new Schema<ICart>({
    userId: { type: String, required: true },
    items: [CartItemSchema],
    totalAmount: { type: Number, required: true, default: 0 },
    status: { type: String, enum: ["active", "completed"], default: "active" },
});

const cartModel = mongoose.model<ICart>("Cart", CartSchema);
export default cartModel;
