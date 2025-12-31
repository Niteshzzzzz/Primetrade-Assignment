import express from 'express';
const router = express.Router();
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} from '../controllers/task.controller.js';
import protect from '../middlewares/auth.middleware.js';
import validate from '../middlewares/validate.middleware.js';
import { createTaskSchema, updateTaskSchema, taskIdSchema } from '../validations/task.validation.js';

router.route('/').get(protect, getTasks).post(protect, validate(createTaskSchema), createTask);
router.route('/:id')
  .get(protect, validate(taskIdSchema), getTask)
  .put(protect, validate(updateTaskSchema), updateTask)
  .delete(protect, validate(taskIdSchema), deleteTask);

export default router;
