const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);


// 1. Make a schema
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    trim: true
  },
  // Makes price become currency value minimum "00.00"
  price: {
    type: Number,
    required: true,
    min: [0, 'Price must not be negative.']
  },
  quantity: {
    type: Number,
    required: true,
    min: [0, 'Quantity must not be negative.']
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

ProductSchema.plugin(AutoIncrement, { inc_field: 'productId' });

// 2. Make a model based on the schema
const ProductModel = mongoose.model('Product', ProductSchema);


// 3. Export the model for the rest of our code to use
module.exports = {
	ProductModel
}