import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({success: true, data: products});
    } catch (error) {
        console.error("Error while fetching products:", error.message);
    return res.status(500).json({success: false, message: "Server Error"});
    }
};

export const createProduct = async (req, res) => {
    const product = req.body;
    console.log(product);
    if(!product.name || !product.price || !product.image) {
     return res.status(400).json({success: false, message: "Please provide all fields."});
    }
 
    const newProduct = new Product(product);
 
    try {
     await newProduct.save();
     return res.status(201).json({success: true, data: newProduct});
    } catch (error) {
     console.error("Error while saving product:", error.message);
     return res.status(500).json({success: false, message: "Server Error"});
    }
 };

 export const updateProduct = async (req, res) => {
    const {id} = req.params;
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({success: false, message: "Product not found with that id."});
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
        res.status(200).json({success: true, data: updatedProduct});
    } catch (error) {
        console.error("Error while updating product:", error.message);
        return res.status(500).json({success: false, message: "Server Error"});
    }

};

export const deleteProduct = async (req, res) => {
    const {id} = req.params;
    console.log("ID:", id);

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({success: false, message: "Product not found with that id."});
    }

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product deleted"});
    } catch (error) {
        return res.status(500).json({success: false, message: "Server Error"});
    }

};