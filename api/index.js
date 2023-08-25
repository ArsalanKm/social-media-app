import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import multer from 'multer';
import { fileURLToPath } from 'url';

import conversationRoute from './routes/conversations.js';

import messageRoute from './routes/messages.js';

const router = express.Router();
import path from 'path';

import DB from './db/index.js';

const app = express();
import userRoute from './routes/users.js';
import authRoute from './routes/auth.js';
import postRoute from './routes/posts.js';
import tagRoute from './routes/tag.js';

dotenv.config();

DB.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/images', express.static('public/images'));

//middleware
app.use(express.json());
app.use(cors());

app.use(helmet());
app.use(morgan('common'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post('/api/upload', upload.single('file'), (req, res) => {
  try {
    return res.status(200).json('File uploded successfully');
  } catch (error) {
    console.error(error);
  }
});

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/conversations', conversationRoute);
app.use('/api/messages', messageRoute);
app.use('/api/tags', tagRoute);
app.listen(8800, () => {
  console.log('Backend server is running!');
});
