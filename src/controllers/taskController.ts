import {prisma} from "../lib/prisma"
import {Request, Response} from "express"

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