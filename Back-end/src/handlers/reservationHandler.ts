import Reservation, {reservation} from "../models/reservation"
import { Response, Request, Application } from 'express';
import { tokenVerfication } from "./middleware/userHandlerMid";

const reservationModel = new Reservation();

// endpoints
const index = async (req : Request, res: Response) => {
   try {
       const data = await reservationModel.index();
       res.status(200);
       res.json(data);
   } catch (error) {
    res.status(500);
    res.send(error);
   }
}

const show = async (req : Request, res: Response) => {
    try {
        const data = await reservationModel.show(req.params.id as unknown as number);
        res.status(200);
        res.json(data);
    } catch (error) {
     res.status(400);
     res.send(error);
    }
 }

const create = async (req: Request, res: Response) => {
    try {
        const reservationData: reservation = {
            matchID: req.body.matchID, 
            userID: req.body.userID,
            seatNo: req.body.seatNo,
            };
        const data = await reservationModel.create(reservationData);
        res.status(201);
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(400);
        res.send(error);
    }
}

const edit = async (req: Request, res: Response) => {
    try {
        const reservationData: reservation = {
            reservationID: req.body.reservationID,
            matchID: req.body.matchID, 
            userID: req.body.userID,
            seatNo: req.body.seatNo,
        };
        const data = await reservationModel.edit(reservationData);
        res.status(201);
        res.json(data);
    } catch (error) {
        res.status(400);
        res.send(error);
    }
}

const _delete = async (req: Request, res: Response) => {
    try {
        const data = await reservationModel.delete(req.params.id as unknown as number);
        res.status(200);
        res.json(data);
    } catch (error) {
        res.status(400);
        res.send(error);
    }
}

const reservedseats = async (req: Request, res: Response) => {
    try {
        const data = await reservationModel.getReserved(req.params.matchID as unknown as number);
        res.status(200);
        res.json(data);
    } catch (error) {
        res.status(400);
        res.send(error);
    }
}

const reservedUserMatches = async (req: Request, res: Response) => {
    try {
        const data = await reservationModel.getUserReservedMatches(req.params.userID as unknown as number);
        res.status(200);
        res.json(data);
    } catch (error) {
        res.status(400);
        res.send(error);
    }
}

const reservationRoutes = (app: Application) => {
    app.get('/reservation', index);
    app.get('/reservation/:id', show);
    app.get('/reservedmatches/:userID', reservedUserMatches);
    app.get('/reservedseats/:matchID', reservedseats);
    app.post('/reservation', /*[tokenVerfication]*/ create);
    app.put('/reservation', [tokenVerfication], edit);
    app.delete('/reservation/:id', /*[tokenVerfication],*/ _delete);
}

export default reservationRoutes;