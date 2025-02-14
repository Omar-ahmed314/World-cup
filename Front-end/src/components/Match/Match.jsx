import '../../styles/match/match.css'
import refreeIcon from '../../images/whistle.png';
import flagIcon from '../../images/flag.png';
import Toolbar from '../Home/Toolbar';
import { Link, useLocation } from 'react-router-dom';
import FlagEngine from '../flagsEngine';

function Match(props) {
  const {match} = useLocation().state;

  return (
      <div className="match_page">
      <Toolbar/>
        <div className="match_container">
          <div className="match_container_header">
            <div className="match_stadium">
              {match.stadiumName} Stadium
            </div>
            <div className="match_time">
              {new Date(match.matchDay).toDateString()} {match.matchTime}
            </div>
          </div>
          <div className="match_teams">
            <div className="match_team">
              {match.firstTeam}
            </div>
            <div className="team_logo">
              <img src={new FlagEngine().getFlagSrcByName(match.firstTeam)}/>
            </div>
            <span>v</span>
            <div className="team_logo">
              <img src={new FlagEngine().getFlagSrcByName(match.secondTeam)}/>
            </div>
            <div className="match_team">
              {match.secondTeam}
            </div>
          </div>
          <div className="match_refree">
            <img src={refreeIcon} alt="refreeIcon"/>
            <p>{match.referee}</p>
          </div>
          <div className="match_linesmen">
            <div className="match_lineman">
              <img src={flagIcon} alt="flagIcon"/>
              <p>{match.linemanOne}</p>
            </div>
            <div className="match_lineman">
              <img src={flagIcon} alt="flagIcon"/>
              <p>{match.linemanTwo}</p>
            </div>
          </div>
          <div className='reservation_container'>
            <Link to={`/buy_ticket/${match.matchID}`} state={{noRows: match.noRows, noSeats: match.noSeatsPerRow}}>buy ticket</Link>
          </div>
        </div>
      </div>
  );
}

export default Match;
