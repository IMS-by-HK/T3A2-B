// Provide CRUD functions for the ProductModel 
const { query } = require("express");
const { ProductModel } = require("../../models/ProductModel");

// Create new product
async function createProduct (product) {
    //name, price, quantity, category, description = null) {
    
    let result = await ProductModel.create(product);
        // name: name,
        // price: price,
        // quantity: quantity,
        // category: category,
        // description: description
    return result;
}


// Find one product
async function findOneProduct (query) {
    let result = await ProductModel.findOne(query);

    return result;
}

// Find many products
async function findManyProducts (query, limit) {
    return result = await ProductModel.find(query).limit(limit);
}

// Update one product
async function updateOneProduct(id, updateData) {
    return result = await ProductModel.updateOne({_id: id}, updateData);
}

// Update many products
async function updateManyProducts(query, updateData) {
    let result = await ProductModel.updateMany(query, updateData);
    return result;
}
// Delete one product
async function deleteOneProduct (id) {
    return result = await ProductModel.findByIdAndDelete(id);
}


module.exports = {
    createProduct,
    findOneProduct, findManyProducts,
    updateOneProduct, updateManyProducts,
    deleteOneProduct
}