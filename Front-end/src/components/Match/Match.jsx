import '../../styles/match/match.css';
import refreeIcon from '../../images/whistle.png';
import flagIcon from '../../images/flag.png';
import Toolbar from '../Home/Toolbar';
import { Link, useLocation } from 'react-router-dom';
import FlagEngine from '../flagsEngine';
import ReserveMatchForm from './ReserveMatchForm';
import { useState } from 'react';

function Match(props) {
  const { match } = useLocation().state;
  const [isMatchFromOpen, setMatchFormOpen] = useState(false);

  const handleMatchFormOpen = () => {
    setMatchFormOpen(true);
  };

  const handleMatchFormClose = () => {
    setMatchFormOpen(false);
  };

  const callbackFunction = () => {
    // some code here
  };

  return (
    <div className="match_page">
      <Toolbar />
      <ReserveMatchForm
        isOpen={isMatchFromOpen}
        handleClose={handleMatchFormClose}
        callbackFunction={callbackFunction}
        params={match}
      />
      <div className="match_container">
        <div className="match-wrapper">
          <div className="match_container_header">
            <div className="match_stadium">
              <p>{match.stadiumName} Stadium</p>
              <p>{new Date(match.matchDay).toDateString()}</p>
            </div>
          </div>
          <div className="match_teams_flags">
            <div className="match-team">
              <div className="team-logo">
                <img src={new FlagEngine().getFlagSrcByName(match.firstTeam)} />
              </div>
              <div className="team-name">{match.firstTeam}</div>
            </div>

            <span>{String(match.matchTime).slice(0, 5)}</span>
            <div className="match-team">
              <div className="team-logo">
                <img
                  src={new FlagEngine().getFlagSrcByName(match.secondTeam)}
                />
              </div>
              <div className="team-name">{match.secondTeam}</div>
            </div>
          </div>
          <div className="match-details">
            <div className="match_lineman">
              <img src={flagIcon} alt="flagIcon" />
              <p>{match.linemanOne}</p>
            </div>
            <div className="match_refree">
              <img src={refreeIcon} alt="refreeIcon" />
              <p>{match.referee}</p>
            </div>
            <div className="match_lineman">
              <img src={flagIcon} alt="flagIcon" />
              <p>{match.linemanTwo}</p>
            </div>
          </div>
        </div>
        <div className="ticket-details-wrapper">
          <ul>
            <li>
              <p>Stadium</p>
              <p>{match.stadiumName}</p>
            </li>
            <li>
              <p>Lineman 1</p>
              <p>{match.linemanOne}</p>
            </li>
            <li>
              <p>Lineman 2</p>
              <p>{match.linemanTwo}</p>
            </li>
            <li>
              <p>Referee</p>
              <p>{match.referee}</p>
            </li>
            <li>
              <p>Time</p>
              <p>{String(match.matchTime).slice(0, 5)}</p>
            </li>
            <li>
              <p>Date</p>
              <p>{new Date(match.matchDay).toDateString()}</p>
            </li>
          </ul>
          <div className="reservation_container">
            <span>$ 250</span>
            <div className="reservation-button" onClick={handleMatchFormOpen}>
              Purchase Ticket
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Match;
