import express from "express"

import { errorHandler } from './middleware/errorHandler';

import usersRouter from "./routes/users"
import tasksRouter from "./routes/tasks"
import projectsRouter from "./routes/projects"
import authRouter from "./routes/auth"

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.use("/users", usersRouter)
app.use("/tasks", tasksRouter)
app.use("/projects", projectsRouter)
app.use("/auth", authRouter)

app.use(errorHandler);

app.listen(PORT, () => {
    console.log("server is listening on PORT");
    
})