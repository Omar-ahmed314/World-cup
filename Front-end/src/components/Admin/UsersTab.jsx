import { Fragment } from "react";
import {MembersTable, WaitingTable} from './CustomizedTable';
import BasicTabs from './Tabs';

const UsersTab = ({currentTab}) => {
    return (
        <Fragment>
            <div className={'tables-con '.concat(currentTab === 0 ? '' : 'hidden')}>
                    <h3>Memebers dashboard</h3>
                    <BasicTabs>
                        <MembersTable/>
                        <WaitingTable/>
                    </BasicTabs>
                </div>
        </Fragment>
    );
}

export default UsersTab;