import { createBlogInput, updateBlogInput } from '@bishalmoktan/blog-common';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import { verify } from 'hono/jwt';

export const commentRouter = new Hono<{
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
commentRouter.use('/*', async (c, next) => {
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
 * Creating a new comment post
 */
commentRouter.post('/:id', async (c) => {
  const postId = c.req.param('id');
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const body = await c.req.json();
    console.log(body);
    if (!body.comment || body.comment === '') {
      c.status(404);
      return c.json({
        message: 'Comment is missing!',
      });
    }

    const newComment = await prisma.comment.create({
      data: {
        comment: body.comment,
        postId: postId,
        userId: c.get('userId'),
      },
    });

    return c.json({
      newComment,
    });
  } catch (error) {
    c.status(411);
    return c.json({
      message: 'Error posting the blog',
    });
  }
});

/**
 * Updating the comment
 */
commentRouter.put('/:id', async (c) => {
  const postId = c.req.param('id');
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const body = await c.req.json();
    const updatedComment = await prisma.comment.update({
      where: {
        id: postId,
        userId: c.get('userId'),
      },
      data: {
        comment: body.comment,
      },
    });
    return c.json({
      message: 'Update successful!',
      updatedComment,
    });
  } catch (error) {
    c.status(411);
    return c.json({
      message: 'Error updating the comments',
    });
  }
});

/**
 * Getting all the comments
 */

// TODO: Create pagination
commentRouter.get('/:id/bulk', async (c) => {
  const postId = c.req.param('id');
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const posts = await prisma.comment.findMany({
      where: {
        postId: postId,
      },
      select: {
        comment: true,
        createdAt: true,

        id: true,
        user: {
          select: {
            name: true,
          },
        },
      },
    });
    return c.json(posts);
  } catch (error) {
    c.status(401);
    return c.json({
      message: 'Error fetching the comments',
    });
  }
});
