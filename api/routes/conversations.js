import express from 'express';
import Conversation from '../models/Conversation.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

//new conv

router.post('/', authMiddleware, async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const conversation = await Conversation.find({});
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get conv of a user

router.get('/:userId', authMiddleware, async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conv includes two userId

router.get(
  '/find/:firstUserId/:secondUserId',
  authMiddleware,
  async (req, res) => {
    try {
      const conversation = await Conversation.findOne({
        members: { $all: [req.params.firstUserId, req.params.secondUserId] },
      });

      res.status(200).json(conversation);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.delete('/', authMiddleware, async (req, res) => {
  try {
    await Conversation.deleteMany({});
    res.status(200).json({ message: 'deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
