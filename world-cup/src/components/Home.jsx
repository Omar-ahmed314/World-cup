import '../styles/Home.css'
import Toolbar from "./Toolbar";
import MCImages from "./mcImages";
import Carosel from "./carosel";
import Middle from './middle';

function Home() {
  return (
    <div>
      <Toolbar/>
      <MCImages/>
      <Carosel/>
      <Middle/>
    </div>
  );
}

export default Home;
