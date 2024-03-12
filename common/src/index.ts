import z from 'zod';

export const siginInput = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const signupInput = z.object({
  email: z.string().email({
    message: 'Invalid email',
  }),
  password: z.string().min(6, {
    message: 'Minimum 6 character required',
  }),
  authorId: z.string().optional(),
});

export const createBlogInput = z.object({
  title: z.string(),
  content: z.string(),
});

export const updateBlogInput = z.object({
  title: z.string(),
  content: z.string(),
});

export type siginInputType = z.infer<typeof siginInput>;
export type signupInputType = z.infer<typeof signupInput>;
export type createBlogInputType = z.infer<typeof createBlogInput>;
export type updateBlogInputType = z.infer<typeof updateBlogInput>;
