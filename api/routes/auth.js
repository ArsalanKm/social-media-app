import express from 'express';
import jwt from 'jsonwebtoken';
import { generateAuthToken } from '../utils/jwt.js';

const router = express.Router();
import User from '../models/User.js';
import bcrypt from 'bcrypt';

//REGISTER
router.post('/register', async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //save user and respond
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post('/login', async (req, res) => {
  console.log('here');
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json('user not found');
      return;
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      console.log('400');
      res.status(400).json('wrong password');
      return;
    }
    const token = generateAuthToken({ id: user._id, name: user.name });

    res.status(200).json({ data: { user, token: token } });
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export default router;
