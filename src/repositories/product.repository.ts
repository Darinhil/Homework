import { ResultSetHeader, RowDataPacket } from "mysql2";
import { db } from "../config/db.js";
import { CreateProductInput, Product } from "../models/product.model.js";

type ProductRow = Product & RowDataPacket;

export class ProductRepository {
    static async getAll(): Promise<Product[]> {
        const [rows] = await db.query<ProductRow[]>(
            "SELECT id, name, price, description, stock, created_at FROM products ORDER BY id ASC"
        );

        return rows;
    }

    static async getById(id: number): Promise<Product | null> {
        const [rows] = await db.query<ProductRow[]>(
            "SELECT id, name, price, description, stock, created_at FROM products WHERE id = ?",
            [id]
        );

        return rows[0] ?? null;
    }

    static async create(product: CreateProductInput): Promise<number> {
        const [result] = await db.execute<ResultSetHeader>(
            "INSERT INTO products (name, price, description, stock) VALUES (?, ?, ?, ?)",
            [product.name, product.price, product.description, product.stock]
        );

        return result.insertId;
    }

    static async update(id: number, product: CreateProductInput): Promise<boolean> {
        const [result] = await db.execute<ResultSetHeader>(
            "UPDATE products SET name = ?, price = ?, description = ?, stock = ? WHERE id = ?",
            [product.name, product.price, product.description, product.stock, id]
        );

        return result.affectedRows > 0;
    }

    static async delete(id: number): Promise<boolean> {
        const [result] = await db.execute<ResultSetHeader>(
            "DELETE FROM products WHERE id = ?",
            [id]
        );

        return result.affectedRows > 0;
    }
}
