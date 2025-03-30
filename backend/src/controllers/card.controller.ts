import { Request, Response } from 'express';
import {cardService} from "../services/card.service";

export interface ICard {
    description: string,
    listId: string,
    id: string,
}

class CardController {
    public async getCards(req: Request, res: Response): Promise<Response<ICard[]>> {
        const { listId } = req.params
        try{
            const cards = await cardService.findCardsByListId(listId)
            return res.status(200).json(cards);
        }catch(err){
            return res.status(500).json(err)
        }
    }

    public async createCard(req: Request, res: Response): Promise<Response<ICard>> {
        const {listId} = req.params
        const {description} = req.body;
        try{
            const newCard = await cardService.createCard({description, listId, id: ""})
            return res.status(200).json(newCard);
        }catch(err){
            return res.status(500).json(err)
        }
    }

    public async deleteCard(req: Request, res: Response): Promise<Response<ICard>> {
        const {id} = req.params
        try{
            const result = await cardService.deleteCard(id)
            if(!result){
                return res.status(404).json({message:"No card was found."})
            }
            return res.status(200).json({message: "Successfully deleted"});
        }catch(err){
            return res.status(500).json(err)
        }
    }

    public async moveCard(req: Request, res: Response): Promise<Response<ICard>> {
        const { id } = req.params;
        const { targetListId } = req.body;

        try {
            const updatedCard = await cardService.moveCard(id, targetListId);
            if (!updatedCard) {
                return res.status(404).json({ message: "Card not found" });
            }
            return res.status(200).json(updatedCard);
        } catch (err) {
            return res.status(500).json({ message: "Error moving card", error: err });
        }
    }
}

export const cardController = new CardController();