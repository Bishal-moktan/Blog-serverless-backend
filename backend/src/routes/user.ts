import { siginInput, signupInput } from '@bishalmoktan/blog-common';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import { sign } from 'hono/jwt';
import bcrypt from 'bcryptjs';

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

/**
 * Sign up route
 */
userRouter.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const parsedInput = signupInput.safeParse(body);
    if (!parsedInput.success) {
      c.status(403);
      return c.json({
        message: JSON.parse(parsedInput.error.message)[0].message,
      });
    }
    const user = await prisma.user.findUnique({
      where: {
        email: parsedInput.data.email,
      },
    });

    if (user) {
      c.status(409);
      return c.json({
        message: 'User already exists!',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(parsedInput.data.password, salt);

    const newUser = await prisma.user.create({
      data: {
        email: parsedInput.data.email,
        password: hashedPassword,
      },
    });

    const jwt = await sign(
      {
        id: newUser.id,
      },
      c.env.JWT_SECRET
    );
    c.status(200);
    return c.json({
      message: 'User signed up successfully!',
      token: jwt,
    });
  } catch (error) {
    c.status(500);
    return c.json({
      message: 'Something went wrong!',
    });
  }
});

/**
 * Sign in route
 */
userRouter.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const parsedInput = siginInput.safeParse(body);
    if (!parsedInput.success) {
      c.status(403);
      return c.json({
        message: JSON.parse(parsedInput.error.message)[0].message,
      });
    }
    const user = await prisma.user.findUnique({
      where: {
        email: parsedInput.data.email,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({
        message: 'Invalid email or password!',
      });
    }

    const isCorrectPassword = await bcrypt.compare(
      parsedInput.data.password,
      user.password
    );
    console.log('PASSWORD CORRECT: ', isCorrectPassword);
    if (!isCorrectPassword) {
      c.status(403);
      return c.json({
        message: 'Invalid email or password!!',
      });
    }
    const jwt = await sign(
      {
        id: user.id,
      },
      c.env.JWT_SECRET
    );

    return c.json({
      token: jwt,
      message: 'Redirecting...',
    });
  } catch (error) {
    c.status(411);
    return c.json({
      message: 'Something went wrong!',
    });
  }
});
