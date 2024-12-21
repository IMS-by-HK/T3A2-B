const express = require("express");

const { UserModel } = require("../models/UserModel");
const { createUser, findOneUser, findManyUsers, updateOneUser, deleteOneUser } = require("../utils/crud/UserCrud");
const bcrypt = require('bcrypt');
const { generateJWT, validateUserAuth, validateUserIsManager } = require("../functions/jwtFunctions");


const router = express.Router();

// Signup
router.post("/signup", async (request, response) => {
    try {
	// Check that a username and password are provided in request.body 
	let username = request.body.username;
	let password = await bcrypt.hash(request.body.password, 10);
    console.log(request.body);
	// If username or password is falsey
	if (!username || !password) {
		response.status(400).json({
			message:"Incorrect or missing sign-up credentials provided."
		});
	}
	// Make a user in the DB using the username and password
	let newUser = await createUser({ username, password });

	// Make a JWT based on the username and userID 
	let newJwt = generateJWT(newUser.id, newUser.username);

	// Return the JWT 
	response.json({
		jwt: newJwt,
		user: {
			id: newUser.id,
			username: newUser.username
		}
	});
  } catch (error) {
    console.error(error);
    res.status(500).json({
        success: false,
        message: "Error with user signup",
        error: error.message,
    });
}
});

router.post('/login', async (req, res) => {
    try {
    const { username, password } = req.body;
    const user = await findOneUser({ username });
    if (!user) {
        console.error("User not found");
        return res.status(401).json({ error: 'Authentication failed' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        console.error("Password does not match");
        return res.status(401).json({ error: 'Authentication failed' });
    }
    let newJwt = generateJWT(user.id, user.username);
    // Return the JWT 
	res.json({
		jwt: newJwt,
		user: {
			id: user.id,
			username: user.username
		}
	});
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error with login",
            error: error.message,
        });
    }
});

// Get All Users
router.get("/all", validateUserAuth, validateUserIsManager, async (request, response) => {

	let result = await findManyUsers();

	response.json(result);
});

// Get User by ID
router.get("/:id", validateUserAuth, validateUserIsManager, async (request, response) => {

	let result = await findOneUser({_id: request.params.id});

	response.json(result);
});

// Update User by ID
router.patch("/:id", validateUserAuth, validateUserIsManager, async (req, res) => {
	// Expects updateData in the request body
    const updateData  = req.body; 

    try {
        let user;
		const id = req.params.id;
        // Find user by either ID 
        if (id) {
			user = await updateOneUser(id, updateData);
        } 
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found to update",
            });
        }
		// If user found and updated message
        res.json({
            success: true,
            message: "User updated successfully",
            data: user,
        });
	// Error message	
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error updating user",
            error: error.message,
        });
    }
});

// Delete user by ID
router.delete("/:id", validateUserAuth, validateUserIsManager, async (req, res) => {

	const { id } = req.params;
    try {
        let user;

        if (id) {
            // Find user by ID
            user = await deleteOneUser(id);
        } 

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found to delete",
            });
        }

        res.json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error deleting user",
            error: error.message,
        });
    }
});


module.exports = router;