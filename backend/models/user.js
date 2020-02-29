const mongoose = require('mongoose');
const uniqueValidation = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    password: { type: String, required: true },    
});

userSchema.plugin(uniqueValidation);

module.exports = mongoose.model('User' ,userSchema);