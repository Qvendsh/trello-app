import {model, Schema} from "mongoose";
import {IList} from "../controllers/list.controller";

const listSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    id:{
        type: Number,
    }
})

export const List = model<IList>("list", listSchema)