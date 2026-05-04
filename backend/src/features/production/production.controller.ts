import { Request, Response } from "express";
import {
  addProduct,
  deleteProductById,
  getProduct,
  getProductById,
  updateProduct,
  updateProductQuantity,
} from "./production.service";

// get product
export const getProductController = async (req: Request, res: Response) => {
  try {
    const searchQuery = req.query.search as string;
    const pagination = parseInt(req.query.page as string) || 1;

    const result = await getProduct(searchQuery, pagination);

    res.status(200).json({
      success: true,
      message: "Product fetched successfully!",
      data: result,
    });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
      error: err.message,
    });
  }
};

//get a product by id
export const getProductByIdController = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const response = await getProductById(productId);
    res.status(200).json({
      success: true,
      data: response,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Error in fetching single product.",
    });
    console.log(err);
  }
};

// update quantity of product
export const updateProductQuantityController = async (
  req: Request,
  res: Response
) => {
  try {
    const productId = req.params.id;
    const newQuantity = Number(req.body.quantity);
    const updatedProduct = await updateProductQuantity(productId, newQuantity);

    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: updatedProduct,
    });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Failed to update product",
      error: err.message,
    });
  }
};

// update  all fiend of product
export const updateAllFieldsController = async (
  req: Request,
  res: Response
) => {
  try {
    const productId = req.params.id;
    const updatedData = req.body;

    const updatedProduct = await updateProduct(productId, updatedData);

    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: updatedProduct,
    });
  } catch (err: any) {
    console.error("Error updating product:", err);
    res.status(500).json({
      success: false,
      message: "Failed to update product",
      error: err.message,
    });
  }
};

// delete a product by id
export const deleteProductByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const productId = req.params.id;
    const response = await deleteProductById(productId);
    res.status(200).json({
      success: true,
      message: "successfully delete this item.",
      data: response,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: true,
      message: "An error occured to delete this item.",
    });
  }
};

// add product
export const addProductController = async (req: Request, res: Response) => {
  try {
    const newData = req.body;
    const response = await addProduct(newData);
    res.status(201).json({
      success: true,
      message: "Successfully Added this item",
      data: response,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "An error occured to added this item.",
    });
  }
};
