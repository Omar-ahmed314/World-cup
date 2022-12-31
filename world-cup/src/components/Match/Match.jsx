import '../../styles/match/match.css'
import egypt from '../../images/egypt.png';
import brazil from '../../images/brazil.png';
import refreeIcon from '../../images/whistle.png';
import flagIcon from '../../images/flag.png';
import Toolbar from '../Home/Toolbar';
import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

const initialMatch = {
  firstTeam: '',
  secondTeam: '',
  date: '',
  time: '',
  stadium: '',
  mainRefree: '',
  linesmen: []
}

function Match() {
  const [match, setMatch] = useState(initialMatch);
  useEffect(() => {
    // TODO: get match data from backend
    // axios.get('http://localhost:5000/match')
    // .then(res => console.log('hi'))
    // .catch(err => console.log(err))
    setMatch({firstTeam: 'Egypt', secondTeam: 'Brazil',
    date: '2021-06-01', time: '20:00', stadium: 'Lusail Stadium',
    mainRefree: 'Mohamed Ali', linesmen: ['Ahmed Ali', 'Mohamed Ali']})
  }, []);

  return (
    <div className="match_page">
      <Toolbar/>
      <div className="match_container">
        <div className="match_container_header">
          <div className="match_stadium">
            {match.stadium}
          </div>
          <div className="match_time">
            {match.date} {match.time}
          </div>
        </div>
        <div className="match_teams">
          <div className="match_team">
            {match.firstTeam}
          </div>
          <div className="team_logo">
            <img src={egypt}/>
          </div>
          <span>vs</span>
          <div className="team_logo">
            <img src={brazil}/>
          </div>
          <div className="match_team">
            {match.secondTeam}
          </div>
        </div>
        <div className="match_refree">
          <img src={refreeIcon} alt="refreeIcon"/>
          <p>{match.mainRefree}</p>
        </div>
        <div className="match_linesmen">
          <div className="match_lineman">
            <img src={flagIcon} alt="flagIcon"/>
            <p>{match.linesmen[0]}</p>
          </div>
          <div className="match_lineman">
            <img src={flagIcon} alt="flagIcon"/>
            <p>{match.linesmen[1]}</p>
          </div>
        </div>
        <div className='reservation_container'>
          <Link to='/buy_ticket'>buy ticket</Link>
        </div>
      </div>
    </div>
  );
}

export default Match;
