import { Schema, model } from 'mongoose';
import {ICard} from "../controllers/card.controller";

const cardSchema = new Schema({
    description: {
        type: String,
        required: true,
    },
    listId:{
        type: String,
        required: true,
    }
})

export const Card = model<ICard>('card', cardSchema);
