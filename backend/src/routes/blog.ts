import { createBlogInput, updateBlogInput } from '@bishalmoktan/blog-common';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import { verify } from 'hono/jwt';

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

/**
 * Using the middleware
 */
blogRouter.use('/*', async (c, next) => {
  const token = c.req.header('Authorization')?.split(' ')[1];
  try {
    const payload = await verify(token || '', c.env.JWT_SECRET);
    if (!payload) {
      c.status(401);
      return c.json({
        message: 'Unauthorized!',
      });
    }
    c.set('userId', payload.id);
    await next();
  } catch (error) {
    c.status(401);
    return c.json({
      message: 'Unauthorized!',
    });
  }
});

/**
 * Creating a new blog post
 */
blogRouter.post('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const body = await c.req.json();
    const parsedInput = createBlogInput.safeParse(body);
    if (!parsedInput.success) {
      c.status(403);
      return c.json({
        message: JSON.parse(parsedInput.error.message)[0].message,
      });
    }
    const newPost = await prisma.post.create({
      data: {
        title: parsedInput.data.title,
        content: parsedInput.data.content,
        authorId: c.get('userId'),
      },
    });
    return c.json({
      newPost,
    });
  } catch (error) {
    c.status(411);
    return c.json({
      message: 'Error posting the blog',
    });
  }
});

/**
 * Updating the blog
 */
blogRouter.put('/:id', async (c) => {
  const blogId = c.req.param('id');
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const body = await c.req.json();
    const parsedInput = updateBlogInput.safeParse(body);
    if (!parsedInput.success) {
      c.status(403);
      return c.json({
        message: JSON.parse(parsedInput.error.message)[0].message,
      });
    }
    const updatedPost = await prisma.post.update({
      where: {
        id: blogId,
        authorId: c.get('userId'),
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return c.json({
      message: 'Update successful!',
      updatedPost,
    });
  } catch (error) {
    c.status(411);
    return c.json({
      message: 'Error updating the blog',
    });
  }
});

/**
 * Getting all the blogs
 */

// TODO: Create pagination
blogRouter.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const posts = await prisma.post.findMany();
    return c.json(posts);
  } catch (error) {
    c.status(401);
    return c.json({
      message: 'Error fetching the blogs',
    });
  }
});

/**
 * Getting the single post
 */
blogRouter.get('/:id', async (c) => {
  const blogId = c.req.param('id');
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: blogId,
        authorId: c.get('userId'),
      },
    });
    return c.json({
      post,
    });
  } catch (error) {
    c.status(411);
    return c.json({
      message: 'Error fetching the blog',
    });
  }
});
