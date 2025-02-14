import '../../styles/Home/matches.css'
import worldCup from '../../images/world cup.png'
import { Link } from 'react-router-dom';
import { config } from '../../config';
import { useState, useEffect } from 'react';
import axios from 'axios';
import MatchController from '../../Api/match/MatchController';


function Matches() {
  const [matches, setMatches] = useState([]);

  const getMatches = async () => {
    const matches = await new MatchController().getMatchesWithStadium();
    setMatches(matches);
  }

  // get the matches from the API
  useEffect(() => {
    getMatches();
  }, [matches])

  return (
    <div className="matchesSlot">
        <div className="slotHeader"><h2>Matches</h2></div>
        <div className="matchesContainer">
          {
            matches.map(match => {
              return (
                <Link to={`/match/${match.matchID}`} className="matchContainer" state={{match}}>
                  <div className="match_time">
                    {match.matchTime} {new Date(match.matchDay).toDateString()}
                  </div>
                  <div className="match_teams">
                    {match.firstTeam} <span>vs</span> {match.secondTeam}
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
