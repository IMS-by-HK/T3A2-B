// Provide CRUD functions for the UserModel 
// UserModel to be changed to admin only later on: WIP
const { query } = require("express");
const { UserModel } = require("../../models/UserModel");

async function createUser (user) {
    let result = await UserModel.create(user);

    return result;
}

async function findOneUser (query) {
    let result = await UserModel.findOne(query);

    return result;
}
// Find many Users
async function findManyUsers (query, limit) {
    return result = await UserModel.find(query).limit(limit);
}

// Update one user
async function updateOneUser(id, updateData) {
    return result = await UserModel.updateOne({_id: id}, updateData);
}

// Delete one user
async function deleteOneUser(id) {
    return result = await UserModel.findByIdAndDelete(id);
}


module.exports = {
    createUser,
    findOneUser, 
    findManyUsers,
    updateOneUser,
    deleteOneUser,
}