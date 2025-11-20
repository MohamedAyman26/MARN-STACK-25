import cartModel from "../models/cartModel";
import productModel, { Iproduct } from "../models/productModel";

// ========== Create Cart For User ==========
export const createCartForUser = async (userId: string) => {
    return await cartModel.create({
        userId,
        items: [],
        totalAmount: 0,
        status: "active",
    });
};

// ========== Get Active Cart For User ==========
export const getActiveCartForUser = async (userId: string) => {
    let cart = await cartModel.findOne({ userId, status: "active" });
    if (!cart) cart = await createCartForUser(userId);
    return cart;
};

// ========== Add Item To Cart ==========
export const addItemToCart = async (userId: string, productId: string, quantity: number) => {
    const cart = await getActiveCartForUser(userId);

    const product = await productModel.findById(productId) as Iproduct | null;
    if (!product) throw new Error("Product not found");

    const productIdObj = product._id as any;

    const existingItem = cart.items.find((item: any) => item.product.toString() === productIdObj.toString());

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.items.push({
            product: productIdObj,
            quantity,
            unitprice: product.price,
        } as any);
    }

    cart.totalAmount = cart.items.reduce((sum: number, item: any) => sum + item.unitprice * item.quantity, 0);

    await cart.save();
    return cart;
};

// ========== Update Item in Cart ==========
export const updateCartItem = async (userId: string, productId: string, quantity: number) => {
    const cart = await getActiveCartForUser(userId);

    const item = cart.items.find((i: any) => i.product.toString() === productId);
    if (!item) throw new Error("Item not found in cart");

    if (quantity <= 0) {
        cart.items = cart.items.filter((i: any) => i.product.toString() !== productId);
    } else {
        item.quantity = quantity;
    }

    cart.totalAmount = cart.items.reduce((sum: number, i: any) => sum + i.unitprice * i.quantity, 0);
    await cart.save();

    return cart;
};

// ========== Delete Item in Cart ==========
export const deleteCartItem = async (userId: string, productId: string) => {
    const cart = await getActiveCartForUser(userId);

    const item = cart.items.find((i: any) => i.product.toString() === productId);
    if (!item) throw new Error("Item not found in cart");

    cart.items = cart.items.filter((i: any) => i.product.toString() !== productId);

    cart.totalAmount = cart.items.reduce((sum: number, i: any) => sum + i.unitprice * i.quantity, 0);

    await cart.save();
    return cart;
};
