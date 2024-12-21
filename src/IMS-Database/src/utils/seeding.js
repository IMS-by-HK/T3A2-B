const { createProduct, findOneProduct } = require("./crud/ProductCrud");
const { createUser } = require("./crud/UserCrud");
const { dbConnect, dbDisconnect } = require("./database");
const bcrypt = require('bcrypt');

require("dotenv").config();

async function seed () {
    const hashedPassword = await bcrypt.hash("SomePassword", 10);

    await createUser({
        username: "Manager", 
        password: hashedPassword,
        isManager: true
    });
    await createUser({
        username: "employee1", 
        password: hashedPassword,
        isManager: false
    });
    await createUser({
        username: "employee2", 
        password: hashedPassword,
        isManager: false
    });


    await createProduct({
        name: "Apple",                      // name
        price: "2.00",                      // price
        quantity: "100",                    // qty
        category: "Produce",                // category
        description: "Granny Smith green apple"  // description
    });
    await createProduct({
        name: "Banana",      // name
        price: "1.00",                 // price
        quantity: "50",                  // qty
        category: "Produce",     // category
        description: "Individual Lady Fingers"  // desc
    });
    await createProduct({
        name: "White Chocolate",
        price: 2.99,
        quantity: "10",      // name
        category: "Dry",     // category
        description: "White chocolate bar 200g"  // desc
    });
    await createProduct({
        name: "Mild Hungarian Salami Sliced 80g",
        price: 5,
        quantity: "25",      // name
        category: "Deli",     // category
        description: "Mild Hungarian Salami Sliced 80g"  // desc
    });
    await createProduct({
        name: "Helga's Light Rye Bread 680g",
        price: 5,
        quantity: "15",      // name
        category: "Bakery",     // category
        description: "Light Rye Bread Loaf, Soft and light, with a sweet and nutty flavour."  // desc
    });
    await createProduct({
        name: "Bulla's Creamy Vaniilla Icecream 2L",
        price: 5.50,
        quantity: "40",      // name
        category: "Frozen",     // category
        description: "Vanilla flavoured ice cream."  // desc
    });
    await createProduct({
        name: "Soft white wraps 8 pk 360g",
        price: 2.40,
        quantity: "15",      // name
        category: "Bakery",     // category
        description: "Delicious convenient wraps, great for lunch, dinner or snack. Ready to fill with your favourite ingredients."  // desc
    });


    let resultFindOne = await findOneProduct({item: "Example Product"});

    console.log(resultFindOne);

    console.log("Seeding is done, disconnecting from the database!");
    await dbDisconnect();
}

dbConnect().then(() => {
    console.log("Connected to DB, seeding now!");
    seed();
})
