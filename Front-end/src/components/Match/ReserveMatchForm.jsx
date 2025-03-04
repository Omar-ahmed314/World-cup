import {
  Form as AbstractFrom,
  FormBody,
  FormFooter,
  FormHeader,
} from '../Admin/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/BuyTicket/buyTicket.css';
import seat_image from '../../images/seat.png';
import Toolbar from '../Home/Toolbar';
import { Form, FormGroup, Label, Input, Button, Row, Col } from 'reactstrap';
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
} from 'reactstrap';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { config } from '../../config';

const ReserveMatchForm = ({
  isOpen,
  handleClose,
  callbackFunction,
  params,
}) => {
  // this state is used to toggle the accordion
  const [open, setOpen] = useState('0');
  // this state is used to toggle the empty seats
  const [emptySeats, setEmptySeats] = useState(false);
  // this state is used to toggle the success message
  const [success, setSuccess] = useState(false);
  // this array is used to store the invalid seats
  const [invalidSeats, setSeats] = useState([]);
  // this array is used to store the reserved seats for the current user only
  const reservedSeats = useRef({});
  // set the match id
  const id = params.matchId;
  // the number of rows and seats in the stadium
  const { noRows, noSeatsPerRow } = params;
  // this function is used to check if the seat is reserved or not
  const isValidSeat = (seatNo) => invalidSeats.includes(seatNo);
  // this function is used to insert the checked seats into reservedSeats array
  const insertSeats = (seatId) => {
    if (isValidSeat(seatId)) return;
    if (reservedSeats.current[seatId] === undefined) {
      const newReservedSeats = reservedSeats.current;
      newReservedSeats[seatId] = true;
      reservedSeats.current = newReservedSeats;
    } else {
      const newReservedSeats = reservedSeats.current;
      delete newReservedSeats[seatId];
      reservedSeats.current = newReservedSeats;
    }
  };
  // this function is used to submit the reserved seats to the backend
  const submitReservedSeats = (event) => {
    event.preventDefault();
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

  useEffect(() => {
    const getReservedSeats = async () => {
      const reservedSeats = await axios.get(
        `${config.url}/reservedseats/${id}`
      );
      setSeats(reservedSeats.data.map((seat) => seat.seatno));
    };
    getReservedSeats();
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
                    return (
                      <td key={i * noSeatsPerRow + j + 1}>
                        <input
                          type="checkbox"
                          name="seat"
                          id={i * noSeatsPerRow + j + 1}
                          className={
                            isValidSeat(i * noSeatsPerRow + j + 1)
                              ? 'invalid_seat'
                              : 'valid_seat'
                          }
                          onClick={() => {
                            insertSeats(i * noSeatsPerRow + j + 1);
                          }}
                        />
                        <label for={i * noSeatsPerRow + j + 1}>
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
          <Accordion open={open} toggle={toggle}>
            <AccordionItem>
              <AccordionHeader targetId="1">Credit Card</AccordionHeader>
              <AccordionBody accordionId="1">
                <Form onSubmit={submitReservedSeats}>
                  <Row>
                    <Col md={10}>
                      <FormGroup>
                        <Label for="cardNumber">Card Number</Label>
                        <Input id="cardNumber" name="cardNumber" required />
                      </FormGroup>
                    </Col>
                    <Col md={2}>
                      <FormGroup>
                        <Label for="pin">pin</Label>
                        <Input id="pin" name="pin" required />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Col
                    sm={{
                      offset: 5,
                      size: 10,
                    }}
                  >
                    <Button>Buy</Button>
                  </Col>
                </Form>
              </AccordionBody>
            </AccordionItem>
          </Accordion>
        </div>
      </FormBody>
      <FormFooter>
        <button>Buy</button>
        <button onClick={handleClose}>Cancel</button>
      </FormFooter>
    </AbstractFrom>
  );
};

export default ReserveMatchForm;
