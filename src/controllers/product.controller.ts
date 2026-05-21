import { Request, Response } from "express";
import { ProductService } from "../services/product.service.js";
import { BaseController } from "./base.controller.js";

export class ProductController extends BaseController {
    async getAll(req: Request, res: Response) {
        try {
            const products = await ProductService.getAll();
            return this.ok(res, products, "Products fetched successfully");
        } catch (error: unknown) {
            return this.serverError(res, error);
        }
    }

    async getById(req: Request, res: Response) {
        const id = this.parseId(req.params.id);

        if (id === null) {
            return this.badRequest(res, "Invalid product ID");
        }

        try {
            const product = await ProductService.getById(id);
            return this.ok(res, product, "Product fetched successfully");
        } catch (error: unknown) {
            return this.handleError(res, error);
        }
    }

    async create(req: Request, res: Response) {
        try {
            const product = await ProductService.create(req.body);
            return this.created(res, product, "Product created successfully");
        } catch (error: unknown) {
            return this.handleError(res, error);
        }
    }

    async update(req: Request, res: Response) {
        const id = this.parseId(req.params.id);

        if (id === null) {
            return this.badRequest(res, "Invalid product ID");
        }

        try {
            const product = await ProductService.update(id, req.body);
            return this.ok(res, product, "Product updated successfully");
        } catch (error: unknown) {
            return this.handleError(res, error);
        }
    }

    async delete(req: Request, res: Response) {
        const id = this.parseId(req.params.id);

        if (id === null) {
            return this.badRequest(res, "Invalid product ID");
        }

        try {
            await ProductService.delete(id);
            return this.ok(res, null, "Product deleted successfully");
        } catch (error: unknown) {
            return this.handleError(res, error);
        }
    }

    private parseId(idParam: string | string[] | undefined): number | null {
        if (typeof idParam !== "string") {
            return null;
        }

        const id = Number(idParam);

        if (!Number.isInteger(id) || id <= 0) {
            return null;
        }

        return id;
    }

    private handleError(res: Response, error: unknown) {
        if (isMySqlDuplicateError(error)) {
            return this.conflict(res, "Product already exists");
        }

        if (error instanceof Error) {
            if (error.message === "Product not found") {
                return this.notFound(res, error.message);
            }

            return this.badRequest(res, error.message);
        }

        return this.serverError(res, error);
    }
}

function isMySqlDuplicateError(error: unknown): error is { code: string } {
    return typeof error === "object"
        && error !== null
        && "code" in error
        && typeof (error as { code?: unknown }).code === "string"
        && (error as { code: string }).code === "ER_DUP_ENTRY";
}
