import {Router} from 'express'
import { loginUser, signUser } from '../controllers/authController';

const router = Router()

router.post("/login", loginUser)
router.post("/sign", signUser)

export default router