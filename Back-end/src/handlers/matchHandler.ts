import Match, {match} from "../models/match";
import { Response, Request, Application } from 'express';
import { tokenVerfication } from "./middleware/userHandlerMid";

const matchModel = new Match();

// endpoints
const index = async (req : Request, res: Response) => {
   try {
       const data = await matchModel.index();
       res.status(200);
       res.json(data);
   } catch (error) {
    res.status(500);
    res.send(error);
   }
}

const show = async (req : Request, res: Response) => {
    try {
        const data = await matchModel.show(req.params.id as unknown as number);
        res.status(200);
        res.json(data);
    } catch (error) {
     res.status(400);
     res.send(error);
    }
 }

const create = async (req: Request, res: Response) => {
    try {
        const matchData: match = {
            firstTeam: req.body.firstTeam,
            secondTeam: req.body.secondTeam,
            stadiumID: req.body.stadiumID,
            matchDay: req.body.matchDay,
            matchTime: req.body.matchTime,
            referee: req.body.referee,
            linemanOne: req.body.linemanOne,
            linemanTwo: req.body.linemanTwo,
        };
        const data = await matchModel.create(matchData);
        res.status(201);
        res.json(data);
    } catch (error) {
        res.status(400);
        res.send(error);
    }
}

const edit = async (req: Request, res: Response) => {
    try {
        const matchData: match = {
            matchID: req.body.matchID,
            firstTeam: req.body.firstTeam,
            secondTeam: req.body.secondTeam,
            stadiumID: req.body.stadiumID,
            matchDay: req.body.matchDay,
            matchTime: req.body.matchTime,
            referee: req.body.referee,
            linemanOne: req.body.linemanOne,
            linemanTwo: req.body.linemanTwo,
        };
        const data = await matchModel.edit(matchData);
        res.status(201);
        res.json(data);
    } catch (error) {
        res.status(400);
        res.send(error);
    }
}

const _delete = async (req: Request, res: Response) => {
    try {
        const data = await matchModel.delete(req.params.id as unknown as number);
        res.status(200);
        res.json(data);
    } catch (error) {
        res.status(400);
        res.send(error);
    }
}

const matchRoutes = (app: Application) => {
    app.get('/match', index);
    app.get('/match/:id', show);
    app.post('/match', /*[tokenVerfication],*/ create);
    app.put('/match', [tokenVerfication], edit);
    app.delete('/match/:id', [tokenVerfication], _delete);
}

export default matchRoutes;