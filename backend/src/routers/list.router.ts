import {Router} from "express";
import {listController} from "../controllers/list.controller";

const router = Router()

// @ts-ignore
router.get('/', listController.getLists)


export const listRouter = router