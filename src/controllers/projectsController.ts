import {Request, Response} from "express"
import {prisma} from "../lib/prisma"

export async function createProject(req: Request, res: Response) {
    const {name, ownerId} = req.body

if(!name || !ownerId){
    return res.status(400).json({error: "Name and ownerId are required"})
}

    const project = await prisma.project.create({
        data: {
            name,
            ownerId
        }
    })
    res.json(project)
}

export async function getProjects(req: Request, res: Response) {
    const projects = await prisma.project.findMany({
        include: {
            owner: true
        }
    })

    res.json(projects)
}