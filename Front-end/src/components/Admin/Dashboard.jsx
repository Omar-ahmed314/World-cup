import { useState, useEffect, Fragment } from 'react';
import {MembersTable, WaitingTable} from './CustomizedTable';
import BasicTabs from './Tabs';
import Toolbar from '../Home/Toolbar';
import { Container } from '@mui/material';
import '../../styles/Admin/Dashboard.css'

const Dashboard = () => {
    return <Fragment>
        <Toolbar/>
        <Container maxWidth="lg">
            <div className="tables-con">
                <h3>Memebers dashboard</h3>
                <BasicTabs>
                    <MembersTable/>
                    <WaitingTable/>
                </BasicTabs>
            </div>
        </Container>
    </Fragment>
}

export default Dashboard;