import { z } from 'zod';

const validate = (schema) => async (req, res, next) => {
  try {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    return next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
      
      return res.status(400).json({
        message: 'Validation failed',
        errors: errorMessages,
      });
    }
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default validate;
