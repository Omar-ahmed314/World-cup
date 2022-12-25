import '../../styles/Home/Home.css'
import Toolbar from "./Toolbar";
import MCImages from "./mcImages";
import Carosel from "./carosel";
import Middle from './middle';
import Matches from './matches';
import Footer from './footer';

function Home() {
  return (
    <div>
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
