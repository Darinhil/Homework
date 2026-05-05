export default class ProductController {
    getAll(req, res) {
        res.send("Get all product");
    }

    getProductById(req, res) {
        const id = req.params.id;

        res.send(`Get product id ${id}`);
    }

    create(req, res) {
        res.send("Create product");
    }

    updateProduct(req, res) {
        const id = req.params.id;

        res.send(`Update product id ${id}`);
    }

    deleteProduct(req, res) {
        const id = req.params.id;

        res.send(`Delete product id ${id}`);
    }
}
