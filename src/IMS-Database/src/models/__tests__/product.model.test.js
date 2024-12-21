
const mongoose = require( 'mongoose' )
const { ProductModel } = require("../../models/ProductModel");

mongoose.connect ( 'mongodb://localhost/testProduct', {})
mongoose.connection.on( 'error', () => {
  throw new Error(`unable to connect to database: `)
})


afterAll( async () => {
    try {
      await mongoose.connection.close()
    } catch (err) {
      console.log(err)
    }
  })
  test ( "Product validation - success", async () => {
    let error = null;
  
    try {
      const product = await ProductModel.create({
          name: "apple",
          price: 3,
          quantity: 1,
          category: "fruit"
      });
      //await product.validate();
    } catch (e) {
      error = e;
    }
    expect(error).toBeNull();
  })

test ( "Product price validation - fail", async () => {
  let error = null;

  try {
    const product = await ProductModel.create({
        name: "apple",
        price: -3,
        quantity: 1,
        category: "fruit"
    });
  } catch (e) {
    error = e;
  }
  expect(error).not.toBeNull();
  expect(error.message).toEqual("Product validation failed: price: Price must not be negative.")
})
 
  test ( "Product quantity validation - fail", async () => {
    let error = null;
  
    try {
      const product = await ProductModel.create({
          name: "apple",
          price: 3,
          quantity: -1,
          category: "fruit"
      });
    } catch (e) {
      error = e;
    }
    expect(error).not.toBeNull();
    expect(error.message).toEqual("Product validation failed: quantity: Quantity must not be negative.")
  })
  
  test ( "Product category validation - fail", async () => {
    let error = null;
  
    try {
      const product = await ProductModel.create({
          name: "apple",
          price: 3,
          quantity: -1
      });
    } catch (e) {
      error = e;
    }
    expect(error).not.toBeNull();
  })