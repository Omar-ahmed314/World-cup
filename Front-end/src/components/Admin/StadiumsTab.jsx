import { Fragment } from "react";

const StadiumsTab = ({currentTab}) => {
    return (
        <div className={(currentTab === 2 ? '' : 'hidden')}>
            <h1> Stadiums tab </h1>
        </div>
    );
}

export default StadiumsTab;