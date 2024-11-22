import { useState, useEffect, Fragment } from 'react';
import Toolbar from '../Home/Toolbar';
import { Container } from '@mui/material';
import AdminToolbar from '../Home/AdminToolbar';
import UsersTab from './UsersTab';
import MatchesTab from './MatchesTab';
import StadiumsTab from './StadiumsTab';
import '../../styles/Admin/Dashboard.css'


const panelTabsLabels = ['Users', 'Matches', 'Stadiums']

const Dashboard = () => {
    const [panelOpen, setPanelOpen] = useState(true);
    const [currentTab, setCurrentTab] = useState(0)

    const togglePanel = () => {
        setPanelOpen(!panelOpen);
    }

    return <Fragment>
        <div className='page-container'>
            <div className={'panel '.concat(panelOpen ? '' : 'panel-close')}>
                <h3>ADMIN</h3>
                <ul>
                    {
                        panelTabsLabels.map((value, idx) => 
                            <li 
                        onClick={() => setCurrentTab(idx)}
                        className={currentTab === idx ? 'checked' : ''}>{value}</li> 
                        )
                    }
                </ul>

            </div>
            <div className='dash-container'>
                <AdminToolbar togglePanel={togglePanel}/>
                <div className="container tabs-container">
                    <UsersTab currentTab={currentTab}/>
                    <MatchesTab currentTab={currentTab}/>
                    <StadiumsTab currentTab={currentTab}/>
                </div>
            </div>
        </div>
    </Fragment>
}

export default Dashboard;