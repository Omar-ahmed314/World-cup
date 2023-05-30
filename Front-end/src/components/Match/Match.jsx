import '../../styles/match/match.css'
import egypt from '../../images/egypt.png';
import brazil from '../../images/brazil.png';
import refreeIcon from '../../images/whistle.png';
import flagIcon from '../../images/flag.png';
import Toolbar from '../Home/Toolbar';
import { useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { config } from '../../config';

// const initialMatch = {
//   firstTeam: '',
//   secondTeam: '',
//   date: '',
//   time: '',
//   stadium: '',
//   mainRefree: '',
//   linesmen: []
// }

function Match(props) {
  const [match, setMatch] = useState({});
  const {id} = useParams();
  useEffect(() => {
    // TODO: get match data from backend
    const getData = async () => {
      const matchData = await axios.get(`${config.url}/match/${id}`)
      const stadium = await axios.get(`${config.url}/stadium/${matchData.data.stadiumid}`)
      // console.log(stadium.data)
      // console.log({...matchData.data, ...stadium.data})
      setMatch({...matchData.data, ...stadium.data});
    }
    getData();
  }, []);

  return (
    <div className="match_page">
      <Toolbar/>
      <div className="match_container">
        <div className="match_container_header">
          <div className="match_stadium">
            {match.stadiumname}
          </div>
          <div className="match_time">
            {match.matchday} {match.matchtime}
          </div>
        </div>
        <div className="match_teams">
          <div className="match_team">
            {match.firstteam}
          </div>
          <div className="team_logo">
            <img src={egypt}/>
          </div>
          <span>vs</span>
          <div className="team_logo">
            <img src={brazil}/>
          </div>
          <div className="match_team">
            {match.secondteam}
          </div>
        </div>
        <div className="match_refree">
          <img src={refreeIcon} alt="refreeIcon"/>
          <p>{match.referee}</p>
        </div>
        <div className="match_linesmen">
          <div className="match_lineman">
            <img src={flagIcon} alt="flagIcon"/>
            <p>{match.linemanone}</p>
          </div>
          <div className="match_lineman">
            <img src={flagIcon} alt="flagIcon"/>
            <p>{match.linemantwo}</p>
          </div>
        </div>
        <div className='reservation_container'>
          <Link to={`/buy_ticket/${match.matchid}`} state={{noRows: match.norows, noSeats: match.noseatsperrow}}>buy ticket</Link>
        </div>
      </div>
    </div>
  );
}

export default Match;
