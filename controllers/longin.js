const loginRouter = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const { JWT_SECRET } = require('../utilies/config');

loginRouter.post('/', async (req, res) => {
    const { username, password } = req.body;
    const users = await user.findOne({ username });

    if (!users) {
        return res.json({
            message: 'user not found!'
        })
    }

    const auth = await bcrypt.compare(password, users.passwordHash)
    if (!auth) {
        return res.json({
            message:'password is wrong'
        })
    }
    const payload = {
        username: users.username,
        id:users._id
    }
    
    const token=jwt.sign(payload,JWT_SECRET)
     res.json({
            message:'password is correct',token, username: users.username
        })
    
})

module.exports = loginRouter;