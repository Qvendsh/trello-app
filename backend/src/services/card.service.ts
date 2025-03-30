import {ICard} from "../controllers/card.controller";
import {Card} from "../models/card.model";

class CardService {
    public async findCardsByListId(listId:string):Promise<ICard[]> {
        try{
            const cards = await Card.find({listId})
            return cards.map(card => ({
                id: card._id.toString(),
                listId: card.listId.toString(),
                description: card.description,
            }))
        }catch(err){
            throw new Error ("error");
        }
    }

    public async createCard(cardData: ICard): Promise<ICard> {
        try{
            const newCard = new Card(cardData);
            const savedCard =  await newCard.save();
            return{
                id:savedCard._id.toString(),
                listId: savedCard.listId.toString(),
                description: savedCard.description
            }
        }catch(err){
            throw new Error ("error while creating card");
        }
    }

    public async deleteCard(id:string):Promise<boolean> {
        try{
            const result = await Card.deleteOne({_id: id});
            return true
        }catch(err){
            throw new Error ("error while deleting card");
        }
    }

    public async moveCard(id: string, targetListId: string): Promise<ICard | null> {
        try {
            const updatedCard = await Card.findByIdAndUpdate(
                id,
                { listId: targetListId },
                { new: true }
            );

            if (!updatedCard) return null;

            return {
                id: updatedCard._id.toString(),
                listId: updatedCard.listId.toString(),
                description: updatedCard.description,
            };
        } catch (err) {
            throw new Error("Error while moving card");
        }
    }
}

export const cardService = new CardService()