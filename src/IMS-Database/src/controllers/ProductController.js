const express = require("express");

const { ProductModel } = require("../models/ProductModel");
const { createProduct, findOneProduct, findManyProducts, updateOneProduct, deleteOneProduct } = require("../utils/crud/ProductCrud");
const { validateUserAuth } = require("../functions/jwtFunctions");


const router = express.Router();

// Create new product route
router.post("/create", async (request, response) => {
	console.log("Creating product: " + JSON.stringify(request.body));
	try {
    	let result = await createProduct(request.body);
		response.json(result); 
	}
	catch (error) {
			console.error(error);
			response.status(400).json({
				success: false,
				message: "Error creating product",
				error: error.message,
			});
	}
});

// Find many products search route
router.get("/search", async (request, response) => {
    console.log("Searching for product: " + JSON.stringify(request.body));
    let result = await findManyProducts(request.body.query, request.body.limit || 100);
    console.log("Found post with data of: " + JSON.stringify(result));
	response.json(result); 
});

// Get all by category
router.get("/category/:category", async (req, response) => {
    console.log("Searching for category: " + JSON.stringify(req.params.category));
    let result = await findManyProducts({ category: req.params.category });
    console.log("Found post with data of: " + JSON.stringify(result));
	response.json(result); 
});


// Get All Products
router.get("/all", async (request, response) => {

	let result = await findManyProducts();

	response.json(result);
});






// Find Product by Item or ID
router.get("/find", async (req, res) => {
    const { id, item } = req.query; // Get id or item from the query params

    try {
        let product;
        if (id) {
            // Find by ID
            product = await Product.findById(id);
        } else if (item) {
            // Find by item name
            product = await Product.findOne({ item: item });
        }

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.json({
            success: true,
            data: product,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error finding product",
            error: error.message,
        });
    }
});


// Get Product by ID
router.get("/:id", async (request, response) => {

	let result = await findOneProduct({_id: request.params.id});

	response.json(result);
});

// Update Product by ID
router.patch("/:id", validateUserAuth, async (req, res) => {
	// Expects updateData in the request body
    const updateData  = req.body; 

    try {
        let product;
		const id = req.params.id;
        // Find product by either ID or item
        if (id) {
			product = await updateOneProduct(id, updateData);
        } 
		// if product is not found message
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found to update",
            });
        }
		// if product found and updated message
        res.json({
            success: true,
            message: "Product updated successfully",
            data: product,
        });
	// Error message	
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error updating product",
            error: error.message,
        });
    }
});

// Delete product by ID
router.delete("/:id", validateUserAuth, async (req, res) => {

	const { id } = req.params;
    try {
        let product;

        if (id) {
            // Find product by ID
            product = await deleteOneProduct(id);
        } 
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found to delete",
            });
        }

        res.json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error deleting product",
            error: error.message,
        });
    }
});

module.exports = router;
