import {
  Form as AbstractFrom,
  FormBody,
  FormFooter,
  FormHeader,
} from '../Admin/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/BuyTicket/buyTicket.css';
import seat_image from '../../images/seat.png';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { config } from '../../config';
import { io } from 'socket.io-client';

const ReserveMatchForm = ({
  isOpen,
  handleClose,
  callbackFunction,
  params,
}) => {
  // loading btn state
  const [loading, setLoading] = useState(false);
  // this state is used to toggle the accordion
  const [open, setOpen] = useState('0');
  // this state is used to toggle the empty seats
  const [emptySeats, setEmptySeats] = useState(false);
  // this state is used to toggle the success message
  const [success, setSuccess] = useState(false);
  // this array is used to store the invalid seats
  const [invalidSeats, setInvalidSeats] = useState([]);
  // this array is used to store the reserved seats for the current user only
  const reservedSeats = useRef({});
  // set the match id
  const id = params.matchID;
  // the number of rows and seats in the stadium
  const { noRows, noSeatsPerRow } = params;
  // socket connection to the server
  const [socketIo, setSocket] = useState(undefined);
  // this function is used to check if the seat is reserved or not
  const isValidSeat = (seatNo) => !invalidSeats.includes(seatNo);

  /**
   * This function is used to check if the seat is already reserved
   * @param {*} seatId
   * @returns
   */
  const isReservedSeat = (seatId) => {
    return reservedSeats.current[seatId] !== undefined;
  };

  // this function is used to insert the checked seats into reservedSeats array
  const insertSeats = (seatId) => {
    if (!isValidSeat(seatId)) return;
    if (!isReservedSeat(seatId)) {
      reservedSeats.current[seatId] = true;
    } else {
      delete reservedSeats.current[seatId];
    }
  };

  // this function is used to submit the reserved seats to the backend
  const submitReservedSeats = () => {
    if (Object.keys(reservedSeats.current).length === 0) {
      setEmptySeats(true);
      return false;
    }
    Object.keys(reservedSeats.current).forEach(async (seatId) => {
      const res = await axios.post(`${config.url}/reservation`, {
        userID: 1,
        matchID: id,
        seatNo: seatId,
      });
    });
  };

  const handleBuyBtnClick = () => {
    setLoading(true);
    submitReservedSeats();
    setLoading(false);
    callbackFunction();
  };

  /**  This function is used to send the temporary reserved seats
   * to the backend just to check it in case anyone tried to reserve
   * it at the same time using socket.io
   */
  const sendReservedSeat = (seatId) => {
    if (socketIo === undefined) return;
    // if the seat already exist within reserved seats
    if (!isValidSeat(seatId)) return;
    // if cancel is true then the seat is reserved and
    // neet to be cancelled
    socketIo.emit('reserve', {
      matchId: id,
      seatNo: seatId,
      cancel: isReservedSeat(seatId),
    });
  };

  useEffect(() => {
    const getReservedSeats = async () => {
      const reservedSeats = await axios.get(
        `${config.url}/reservedseats/${id}`
      );
      setInvalidSeats(reservedSeats.data.map((seat) => seat.seatno));
    };
    getReservedSeats();

    // connect to the socket server
    // and send the match id just
    // to attach this connection to it
    const socket = io(config.url, {
      query: {
        matchId: id,
      },
    });
    socket.on('reserve', (data) => {
      console.log(data);
      if (!data.cancel) {
        setInvalidSeats((invalidSeats) => [...invalidSeats, data.seatNo]);
      } else {
        setInvalidSeats(invalidSeats.filter((seat) => seat !== data.seatNo));
      }
    });
    setSocket(socket);

    return () => {
      socket.disconnect();
      setSocket(undefined);
    };
  }, []);

  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };
  return (
    <AbstractFrom isOpen={isOpen} handleClose={handleClose}>
      <FormHeader>Reserve Match</FormHeader>
      <FormBody>
        <div className="seats_container">
          <table>
            {new Array(noRows).fill(0).map((row, i) => {
              return (
                <tr key={i}>
                  {new Array(noSeatsPerRow).fill(0).map((col, j) => {
                    const seatNo = i * noSeatsPerRow + j + 1;
                    return (
                      <td key={seatNo}>
                        <input
                          type="checkbox"
                          name="seat"
                          id={seatNo}
                          className={
                            isValidSeat(seatNo) ? 'valid_seat' : 'invalid_seat'
                          }
                          onClick={() => {
                            sendReservedSeat(seatNo);
                            insertSeats(seatNo);
                          }}
                        />
                        <label for={seatNo}>
                          <img src={seat_image} alt="seat" />
                        </label>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </table>
        </div>

        <div className="paying_methods">
          <div className="card-number">
            <label htmlFor="cardNumber">Card Number</label>
            <input type="text" id="cardNumber" name="cardNumber" required />
          </div>
          <div className="pin-number">
            <label htmlFor="pin">pin</label>
            <input type="text" id="pin" name="pin" required />
          </div>
        </div>
      </FormBody>
      <FormFooter>
        <button onClick={handleBuyBtnClick}>
          {loading ? 'Waiting' : 'Buy'}
        </button>
        <button onClick={handleClose}>Cancel</button>
      </FormFooter>
    </AbstractFrom>
  );
};

export default ReserveMatchForm;
