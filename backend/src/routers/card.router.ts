import {Router} from "express";
import {cardController} from "../controllers/card.controller";

const router = Router()

// @ts-ignore
router.get('/:listId', cardController.getCards)
// @ts-ignore
router.post('/:listId', cardController.createCard)
// @ts-ignore
router.delete('/:id', cardController.deleteCard)
// @ts-ignore
router.put("/:id/move", cardController.moveCard)

export const cardRouter = router