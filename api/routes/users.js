import User from '../models/User.js';
import express from 'express';
import bcrypt from 'bcrypt';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

//update user
router.put('/:id', authMiddleware, async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json('Account has been updated');
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json('You can update only your account!');
  }
});

//delete user
router.delete('/:id', authMiddleware, async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json('Account has been deleted');
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json('You can delete only your account!');
  }
});

router.get('/userInfo', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.currentUserId);
    if (user) {
      res.status(200).json({ data: { user } });
      return;
    } else {
      res.status(401).json('not found');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
//get  users
router.get('/', authMiddleware, async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    if (!userId && !username) {
      const users = await User.find({});
      res.status(200).json(users);
      return;
    }
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get friends
router.get('/friends/:userId', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList);
  } catch (err) {
    res.status(500).json(err);
  }
});

//follow a user

router.put('/:id/follow', authMiddleware, async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json('user has been followed');
      } else {
        res.status(403).json('you allready follow this user');
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('you cant follow yourself');
  }
});

//unfollow a user

router.put('/:id/unfollow', authMiddleware, async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json('user has been unfollowed');
      } else {
        res.status(403).json('you dont follow this user');
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('you cant unfollow yourself');
  }
});

export default router;
