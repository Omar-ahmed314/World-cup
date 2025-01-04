import Stadium, {stadium} from "../models/stadium";
import { Response, Request, Application } from 'express';
import { tokenVerfication } from "./middleware/userHandlerMid";
import upload from "./middleware/multer";
import dotenv from 'dotenv'
import fs from 'fs'
import path from "path";

dotenv.config();

const stadiumModel = new Stadium();

// endpoints
const index = async (req : Request, res: Response) => {
   try {
       const data = await stadiumModel.index();
       res.status(200);
       res.json(data);
   } catch (error) {
    res.status(500);
    res.send(error);
   }
}

const show = async (req : Request, res: Response) => {
    try {
        const data = await stadiumModel.show(req.params.id as unknown as number);
        res.status(200);
        res.json(data);
    } catch (error) {
     res.status(400);
     res.send(error);
    }
 }

const create = async (req: Request, res: Response) => {
    try {
        const stadiumData: stadium = {
            stadiumName:req.body.stadiumName,
            noRows:req.body.noRows,
            noSeatsPerRow:req.body.noSeatsPerRow,
            imageURL: `stadiums/${req.file?.filename}`
        };

        const data = await stadiumModel.create(stadiumData);
        res.status(201);
        res.json({
            msg: 'Created Successfully'
        });
        
    } catch (error) {
        console.log(error);
        res.status(400);
        res.send(error);
    }
}

const edit = async (req: Request, res: Response) => {
    try {
        const stadiumData: stadium = {
            stadiumID:req.body.stadiumID,
            stadiumName:req.body.stadiumName,
            noRows:req.body.noRows,
            noSeatsPerRow:req.body.noSeatPerRow,
            imageURL: req.body.stadiumImage
        };
        const data = await stadiumModel.edit(stadiumData);
        res.status(201);
        res.json(data);
    } catch (error) {
        res.status(400);
        res.send(error);
    }
}

const _delete = async (req: Request, res: Response) => {
    try {
        const data = await stadiumModel.delete(req.params.id as unknown as number);
        fs.unlinkSync(path.join(__dirname, '../../', process.env.STATIC_FILES_LOCATION as string, data.imageURL))
        res.status(200);
        res.json(data);
    } catch (error) {
        res.status(400);
        res.send(error);
    }
}

const stadiumRoutes = (app: Application) => {
    app.get('/stadium', index);
    app.get('/stadium/:id', show);
    app.post('/stadium', [upload.single('stadiumImage')],create);
    app.put('/stadium', [tokenVerfication], edit);
    app.delete('/stadium/:id', _delete);
}

export default stadiumRoutes;