import { Server, Socket } from 'socket.io';

// structure to save the connections related to
// each match ID
// number: the matchID
// server: the connection
const connectionsArray: Map<number, Socket[]> = new Map();

/**
 * Insert the new connection into the connection array
 *
 */
const insertConnection = (connection: Socket) => {
  const matchId = Number(connection.handshake.query?.matchId);
  if (connectionsArray.get(matchId) == undefined) {
    connectionsArray.set(matchId, [connection]);
  } else {
    const clientsArray = connectionsArray.get(matchId) || [];
    connectionsArray.set(matchId, [...clientsArray, connection]);
  }
};

/**
 * Remove Client [connection] from connections array
 */
const removeConnection = (connection: Socket) => {
  const matchId = Number(connection.handshake.query?.matchId);
  const clientsArray = connectionsArray.get(matchId) || [];
  const filteredArray = clientsArray.filter(
    (value) => value.id != connection.id
  );
  connectionsArray.set(matchId, filteredArray);
};

/**
 * Initialize Connection
 */
const initConnection = (connection: Socket) => {
  type Data = { matchId: number; seatNo: number; cancel: boolean };

  // on reserve seat
  connection.on('reserve', (data: Data) => {
    const matchConnections = connectionsArray.get(data.matchId);
    matchConnections?.forEach((client, idx) => {
      // TODO: check the userId who sent the the message event
      // and broadcast the message to others
      if (connection.id != client.id) {
        client.emit('reserve', data);
      }
    });
  });

  // on disconnection
  connection.on('disconnect', () => {
    console.log(`UserID: ${connection.id} has disconnected`);
    removeConnection(connection);
  });
};

const realTimeSocketHandler = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log(`UserID: ${socket.id} has Connected`);
    initConnection(socket);
    insertConnection(socket);
  });
};

export default realTimeSocketHandler;
