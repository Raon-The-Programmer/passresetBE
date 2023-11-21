const { version } = require('mongoose');
const user = require('../models/user');
const bcrypt=require('bcrypt')
const userRouter = require('express').Router();

userRouter.post('/', async (req, res) => {
    const { username, name, password } = req.body;

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