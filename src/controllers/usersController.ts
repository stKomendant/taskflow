import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { prisma } from '../lib/prisma';

export async function createUser(req: Request, res: Response) {
  const { email, password, name } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hashedPassword, name },
  });
  res.json(user);
}

export async function getUsers(req: Request, res: Response) {
  const users = await prisma.user.findMany();
  res.json(users);
}
