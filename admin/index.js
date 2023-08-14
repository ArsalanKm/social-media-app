import AdminJS, { ComponentLoader } from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import express from 'express';
import { dark, light, noSidebar } from '@adminjs/themes';
import mongoose from 'mongoose';
import User from './models/User.js';
import Conversation from './models/Conversation.js';
import Message from './models/Message.js';
import Tags from './models/Tags.js';
import Post from './models/Post.js';
import * as AdminJSMongoose from '@adminjs/mongoose';

const componentLoader = new ComponentLoader();

const Components = {
  Dashboard: componentLoader.add('Dashboard', './test'),
  // other custom components
};
const PORT = 3001;

const start = async () => {
  const app = express();
  await mongoose
    .connect('mongodb://0.0.0.0:27017/' || '', { dbName: 'mern-app' })
    .then(() => console.log('successfully connected to database'))
    .catch((e) => console.error('Connection error to database', e));
  AdminJS.registerAdapter({
    Resource: AdminJSMongoose.Resource,
    Database: AdminJSMongoose.Database,
  });

  const admin = new AdminJS({
    resources: [User, Conversation, Message, Tags, Post],
    defaultTheme: dark.id,
    availableThemes: [dark, light, noSidebar],
  });

  const adminRouter = AdminJSExpress.buildRouter(admin);
  app.use(admin.options.rootPath, adminRouter);

  app.listen(PORT, () => {
    console.log(
      `AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`
    );
  });
};

start();
