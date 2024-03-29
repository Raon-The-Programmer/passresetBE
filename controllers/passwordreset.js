const user = require('../models/user');
const passwordRouter = require('express').Router();
const nodemailer = require('nodemailer');
const { JWT_SECRET, OTP } = require('../utilies/config');
const jwt = require('jsonwebtoken');
const bcrypt=require('bcrypt')

passwordRouter.post('/forget-password', async (req, res) => {
  const { username } = req.body;
  const existingUser = await user.findOne({ username });

  if (!existingUser) {
    return res.json({
      message: 'User not found!',
    });
  }

  const onePass = Math.random().toString(36).slice(-6)
  existingUser.resetPassword = onePass; 
  await existingUser.save();


  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'msdrahuljohn@gmail.com',
      pass: OTP,
    },
  });

  const mailOptions = {
    from: 'msdrahuljohn@gmail.com',
    to: existingUser.username,
    subject: 'Reset Your Password',
    text: `you are receiving this email because you request has passwords reset for your account .\n\n please use the following  OTP to reset your password:${onePass} \n\n if you did not request a password to ignore this email. `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.json({ message: 'Error sending reset email' });
    } else {
      return res.json({ message: 'Reset email sent successfully' });
    }
  });
});

// to reset new Password in store DataBase

passwordRouter.post('/forget-password/:onePass', async (req, res) => {
  const { onePass } = req.params;
  const { password } = req.body;

  // Check if password is provided
  if (!password) {
    return res.status(400).json({ message: 'Password is required' });
  }

  const User = await user.findOne({ resetPassword: onePass }).maxTimeMS(30000);;

  if (!User) {
    return res.status(404).json({ message: 'Invalid OTP' });
  }

  try {
    // Hash the new password
    const newpassword = await bcrypt.hash(password, 10);

    // Update user fields
    User.passwordHash = newpassword;
    User.resetPassword = null;

    // Save the updated user
    await User.save();

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = passwordRouter;