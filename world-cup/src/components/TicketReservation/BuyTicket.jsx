import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/BuyTicket/buyTicket.css';
import seat_image from '../../images/seat.png';
import Toolbar from '../Home/Toolbar';
import { Form, FormGroup, Label, Input, Button, Row, Col } from 'reactstrap';
import { Accordion, AccordionItem, AccordionHeader, AccordionBody } from 'reactstrap';
import { useState, useEffect } from 'react';

function BuyTicket() {
    const [open, setOpen] = useState('0');
    const [seats, setSeats] = useState([]);
    const numOfRows = 5;
    const seatsPerRow = 5;

    useEffect(() => {
        let seats_array = new Array(numOfRows).fill(0);
        seats_array = seats_array.map((row, i) => {
            return (
                <tr key={i}>
                    {
                        new Array(seatsPerRow).fill(0).map((seat, j) => {
                            return (
                                <td key={{row: i, col: j}}>
                                    <input type='checkbox' name='seat' id={`${i},${j}`}/>
                                    <label for={`${i},${j}`}><img src={seat_image} alt="seat"/></label>
                                </td>
                            )
                        })
                    }
                </tr>
            )
        }); 
        setSeats(seats_array);
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
                    {seats}
                </table>
            </div>
        </div>
        <div className='paying_methods'>
            <Accordion open={open} toggle={toggle}>
                <AccordionItem>
                    <AccordionHeader targetId="1">Credit Card</AccordionHeader>
                    <AccordionBody accordionId="1">
                        <Form>
                        <Row>
                            <Col md={10}>
                            <FormGroup>
                                <Label for="cardNumber">
                                Card Number
                                </Label>
                                <Input
                                id="cardNumber"
                                name="cardNumber"
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
                                />
                            </FormGroup>
                            </Col>
                        </Row>
                        <Button>
                            buy
                        </Button>
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
