import '../../styles/Home/Home.css'
import MCImages from "./mcImages";
import Carosel from "./carosel";
import Middle from './middle';
import Matches from './matches';
import Footer from './footer';
import Toolbar from '../Home/Toolbar';

function Home() {
  return (
    <div className='home_page'>
      <Toolbar/>
      <div className='body'>
        <MCImages/>
        <Carosel/>
        <Middle/>
        <Matches/>
      </div>
      <Footer/>
    </div>
  );
}

export default Home;
