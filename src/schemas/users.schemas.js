const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
    name: {
        type: String,
        required: true  
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
},{
    timestamps : true,
    versionKey : false
});

const Users = mongoose.model("Users", usersSchema); 

module.exports = Users;
