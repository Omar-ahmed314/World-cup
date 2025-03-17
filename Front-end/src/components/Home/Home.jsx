import '../../styles/Home/Home.css';
import MCImages from './mcImages';
import Carosel from './carosel';
import Middle from './middle';
import Matches from './matches';
import Footer from './footer';
import Toolbar from '../Home/Toolbar';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useRefreshToken from '../../Hooks/useRefreshToken';
import { decodeToken } from 'react-jwt';

function Home() {
  const [isLoading, setLoading] = useState(true);
  const refresh = useRefreshToken();
  const navigate = useNavigate();

  useEffect(async () => {
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
  }, []);

  return (
    <>
      <Toolbar />
      <div className="home_page">
        <div className="home_page_body">
          <MCImages />
          <Carosel />
          <Middle />
          <Matches />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Home;
