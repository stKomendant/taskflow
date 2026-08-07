import express from "express"
import {prisma} from "./lib/prisma"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const app = express()
const PORT = 3000
app.use(express.json())

const JWT_SECRET = process.env.JWT_SECRET || "myJWT-SECRET"
 
app.get("/users", async (req, res) => {
    const users = await prisma.user.findMany()
    res.json(users)
})

app.post("/projects", async (req, res) => {
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
})

app.get("/projects", async (req, res) => {
    const projects = await prisma.project.findMany({
        include: {
            owner: true
        }
    })

    res.json(projects)
})

app.post("/tasks", async (req, res) => {
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
})

app.get("/tasks", async (req, res) => {
    const tasks = await prisma.task.findMany({
        include: {
            project: true
        }
    })
    res.json(tasks)
})

app.post("/users", async (req, res) => {
    const {email, name, password} = req.body


if(!email || !password){
    return res.status(400).json({error: "Email and password are required"})
}

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
        data: {
            email,
            name,
            password: hashedPassword
        }
    })

    res.json(user)
})

app.post("/login", async (req, res) => {
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
});



app.listen(PORT, () => {
    console.log("server is listnening PORT");
    
})