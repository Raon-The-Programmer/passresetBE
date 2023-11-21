const mongoose = require('mongoose');

const userScheme = new mongoose.Schema({
    username: String,
    name: String,
    passwordHash: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date
}, { versionKey: false });

const user = mongoose.model('user', userScheme, 'users')

module.exports = user;