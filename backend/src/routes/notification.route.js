import express from 'express';
import {
  deleteNotification,
  getNotifications,
} from '../controllers/notification.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const route = express.Router();

// public route
route.get('/', getNotifications);

// private route
route.delete('/:notificationId', protectRoute, deleteNotification);

export default route;
