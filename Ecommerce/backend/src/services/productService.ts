import productModel from "../models/productModel";

export const getAllproducts = async () => {
    return await productModel.find();
};

export const seedInitialproducts = async () => {
    const products = [
        {title: "P1", image: "image.png", price: 3000, stock: 100},
    ];

    const pro = await getAllproducts();

    if(pro.length === 0){
        return await productModel.insertMany(products);
    }
};
 