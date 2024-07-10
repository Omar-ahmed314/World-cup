import { useState, useEffect, Fragment } from 'react';
import CustomizedTables from './CustomizedTable';
import CustomizedMenus from './Menu';
import Toolbar from '../Home/Toolbar';
import { Container } from '@mui/material';
import '../../styles/Admin/Dashboard.css'

const Dashboard = () => {
    return <Fragment>
        <Toolbar/>
        <Container maxWidth="lg">
            <div className="tables-con">
                <div className="table-header">
                    <h3>Memebers dashboard</h3>
                    <CustomizedMenus />
                </div>
                <CustomizedTables/>
            </div>
        </Container>
    </Fragment>
}

export default Dashboard;