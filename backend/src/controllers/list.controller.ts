import { Request, Response} from "express";
import {listService} from "../services/list.service";

export interface IList {
    name: string
    id: number
}


class ListController {
    public async getLists(req: Request, res: Response):Promise<Response<IList[]>> {
        try{
            const users = await listService.findAll()

            return res.status(200).json(users)
        }catch(err){
            return res.status(500).json(err)
        }
    }
}

export const listController = new ListController()