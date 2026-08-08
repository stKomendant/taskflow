import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

const JWT_SECRET = process.env.JWT_SECRET || "myJWT-SECRET";

export async function loginUser(req: Request, res: Response) {
const {email, password} = req.body

if(!email || !password){
    return res.status(400).json({error: "Email and password are required"})
}

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token });
}