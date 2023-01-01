import axios from 'axios';
import { useEffect, useState} from 'react';
import '../../styles/ReservedMatches/ReservedMatches.css';
import Toolbar from '../Home/Toolbar';
import { config } from '../../config';

function ReservedMatches() {
  // reserved matches array
  const [reservedMatches, setReservedMatches] = useState([]);
  // the id of the current user
  const userID = 1;
  // delete a match from the reserved matches array
  const deleteMatch = async (reservationId) => {
    const response = await axios.delete(`${config.url}/reservation/${reservationId}`);
    setReservedMatches(reservedMatches.filter((reservedMatch) => reservedMatch.reservationid !== reservationId));
  }

  // get the reserved matches from the api and store them in reservedMatches array
  useEffect(() => {
    const getReservedMatches = async () => {
      const response = await axios.get(`${config.url}/reservedmatches/${userID}`);
      const data = response.data;
      console.log(data)
      setReservedMatches(data);
    }
    getReservedMatches();
  }, [])

  return (
    <div className='reserved_matches_page'>
      <Toolbar/>
      <div className="reserved_matches_container">
        {
          reservedMatches.map((reservedMatch) => {
            return(
              <div className="reserved_match">
                <div className="match_info">
                    <div className="date">
                          {reservedMatch.matchday} {reservedMatch.matchtime}
                    </div>
                    <div className="stadium">
                          {reservedMatch.stadiumname}
                    </div>
                    <div className="teams">
                          {reservedMatch.firstteam} vs {reservedMatch.secondteam}
                    </div>
                    <div className="seat_number">
                          Seat Number: {reservedMatch.seatno}
                    </div>
                </div>
                <div className="cansellation_btn">
                  <button onClick={() => deleteMatch(reservedMatch.reservationid)}>Cancel</button>
                </div>
              </div>
            )
          })
      }
      </div>
      
    </div>
  );
}

export default ReservedMatches;
