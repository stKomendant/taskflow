import {prisma} from "../lib/prisma"
import {Request, Response, NextFunction} from "express"

export async function createTask(req: Request, res: Response){
    const {title, projectId} = req.body

    if(!title || !projectId){
        return res.status(400).json({error: "Title and projectId are required"})
    }

    const task = await prisma.task.create({
        data: {
            title,
            projectId
        }
    })
    res.json(task)
}

export async function getTasks(req: Request, res: Response){
    const tasks = await prisma.task.findMany({
        include: {
            project: true
        }
    })
    res.json(tasks)
}

export async function updateTask(req: Request, res: Response, next: NextFunction) {
    try{

        const {id} = req.params as {id: string} 
        const {title, done} = req.body
    
        const tasks = await prisma.task.update({
            where: {id},
            data: {title, done}
        })
    
        res.json(tasks)
    }catch(err){
        next(err)
    }
}

export async function deleteTask(req: Request, res: Response, next: NextFunction) {
  try {
      const {id} = req.params as {id: string}
    await prisma.task.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}