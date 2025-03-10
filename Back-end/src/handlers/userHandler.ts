import User, { user } from '../models/user';
import {
  adminAuthorization,
  tokenVerfication,
  userEncryption,
  userValidation,
} from './middleware/userHandlerMid';
import { Response, Request, Application } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
dotenv.config();

const userModel = new User();

// endpoints
const index = async (req: Request, res: Response) => {
  try {
    const data = await userModel.index();
    res.status(200);
    res.json(data);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const data = await userModel.show(req.params.id as unknown as number);
    res.status(200);
    res.json(data);
  } catch (error) {
    res.status(400);
    res.send(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const userData: user = {
      userName: req.body.userName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      gender: req.body.gender,
      nationality: req.body.nationality,
      birthDate: req.body.birthDate,
      pass: req.body.pass,
      email: req.body.email,
      userRole: req.body.userRole,
      roleApproved: false,
    };
    console.log(userData);
    const data = await userModel.create(userData);

    res.status(201).send('Successfully created new user');
  } catch (error) {
    res.status(400).send(error);
  }
};

const edit = async (req: Request, res: Response) => {
  try {
    const userData: user = {
      userName: req.body.userName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      gender: req.body.gender,
      nationality: req.body.nationality,
      birthDate: req.body.birthDate,
      pass: req.body.pass,
      email: req.body.email,
      userRole: req.body.userRole,
      roleApproved: false,
    };
    const data = await userModel.edit(userData);
    res.status(201);
    res.json(data);
  } catch (error) {
    res.status(400);
    res.send(error);
  }
};

const userApprove = async (req: Request, res: Response) => {
  try {
    const userID = req.body['userID'];
    const data = await userModel.userRoleApprove(userID);
    res.status(201);
    res.json(data);
  } catch (error) {
    res.status(400);
    res.send(error);
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const data = await userModel.login(req.body.userName);

    // if user not exist
    if (!data) throw 'Incorrect Input';

    // check if password is correct
    const isCorrect = bcrypt.compareSync(
      req.body.pass + process.env.SECRET_KEY,
      data?.pass
    );

    if (!isCorrect) throw 'Incorrect Input';

    // if user is still nolonger approved
    if (!data.roleApproved) throw 'Pending Approval';

    const accessToken = jwt.sign(
      {
        userID: data.userID,
        userName: data.userName,
        role: data.userRole,
        roleApproved: data.roleApproved,
      },
      process.env.JSON_SECRET_KEY as unknown as string,
      {
        expiresIn: '1h',
      }
    );

    const refreshToken = jwt.sign(
      {
        userID: data.userID,
        userName: data.userName,
      },
      process.env.JSON_SECRET_KEY as unknown as string
    );

    res.cookie('worldcup-jwt', refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // for 7 days
    });

    res.status(200);
    res.json({
      accessToken,
      msg: 'Successfully login',
    });
  } catch (error) {
    switch (error) {
      case 'Incorrect Input':
        res.status(401).json({
          msg: 'Incorrect username or password',
        });
        break;
      case 'Pending Approval':
        res.status(202).json({
          status: 'pending',
          message: 'Pending Approval from admin',
        });
        break;
      default:
        res.status(400).json({
          msg: 'Bad request',
        });
    }
  }
};

const logout = async (req: Request, res: Response) => {
  if (!req.cookies['worldcup-jwt']) return res.sendStatus(204);
  res.clearCookie('worldcup-jwt');
  res.sendStatus(204);
};

const _delete = async (req: Request, res: Response) => {
  try {
    const data = await userModel.delete(req.params.id as unknown as number);
    res.status(200);
    res.json(data);
  } catch (error) {
    res.status(400);
    res.send(error);
  }
};

const refresh = (req: Request, res: Response) => {
  const refreshToken: string = req.cookies['worldcup-jwt'];
  const accessTokenPayload = jwt.decode(refreshToken as string);

  try {
    const verify = jwt.verify(
      refreshToken,
      process.env.JSON_SECRET_KEY as unknown as string
    );
    const newAccessToken = jwt.sign(
      accessTokenPayload as string,
      process.env.JSON_SECRET_KEY as unknown as string,
      {
        expiresIn: '1h',
      }
    );

    res.status(200).json({
      accessToken: newAccessToken,
      msg: 'Successfully new access token generated',
    });
  } catch (err) {
    res.status(401).json({
      msg: 'Unauthorized token',
    });
  }
};

const userRoutes = (app: Application) => {
  app.get('/user', [tokenVerfication, adminAuthorization], index);
  app.get('/user/:id', [tokenVerfication, adminAuthorization], show);
  app.post('/user', [userEncryption], create);
  app.post('/login', login);
  app.put('/user', [tokenVerfication, adminAuthorization], edit);
  app.put('/user-approve', [tokenVerfication, adminAuthorization], userApprove);
  app.delete('/user/:id', [tokenVerfication, adminAuthorization], _delete);
  app.post('/user/refresh', refresh);
  app.post('/user/logout', logout);
};

export default userRoutes;
