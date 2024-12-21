// Purpose:
// Configure the server, eg.
// - routes
// - middleware 
// - CORS 
// - debug logger setups
// - connections to databases
// - connections to file storage 

const express = require("express");
const app = express();
const cors = require('cors');

app.use(express.json());

// let corsOptions = {
// 	origin: ['https://ims-hk.netlify.app/', 'http://localhost:3000'],
// }
// app.use(cors(corsOptions));
app.use(cors());
app.use(require('./controllers/UserController'));


// Server app configuration goes here
// middleware, routes, etc 

app.use(express.json());


//     //          CRA local                  local 					Vite local              Vite local              Deployed React app
//     origin: ["http://localhost:3000", "http://localhost:8080", "http://localhost:5173", "http://127.0.0.1:5173","https://ims-hk.netlify.app/"],

// app.verb(path, callback);
app.get("/", (request, response) => {
	// response.send("<h1>Hello, world!</h1>");

    response.json({
		message:"Hello world!"
	});
});

// Import router and tell app to use router

// User
const UserController = require("./controllers/UserController.js");
app.use("/users", UserController);
// Products
const ProductController = require("./controllers/ProductController.js");
app.use("/products", ProductController);



// Server app configuration is finished by this point 
// Export the app so that other files can control when the server
// starts and stops 
module.exports = {
	app
}
