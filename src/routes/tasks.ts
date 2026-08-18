import {Router} from "express"
import {createTask, getTasks, updateTask, deleteTask} from "../controllers/taskController"
import { requireAuth} from "../middleware/auth"

const router = Router()

router.get("/", getTasks)
router.post("/", requireAuth, createTask)
router.put("/:id", requireAuth, updateTask)
router.delete("/:id", requireAuth, deleteTask)

export default router