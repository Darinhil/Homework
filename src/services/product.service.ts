import { CreateProductInput, Product } from "../models/product.model.js";
import { ProductRepository } from "../repositories/product.repository.js";

export class ProductService {
    static async getAll(): Promise<Product[]> {
        return await ProductRepository.getAll();
    }

    static async getById(id: number): Promise<Product> {
        const product = await ProductRepository.getById(id);

        if (!product) {
            throw new Error("Product not found");
        }

        return product;
    }

    static async create(payload: unknown): Promise<Product> {
        const product = parseProductInput(payload);
        const id = await ProductRepository.create(product);

        return {
            id,
            ...product
        };
    }

    static async update(id: number, payload: unknown): Promise<Product> {
        const product = parseProductInput(payload);
        const updated = await ProductRepository.update(id, product);

        if (!updated) {
            throw new Error("Product not found");
        }

        return {
            id,
            ...product
        };
    }

    static async delete(id: number): Promise<boolean> {
        const deleted = await ProductRepository.delete(id);

        if (!deleted) {
            throw new Error("Product not found");
        }

        return true;
    }
}

function parseProductInput(payload: unknown): CreateProductInput {
    if (!payload || typeof payload !== "object") {
        throw new Error("Request body must be an object");
    }

    const { name, price, description, stock } = payload as Record<string, unknown>;
    const parsedPrice = typeof price === "number" ? price : Number(price);
    const parsedStock = typeof stock === "number" ? stock : Number(stock);

    if (typeof name !== "string" || !name.trim()) {
        throw new Error("Name is required");
    }

    if (isNaN(parsedPrice) || parsedPrice < 0) {
        throw new Error("Price must be a non-negative number");
    }

    if (typeof description !== "string" || !description.trim()) {
        throw new Error("Description is required");
    }

    if (!Number.isInteger(parsedStock) || parsedStock < 0) {
        throw new Error("Stock must be a non-negative integer");
    }

    return {
        name: name.trim(),
        price: parsedPrice,
        description: description.trim(),
        stock: parsedStock
    };
}
