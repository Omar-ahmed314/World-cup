import { useEffect, useState } from "react";
import '../../styles/Admin/MatchesTab.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faXmark } from '@fortawesome/free-solid-svg-icons';
import Confirm from "./Confirm";
import MatchForm from "./MatchForm";
import MatchEditForm from "./MatchEditForm";
import MatchController from "../../Api/match/MatchController";

const flagSrc =  '/flags/'


const MatchesTab = ({currentTab}) => {
    const [matchesList, setMatchesList] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [currentSelectedMatch, setCurrentSelectedMatch] = useState(null);
    // update form data
    const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);

    const handleUpdateFormOpen = () => {
        setIsUpdateFormOpen(true);
    }

    const handleUpdateFormClose = () => {
        setIsUpdateFormOpen(false);
    }

    const handleFormOpen = () => {
        setIsFormOpen(true);
    }

    const handleFormClose = () => {
        setIsFormOpen(false);
    }

    const handleConfirmWindowClose = () => {
        setIsOpen(false);
    }
    const handleConfirmWindowOpen = () => {
        setIsOpen(true);
    }

    const confirmWindowFunction = async (matchId) => {
        await new MatchController().remove(matchId);
        await refreshMatchList();
        setIsOpen(false);
    }

    const refreshMatchList = async () => {
        const matchList = await new MatchController().getMatchesWithStadium();
        setMatchesList(matchList);
    }

    useEffect(() => {
        refreshMatchList();
    }, [])

    return (
        <div className={' '.concat(currentTab === 1 ? '' : 'hidden')}>
            <Confirm text={'Are you sure you want to delete this match?'} 
            confirmFunction={confirmWindowFunction} 
            isOpen={isOpen} 
            handleClose={handleConfirmWindowClose}
            params={currentSelectedMatch}/>

            <MatchForm isOpen={isFormOpen} handleClose={handleFormClose} callbackFunction={refreshMatchList}/>
            <MatchEditForm isOpen={isUpdateFormOpen} handleClose={handleUpdateFormClose} callbackFunction={refreshMatchList} matchData={currentSelectedMatch}/>

            <div className="match-form-con">
                <div className="match-form">
                    <div className="inner-cont">
                        <div className="header">
                            <h2>ADD MATCH</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="match-control-panel">
                <h2>MATCHES</h2>
                <button onClick={handleFormOpen}><span>+</span> ADD MATCH</button>
            </div>
            <div className="matches-container">
                {
                    matchesList?.map((match, idx) => {
                        return (
                            <div className="match-container" key={match.matchID}>
                                <div className  ="inner-container">
                                    <div className="header">
                                        <div className="header-std-slog">
                                            <p>FIFA World Cup 2022</p>
                                            <p>{match.stadiumName} Stadium</p>
                                        </div>
                                        <div className="header-btns">
                                            <div className="edit-btn" title="Edit"
                                            onClick={ _ => {
                                                setCurrentSelectedMatch(match);
                                                handleUpdateFormOpen();
                                                }}>
                                                <FontAwesomeIcon icon={faEllipsisVertical}
                                                size="lg" />
                                            </div>
                                            <div className="cancel-btn" title="Remove" 
                                            onClick={ _ => {
                                                setCurrentSelectedMatch(match.matchID)
                                                handleConfirmWindowOpen();
                                                }}>
                                                <FontAwesomeIcon icon={faXmark}
                                                    size="lg" />
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div className="body">
                                        <div className="match-st-card">
                                            <img src={`${flagSrc}${match.firstTeam.toLowerCase()}.png`} alt={match.firstTeam} />
                                            <p>{match.firstTeam}</p>
                                        </div>
                                        <span>VS</span>
                                        <div className="match-nd-card">
                                            <img src={`${flagSrc}${match.secondTeam.toLowerCase()}.png`} alt={match.secondTeam} />
                                            <p>{match.secondTeam}</p>
                                        </div>
                                    </div>
                                    <div className="footer">
                                            <div className="match-date">
                                                <p>{new Date(match.matchDay).toDateString()}</p>
                                            </div>
                                            <div className="match-time">
                                                <p>{match.matchTime}</p>
                                            </div>
                                        </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default MatchesTab;