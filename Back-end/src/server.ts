import express, { Response, Request, Application, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRoutes from './handlers/userHandler';
import servicesRoutes from './handlers/servicesHandler';
import matchRoutes from './handlers/matchHandler';
import reservationRoutes from './handlers/reservationHandler';
import stadiumRoutes from './handlers/stadiumHandler';
import realTimeSocketHandler from './handlers/realTimeSocketHandler';
import path from 'path';
import { createServer } from 'http';
import { Server as SocketIoServer } from 'socket.io';

const app: Application = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 3000;

const io = new SocketIoServer(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

// enable the client side to safely use the server resources
const corsOptions = {
  origin: ['http://localhost:3000'],
  credentials: true,
};

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, '../uploads')));

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('<h1> Hello from the store front project</h1>');
});

// server routes
realTimeSocketHandler(io);
userRoutes(app);
servicesRoutes(app);
reservationRoutes(app);
matchRoutes(app);
stadiumRoutes(app);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(404);
  res.json({
    // msg: "Page not found"
    msg: err.message,
  });
});

httpServer.listen(PORT, () => {
  console.log(`Successfully connected to the port ${PORT}`);
});

export default app;
