import express from 'express';
import {
  createComment,
  deleteComment,
  getComments,
} from '../controllers/comment.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const route = express.Router();

// public route
route.get('/post/:postId', getComments);

//protected routes
route.post('/post/:postId', protectRoute, createComment);
route.delete('/post/:postId', protectRoute, deleteComment);

export default route;
