import '../../styles/Home/matches.css'
import worldCup from '../../images/world cup.png'
import { Link } from 'react-router-dom';
import { config } from '../../config';
import { useState, useEffect } from 'react';
import axios from 'axios';


function Matches() {
  const [matches, setMatches] = useState([]);

  // get the matches from the API
  useEffect(() => {
    axios.get(`${config.url}/match`)
      .then(res => {
        let matches = res.data;
        setMatches(matches);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  return (
    <div className="matchesSlot">
        <div className="slotHeader"><h2>Matches</h2></div>
        <div className="matchesContainer">
          {
            matches.map(match => {
              return (
                <Link to={`/match/${match.matchid}`} className="matchContainer">
                  <div className="match_time">
                    {match.matchtime} {new Date(match.matchday).toDateString()}
                  </div>
                  <div className="match_teams">
                    {match.firstteam} <span>vs</span> {match.secondteam}
                  </div>
                </Link>
                )
            })
          }
        </div>
        <img src={worldCup} alt="worldcup"/>
    </div>
  );
}

export default Matches;
