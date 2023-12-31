import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

import Message from '../models/Message.js';

//add

router.post('/', authMiddleware, async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get

router.get('/:conversationId', authMiddleware, async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/', async (req, res) => {
  try {
    await Message.deleteMany({});
    res.status(200).json({ message: 'deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
