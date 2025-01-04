import '../../styles/Admin/StadiumsTab.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faXmark, faUser, faImage } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import axios from 'axios'
import { config } from '../../config';
import Confirm from './Confirm';

const StadiumsTab = ({currentTab}) => {
    const [formOpen, setFormOpen] = useState(false);
    const [formLoading, setFormLoading] = useState(false);
    const [isConfirmOpen, setConfirmOpen] = useState(false);
    const [stadiumsList, setStadiumsList] = useState([]);
    const [currentCard, setCurrentCard] = useState(null);
    const stadiumFormRef = useRef();

    const stadiumNameInput = useRef();
    const numOfRowsInput = useRef();
    const numOfSeatInput = useRef();
    const stadiumImgInput = useRef();

    useEffect(() => {
        // close the popup window when clicked outside the frame
        window.addEventListener('click', (e) => {
            if(e.target === stadiumFormRef.current) {
                setFormOpen(false);
            }
        })
    }, [])

    useEffect(() => {
        refreshStadiumsList();
    }, [stadiumsList])

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

        setFormLoading(true);
        await handleAddStadium();
        setFormLoading(false);
        setFormOpen(false);
        refreshStadiumsList();
        
    }

    const refreshStadiumsList = async () => {
        try {
            const response = await axios.get(`${config.url}/stadium`)
            setStadiumsList(response?.data)

        } catch (err) {

        }
    }

    const deleteStadium = async (stadiumID) => {
        try {
                const response = await axios.delete(`${config.url}/stadium/${stadiumID}`)
                // remove the stadium from the stadium list
                refreshStadiumsList();
        } catch (error) {
            
        }
    }

    const closeConfirm = () => {
        setConfirmOpen(false);
    }

    const openConfirm = () => {
        setConfirmOpen(true);
    }

    return (
        <div className={(currentTab === 2 ? '' : 'hidden')}>
            <div className={`stad-form-con `.concat(formOpen ? '' : 'hidden')} ref={stadiumFormRef}>
                <div className="stad-form" >
                    <div className="inner-cont">
                        <div className="header">
                            <h2>Add Stadium</h2>
                            
                        </div>
                        <div className="body">
                            

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
                        </div>
                        <div className="footer">
                            <button onClick={() => addStadium()}>{(formLoading ? 'Wait...' : 'Add')}</button>
                            <button onClick={() => setFormOpen(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
            <Confirm isOpen={isConfirmOpen} params={currentCard} handleClose={closeConfirm} text='Are you sure you want to delete this stadium ?' confirmFunction={deleteStadium}/>
            <div className="match-control-panel">
                <h2>STADIUMS</h2>
                <button onClick={() => setFormOpen(true)}><span>+</span> ADD STADIUM</button>
            </div>
            <div className="stads-container">
            {
                stadiumsList?.map((value, idx) => {
                    return (<div className="stad-container" key={value.stadiumID}>
                        <div className  ="inner-container">
                            <div className="header">
                                <div className="header-std-slog">
                                    <p>FIFA World Cup 2022</p>
                                    <p>{value.stadiumName} Stadium</p>
                                </div>
                                <div className="header-btns">
                                    <div className="edit-btn" title="Edit">
                                        <FontAwesomeIcon icon={faEllipsisVertical}
                                        size="lg" />
                                    </div>
                                    <div className="cancel-btn" title="Remove" onClick={() => {
                                        setCurrentCard(value.stadiumID);
                                        openConfirm();
                                        }}>
                                        <FontAwesomeIcon icon={faXmark}
                                            size="lg" />
                                    </div>
                                </div>
                                
                            </div>
                            <div className="body">
            
                                    <img src={`${config.url}/${value.imageURL}`} alt='image'/>
                               
                            </div>
                            <div className="footer">
                                    <div className="stad-count">
                                    <FontAwesomeIcon icon={faUser}
                                        size="lg" />
                                        <span> x {value.noRows * value.noSeatsPerRow}</span>
                                    </div>
                                    
                                </div>
                        </div>
                    </div> )
                })
            }
            </div>
        </div>
    );
}

export default StadiumsTab;