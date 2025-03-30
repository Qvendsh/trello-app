import {List} from "../models/list.model";
import {IList} from "../controllers/list.controller";

class ListService {
    public async findAll(): Promise<IList[]> {
        return List.find()
    }
}

export const listService = new ListService()