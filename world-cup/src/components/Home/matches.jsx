import '../../styles/Home/matches.css'
import worldCup from '../../images/world cup.png'
import { Link } from 'react-router-dom';

function Matches() {
  return (
    <div className="matchesSlot">
        <div className="slotHeader"><h2>Matches</h2></div>
        <div className="matchesContainer">
            <Link to='/Match' className="matchContainer">match</Link>
            <Link to='/Match' className="matchContainer">match</Link>
            <Link to='/Match' className="matchContainer">match</Link>
        </div>
        <img src={worldCup} alt="worldcup"/>
    </div>
  );
}

export default Matches;
