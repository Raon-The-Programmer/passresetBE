const { version } = require('mongoose');
const user = require('../models/user');
const bcrypt=require('bcrypt')
const userRouter = require('express').Router();

userRouter.post('/', async (req, res) => {
    const { username, name, password } = req.body;
    const existingUser = await user.findOne({ username }).maxTimeMS(30000);

    if (existingUser) {
        return res.json({
             message: 'This email ID is already in use. Please choose another one.' 
        })
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const users = new user({
        username,
        name,
        passwordHash
    });

    const savedUser = await users.save();

    res.json(savedUser)
});

module.exports = userRouter;