import miscQueries from '../services/services';
import { Response, Request, Application } from 'express';
import { tokenVerfication } from './middleware/userHandlerMid';

const miscQueriesModel = new miscQueries();

// endpoints
const unauthorizedUsers = async (req : Request, res: Response) => {
   try {
       const data = await miscQueriesModel.getAllUnauthorizedUsers();
       res.status(200);
       res.json(data);
   } catch (error) {
    res.status(404);
    res.send(error);
   }
}

const servicesRoutes = (app: Application) => {
    app.get('/all_unauthorized_users', [tokenVerfication], unauthorizedUsers);
}

export default servicesRoutes;