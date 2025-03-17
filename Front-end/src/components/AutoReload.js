import { Outlet } from 'react-router-dom';
import useRefreshToken from '../Hooks/useRefreshToken';
import { Fragment, useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import { decodeToken } from 'react-jwt';
import { useNavigate } from 'react-router-dom';

const AutoReload = () => {
  const [isLoading, setLoading] = useState(true);
  const refresh = useRefreshToken();
  const navigate = useNavigate();

  useEffect(() => {
    const reload = async () => {
      try {
        setLoading(true);
        const accessToken = await refresh();
        const decodedToken = decodeToken(accessToken);
        if (decodedToken['role'] === 'admin') {
          navigate('/dashboard', { replace: true });
        }
        setLoading(false);
      } catch (error) {
        console.log('You have to login manualy');
        setLoading(false);
      }
    };
    reload();
  }, []);

  return (
    <Fragment>
      {isLoading ? (
        <ReactLoading
          type="spinningBubbles"
          color="black"
          style={{
            position: 'relative',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100px',
            height: '100px',
          }}
        />
      ) : (
        <Outlet />
      )}
    </Fragment>
  );
};

export default AutoReload;
