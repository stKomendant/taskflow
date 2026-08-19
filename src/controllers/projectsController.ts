import { Response, Request } from "express";
import { prisma } from "../lib/prisma";
import { AuthRequest } from "../middleware/auth";

export async function createProject(req: AuthRequest, res: Response) {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  const project = await prisma.project.create({
    data: { name, ownerId: req.userId! },
  });
  res.json(project);
}

export async function getProjects(req: Request, res: Response) {
  const projects = await prisma.project.findMany({
    include: { tasks: true },
  });
  res.json(projects);
}