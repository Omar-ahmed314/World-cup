import { Fragment, useState } from "react";
import '../../styles/Admin/MatchesTab.css'
import brazil from '../../images/flags/brazil.png'
import argentina from '../../images/flags/argentina.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faXmark } from '@fortawesome/free-solid-svg-icons';

const MatchesTab = ({currentTab}) => {
    const [matchesList, setMatchesList] = useState([]);
    
    return (
        <div className={' '.concat(currentTab === 1 ? '' : 'hidden')}>
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
                <button><span>+</span> ADD MATCH</button>
            </div>
            <div className="matches-container">
                <div className="match-container">
                    <div className  ="inner-container">
                        <div className="header">
                            <div className="header-std-slog">
                                <p>FIFA World Cup 2022</p>
                                <p>Lusail Stadium</p>
                            </div>
                            <div className="header-btns">
                                <div className="edit-btn" title="Edit">
                                    <FontAwesomeIcon icon={faEllipsisVertical}
                                    size="lg" />
                                </div>
                                <div className="cancel-btn" title="Remove">
                                    <FontAwesomeIcon icon={faXmark}
                                        size="lg" />
                                </div>
                            </div>
                            
                        </div>
                        <div className="body">
                            <div className="match-st-card">
                                <img src={argentina} alt="Argentina" />
                                <p>Argentina</p>
                            </div>
                            <span>VS</span>
                            <div className="match-nd-card">
                                <img src={brazil} alt="Brazil" />
                                <p>Brazil</p>
                            </div>
                        </div>
                        <div className="footer">
                                <div className="match-date">
                                    <p>12 Dec 2022</p>
                                </div>
                                <div className="match-time">
                                    <p>22:20</p>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MatchesTab;