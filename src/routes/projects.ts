import {Router} from "express"
import { createProject, getProjects } from "../controllers/projectsController";
import { requireAuth } from '../middleware/auth';

const router = Router()

router.get("/", getProjects)
router.post("/", requireAuth, createProject)

export default router