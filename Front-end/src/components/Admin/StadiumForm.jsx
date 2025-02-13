import { Form, FormBody, FormHeader, FormFooter } from "./Form";
import { useRef, useState } from "react";
import axios from "axios";
import { config } from "../../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from '@fortawesome/free-solid-svg-icons';
import '../../styles/Admin/StadiumsTab.css'

const StadiumForm = ({isOpen, handleClose, callbackFunction}) => {
    const [formLoading, setFormLoading] = useState(false);
    const stadiumNameInput = useRef();
    const numOfRowsInput = useRef();
    const numOfSeatInput = useRef();
    const stadiumImgInput = useRef();

    const addStadium = async () => {

        const handleAddStadium = async () => {
            
            const stadiumName = stadiumNameInput.current.value;
            const numOfRows = numOfRowsInput.current.value;
            const numOfSeat = numOfSeatInput.current.value;
            const stadiumImage = stadiumImgInput.current.files[0];

            const formData = new FormData();
            formData.append('stadiumName', stadiumName)
            formData.append('noRows', numOfRows)
            formData.append('noSeatsPerRow', numOfSeat)
            formData.append('stadiumImage', stadiumImage)

            try {
                const response = await axios.post(`${config.url}/stadium`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                
        
            } catch (err) {

            }
        }

        
        handleAddStadium();
        
    }

    const handleClick = async () => {
        setFormLoading(true);
        await addStadium();
        setFormLoading(false);
        handleClose()
        callbackFunction();
    }

    return(
        <Form isOpen={isOpen} handleClose={handleClose}>
            <FormHeader>
                Add Stadium
            </FormHeader>
            <FormBody>
                <label htmlFor="stad_name">Name</label>
                <input type="text" id='stad_name' ref={stadiumNameInput} required/>
                
                <label htmlFor="num_of_rows">Rows</label>
                <input type="number" id='num_of_rows' ref={numOfRowsInput} defaultValue={1} min={1} max={10} required/>
                <label htmlFor="num_of_seats_per_row">Seat Per Row</label>
                <input type='number' id='num_of_seats_per_row' ref={numOfSeatInput} defaultValue={1} min={1} max={10} required/>
            
                <div className="upload-img">
                    <div>
                        <label htmlFor="stadium_drag_image">
                            <FontAwesomeIcon icon={faImage}/>
                            <span>Upload or Drag Image</span>
                        </label>
                        <input type="file" id="stadium_drag_image" accept='image/*' ref={stadiumImgInput} hidden required/>
                    </div>
                </div>
            </FormBody>
            <FormFooter>
                <button onClick={() => handleClick()}>{(formLoading ? 'Wait...' : 'Add')}</button>
                <button onClick={() => handleClose()}>Cancel</button>
            </FormFooter>
        </Form>
    );
}


export default StadiumForm;