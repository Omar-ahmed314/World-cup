import '../../styles/Home/matches.css'
import worldCup from '../../images/world cup.png'

function Matches() {
  return (
    <div className="matchesSlot">
        <div className="slotHeader"><h2>Matches</h2></div>
        <div className="matchesContainer">
            <div className="matchContainer">match</div>
            <div className="matchContainer">match</div>
            <div className="matchContainer">match</div>
        </div>
        <img src={worldCup} alt="worldcup"/>
    </div>
  );
}

export default Matches;
