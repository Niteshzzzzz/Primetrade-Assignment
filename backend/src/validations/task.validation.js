import { z } from 'zod';

export const createTaskSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }).min(1, 'Title cannot be empty').max(200, 'Title must be less than 200 characters'),
    
    description: z.string().max(1000, 'Description must be less than 1000 characters').optional(),
    
    completed: z.boolean().optional(),
  }),
});

export const updateTaskSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title cannot be empty').max(200, 'Title must be less than 200 characters').optional(),
    
    description: z.string().max(1000, 'Description must be less than 1000 characters').optional(),
    
    completed: z.boolean().optional(),
  }).refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update',
  }),
  
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid task ID format'),
  }),
});

export const taskIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid task ID format'),
  }),
});
