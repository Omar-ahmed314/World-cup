import { Fragment } from "react";

const MatchesTab = ({currentTab}) => {
    return (
        <div className={(currentTab === 1 ? '' : 'hidden')}>
            <h1> matches tab </h1>
        </div>
    );
}

export default MatchesTab;