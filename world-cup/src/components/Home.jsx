import '../styles/Home.css'
import Toolbar from "./Toolbar";
import MCImages from "./mcImages";
import Carosel from "./carosel";
import Middle from './middle';
import Matches from './matches';

function Home() {
  return (
    <div>
      <Toolbar/>
      <MCImages/>
      <Carosel/>
      <Middle/>
      <Matches/>
    </div>
  );
}

export default Home;
