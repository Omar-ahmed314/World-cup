import '../../styles/Home/matches.css'
import worldCup from '../../images/world cup.png'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MatchController from '../../Api/match/MatchController';
import FlagEngine from '../flagsEngine';


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
    <div className="matchesSlot container">
        <div className="slotHeader"><h2>Matches</h2></div>
        <div className="matchesContainer">
          {
            matches.map(match => {
              return (
                <Link to={`/match/${match.matchID}`} className="matchContainer" state={{match}}>
                  <div className="match-date">
                    
                      {new Date(match.matchDay).toDateString()}
                    
                  </div>
                  <div className="match_teams">
                    <div className="match-team-container">
                      <img src={new FlagEngine().getFlagSrcByName(match.firstTeam)} alt="flag"/>
                    <p>{match.firstTeam}</p> 
                    </div>
                    <span>{String(match.matchTime).slice(0, 5)}</span>
                    <div className="match-team-container">
                    <img src={new FlagEngine().getFlagSrcByName(match.secondTeam)} alt="flag"/>
                    <p>{match.secondTeam}</p>
                    </div>
                  </div>
                </Link>
                )
            })
          }
        </div>
        <img className="world-cup-logo" src={worldCup} alt="worldcup"/>
    </div>
  );
}

export default Matches;
