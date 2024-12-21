# IMS-Database/Backend
Mongo Database/Backend for Inventory Management System by Hayden & Kate\
Built using Mongoose/MongoDB, ExpressJS, & Nodemon

Deployed on Render @: 
[https://ims-backend-2qfp.onrender.com](https://ims-backend-2qfp.onrender.com])

[Presentation](/docs/Presentation/), done on Google Slides:
- [PDF, with presenter notes](/docs/Presentation/Inventory%20Management_System-with%20presenter%20notes.pdf)
- [PDF](/docs/Presentation/Inventory%20Management_System.pdf)
- [GoogleSlides/PowerPoint file](/docs/Presentation/Inventory%20Management_System.pptx)

-----
## Installation/Set up
To install dependencies required:\
`npm install mongoose express --save-dev nodemon dotenv jsonwebtoken helmet bcrypt cors`

Virtual Environment values for .env file:\
`DATABASE_URL=mongodb+srv://ims-hk:imshk@ims.ln0cl.mongodb.net/?retryWrites=true&w=majority&appName=IMS`

`JWT_SECRET_KEY=kuahjdkjdkjndwkuhdkjb`

To run server:\
Development mode:`npm run dev`\
Production mode: `npm run start`

To start the MongoDB server:\
Mac: `brew services start mongodb-community`\
WSL: `sudo service mongod start`

Check status (if needed): \
Mac: `brew services list`\
WSL: `sudo service mongod start`

To seed database and start server:\
`npm run start:seed`

To drop and seed database:\
`npm run db:drop-and-seed`

---
Initalising/dependencies/devdependencies installed (in order of building):
- Node.js:
    - `npm init -y`
- Mongoose & Express:
    - `npm install mongoose express`
- Nodemon:
- `npm install --save-dev nodemon`
- Virtual environment
    - `npm install dotenv`
- Testing:
    - `npm i --save-dev jest`
- Authentication & Password hashing:
    - `npm install jsonwebtoken helmet bcrypt`
- CORS:
    - `npm install cors`
- [mongoose-sequence](https://www.npmjs.com/package/mongoose-sequence)*: 
    - `npm install --save mongoose-sequence`
---
*mongoose-sequence is a library I installed from the npm site, it lets you add a product number that goes up by 1 for each product created.

---
## Functionality:
- Product model, schema & controller
    - Add, Update & Delete CRUD operations
    - Requirement fields for name, price, quantity & category
- User model, schema & controller
    - username & password - password hashed
    - allows signup & login of manager & employees
    - allows only manager permission to update & delete users
    - allows logged in users to update & delete products

----
## Authentication:
Models:
- User model
    - username
    - password
    - IsManager: Boolean value
        - manager: true
        - employee: false

### Routes: 
- /signup
    - POST 
    - username, password
    - creates a new user
    - password is stored hashed
    - returns a JWT
- /login
    - POST 
    - username, password
    - chcks provided data against database
    - returns a JWT
- /users/:userID
    - GET
    - requires a valid JWT header
    - gets one user and returns it
- /users/:userID
    - GET
    - requires a valid JWT header
    - gets one user and returns it

### Auth API endpoints:
- POST: /signup
- POST: /login
- GET: /users/:userID

These last two functions haven't been implemented into the front-end:*
- PATCH: /users/:userID - update user by id - must be logged in as manager to update employee
- DELETE: /users/:userID - delete user by id - must be logged in as manager to delete employee
*Included in the backend so user can be deleted if needed


See [Bruno file](/docs/Bruno/IMS/) for example

---
### Product API endpoints:
- GET: /products/search 
- GET: /products/all - get all products
- GET: /products/:id - get product by id
- GET: /products/category/:category - get products by category
- POST: /products/create - create product
- PATCH: /products/:id - update product
- DELETE: /products/:id - delete product by id
See [Bruno file](/docs/Bruno/IMS/) for example

---
## Testing:
Written tests for validation:
- if all product requirements are provided - success
- if price is a negative number - fail
- if quantity is a negative number - fail
- if category is not provided - fail

![Validation product tests](/docs/Tests/Validation%20product%20tests.png)

[Bruno tests](/docs/Bruno%20Screenshots/):\
User signup
![User signup](/docs/Bruno%20Screenshots/localhost-use%20signup.png)

User login
![User login](/docs/Bruno%20Screenshots/localhost-user%20login.png)

Get all products
![Get all products](/docs/Bruno%20Screenshots/localhost-%20get%20all%20products.png)

Get all products by category
![Get all products by category](/docs/Bruno%20Screenshots/localhost-%20get%20all%20by%20category.png)

Create product
![Create product](/docs/Bruno%20Screenshots/localhost-%20create%20product%20with%20jwt%20OR%20auth%20bearer.png)

Update product with no jwt provided
![Update product with no jwt provided](/docs/Bruno%20Screenshots/localhost-%20update%20product%20with%20no%20jwt.png)

Update product with jwt provided
![Update product with jwt provided](/docs/Bruno%20Screenshots/localhost-%20update%20product%20with%20jwt.png)

Delete product with no jwt provided
![Delete product with no jwt provided](/docs/Bruno%20Screenshots/localhost-%20delete%20product%20with%20no%20jwt.png)

Delete product with jwt provided
![Delete product with jwt provided](/docs/Bruno%20Screenshots/localhost-%20delete%20product%20with%20jwt.png)

---
## Techstack:
- Express
- Mongoose/MongoDB
- CloudAtlasDB
- [IMS trello board](https://trello.com/b/RkNm85hb)
- GitHub
- Bruno
- Google
