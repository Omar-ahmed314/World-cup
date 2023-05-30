import { Outlet } from "react-router-dom";
import useRefreshToken from "../Hooks/useRefreshToken";
import { Fragment, useEffect, useState } from "react";
import ReactLoading from 'react-loading';

const AutoReload = () => {
    const [isLoading, setLoading] = useState(true);
    const refresh = useRefreshToken();

    useEffect(() => {
        const reload = async () => {
            try {
                await refresh();
                setLoading(false);
            } catch (error) {
                console.log('You have to login manualy');
                setLoading(false);
            }
        } 
        reload();
    }, []);

    return (
        <Fragment>
            {
                isLoading ? (
                <ReactLoading 
                type="spinningBubbles" 
                color="black"
                style={{
                    position: 'relative',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100px',
                    height: '100px'
                }}/>) : 
                <Outlet/>
            }
        </Fragment>
    );
}

export default AutoReload;