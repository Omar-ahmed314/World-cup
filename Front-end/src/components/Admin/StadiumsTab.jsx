import '../../styles/Admin/StadiumsTab.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsisVertical,
  faXmark,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { config } from '../../config';
import Confirm from './Confirm';
import StadiumForm from './StadiumForm';
import Stadium from '../../Api/stadium/StadiumController';

const StadiumsTab = ({ currentTab }) => {
  const [formOpen, setFormOpen] = useState(false);
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const [stadiumsList, setStadiumsList] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const stadiumAPI = Stadium();

  useEffect(() => {
    refreshStadiumsList();
  }, [stadiumsList]);

  const refreshStadiumsList = async () => {
    try {
      const stadiumsData = await stadiumAPI.getStadiums();
      setStadiumsList(stadiumsData);
    } catch (err) {}
  };

  const deleteStadium = async (stadiumID) => {
    try {
      const response = await stadiumAPI.deleteStadium(stadiumID);
      // remove the stadium from the stadium list
      refreshStadiumsList();
    } catch (error) {}
  };

  const closeConfirm = () => {
    setConfirmOpen(false);
  };

  const openConfirm = () => {
    setConfirmOpen(true);
  };

  return (
    <div className={currentTab === 2 ? '' : 'hidden'}>
      <StadiumForm
        isOpen={formOpen}
        handleClose={() => setFormOpen(false)}
        callbackFunction={refreshStadiumsList}
      />
      <Confirm
        isOpen={isConfirmOpen}
        params={currentCard}
        handleClose={closeConfirm}
        text="Are you sure you want to delete this stadium ?"
        confirmFunction={deleteStadium}
      />
      <div className="match-control-panel">
        <h2>STADIUMS</h2>
        <button onClick={() => setFormOpen(true)}>
          <span>+</span> ADD STADIUM
        </button>
      </div>
      <div className="stads-container">
        {stadiumsList?.map((value, idx) => {
          return (
            <div className="stad-container" key={value.stadiumID}>
              <div className="inner-container">
                <div className="header">
                  <div className="header-std-slog">
                    <p>FIFA World Cup 2022</p>
                    <p>{value.stadiumName} Stadium</p>
                  </div>
                  <div className="header-btns">
                    <div className="edit-btn" title="Edit">
                      <FontAwesomeIcon icon={faEllipsisVertical} size="lg" />
                    </div>
                    <div
                      className="cancel-btn"
                      title="Remove"
                      onClick={() => {
                        setCurrentCard(value.stadiumID);
                        openConfirm();
                      }}
                    >
                      <FontAwesomeIcon icon={faXmark} size="lg" />
                    </div>
                  </div>
                </div>
                <div className="body">
                  <img src={`${config.url}/${value.imageURL}`} alt="image" />
                </div>
                <div className="footer">
                  <div className="stad-count">
                    <FontAwesomeIcon icon={faUser} size="lg" />
                    <span> x {value.noRows * value.noSeatsPerRow}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StadiumsTab;
