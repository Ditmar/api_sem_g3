import { Router } from "express";import { loginController } from "../controller/login";
import { registerController } from "../controller/register";
;

const router = Router()

router.post('/',loginController)
router.post('/',registerController)
export{router}