import { Response, Request, NextFunction } from 'express';
import miscQueries from '../../services/services';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
dotenv.config();

const userEncryption = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body.pass);
    const hashedPassword = bcrypt.hashSync(
        req.body.pass + process.env.SECRET_KEY,
        parseInt(process.env.SALT_ROUNDS as unknown as string)
    );
    req.body.pass = hashedPassword;
    next();
}

const userValidation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const miscQueriesModel = new miscQueries();
        const data = await miscQueriesModel.getUserByName(req.body.userName);
        if(data != undefined) {
            res.status(404);
            res.json({
                msg: "The user already exist"
            });
        } 
        next();
    } catch (error) {
        res.status(500);
        res.send(error);
    }
}

const tokenVerfication = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if(authorizationHeader == undefined)
        throw new Error('authorization token not found');
        const token = authorizationHeader.split(' ')[1];
        const valid = jwt.verify(token, process.env.JSON_SECRET_KEY as unknown as string);
        next();
    } catch(error) {
        res.status(401);
        res.json({
            msg: 'access token not valid'
        });
    }
}

export {
    userEncryption,
    userValidation,
    tokenVerfication
};