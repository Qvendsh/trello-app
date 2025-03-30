import { Schema, model } from 'mongoose';

const cardSchema = new Schema({
    description: {
        type: String,
    }
})

export const Card = model('Card')