import { Fragment } from "react";
import '../../styles/Admin/MatchesTab.css'

const MatchesTab = ({currentTab}) => {
    return (
        <div className={' '.concat(currentTab === 1 ? '' : 'hidden')}>
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
                        </div>
                    </div>
                </div>
                <div className="match-container">
                    <p>Match B</p>
                </div>
                <div className="match-container">
                    <p>Match D</p>
                </div>
                <div className="match-container">
                    <p>Match C</p>
                </div>
            </div>
        </div>
    );
}

export default MatchesTab;