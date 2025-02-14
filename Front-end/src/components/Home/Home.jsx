import '../../styles/Home/Home.css'
import MCImages from "./mcImages";
import Carosel from "./carosel";
import Middle from './middle';
import Matches from './matches';
import Footer from './footer';
import Toolbar from '../Home/Toolbar';

function Home() {
  return (
    <>
      <Toolbar/>
      <div className='home_page'>
        <div className='home_page_body'>
          <MCImages/>
          <Carosel/>
          <Middle/>
          <Matches/>
        </div>
        <Footer/>
      </div>
    </>
  );
}

export default Home;
