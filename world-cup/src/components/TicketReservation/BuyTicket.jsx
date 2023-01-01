import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/BuyTicket/buyTicket.css';
import seat_image from '../../images/seat.png';
import Toolbar from '../Home/Toolbar';
import { Form, FormGroup, Label, Input, Button, Row, Col } from 'reactstrap';
import { Accordion, AccordionItem, AccordionHeader, AccordionBody } from 'reactstrap';
import { useState, useEffect, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { config } from '../../config';

function BuyTicket(props) {
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
    // the id of the current match
    const {id} = useParams();
    // the number of rows and seats in the stadium
    const {noRows, noSeats} = useLocation().state;
    // this function is used to check if the seat is reserved or not
    const isValidSeat = seatNo => invalidSeats.includes(seatNo)
    // this function is used to insert the checked seats into reservedSeats array
    const insertSeats = seatId => {
        if(isValidSeat(seatId)) return;
        if (reservedSeats.current[seatId] === undefined) {
            const newReservedSeats = reservedSeats.current;
            newReservedSeats[seatId] = true;
            reservedSeats.current = newReservedSeats
        } else {
            const newReservedSeats = reservedSeats.current;
            delete newReservedSeats[seatId];
            reservedSeats.current = newReservedSeats;
        }
    }
    // this function is used to submit the reserved seats to the backend
    const submitReservedSeats = event => {
        event.preventDefault();
        if(Object.keys(reservedSeats.current).length === 0) {
            setEmptySeats(true);
            return false;
        }
        Object.keys(reservedSeats.current).forEach(async (seatId) => {
            const res = await axios.post(`${config.url}/reservation`, 
            {
                userID: 1,
                matchID: id,
                seatNo: seatId
            });
        })
    }

    useEffect(() => {
        const getReservedSeats = async () => {
            const reservedSeats = await axios.get(`${config.url}/reservedseats/${id}`);
            setSeats(reservedSeats.data.map(seat => seat.seatno));
        }
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
    <div className='buy_ticket_page'>
      <Toolbar/>
      <div className='buy_ticket_body'>
        <div className='stadium_seats'>
            <div className="seats_container">
                <table>
                    {
                    new Array(noRows).fill(0).map((row, i) => {
                        return (
                            <tr key={i}>
                                {
                                    new Array(noSeats).fill(0).map((col, j) => {
                                        return (
                                            <td key={i * noRows + j + 1}>
                                                <input type='checkbox' 
                                                name='seat' 
                                                id={i * noRows + j + 1} 
                                                className={isValidSeat(i * noRows + j + 1) ? 'invalid_seat' : 'valid_seat'} 
                                                onClick={() => insertSeats(i * noRows + j + 1)}/>
                                                <label for={i * noRows + j + 1}><img src={seat_image} alt="seat"/></label>
                                            </td>
                                        )
                                    })
                                }
                            </tr>
                        )
                    })
                    }
                </table>
            </div>
        </div>
        <div className='paying_methods'>
            <Accordion open={open} toggle={toggle}>
                <AccordionItem>
                    <AccordionHeader targetId="1">Credit Card</AccordionHeader>
                    <AccordionBody accordionId="1">
                        <Form onSubmit={submitReservedSeats}>
                        <Row>
                            <Col md={10}>
                            <FormGroup>
                                <Label for="cardNumber">
                                Card Number
                                </Label>
                                <Input
                                id="cardNumber"
                                name="cardNumber"
                                required
                                />
                            </FormGroup>
                            </Col>
                            <Col md={2}>
                            <FormGroup>
                                <Label for="pin">
                                pin
                                </Label>
                                <Input
                                id="pin"
                                name="pin"
                                required
                                />
                            </FormGroup>
                            </Col>
                        </Row>
                        <Col
                            sm={{
                                offset: 5,
                                size: 10
                            }}
                            >
                            <Button>
                                Buy
                            </Button>
                            </Col>
                        </Form>
                    </AccordionBody>
                </AccordionItem>
            </Accordion>
        </div>
      </div>
    </div>
  );
}

export default BuyTicket;
