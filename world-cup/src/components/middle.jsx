import hakimiImage from '../images/hakimi.png'
import effect from '../images/doteffect.png'
import '../styles/middle.css'

function Middle() {
  return (
    <div className="middleContainer">
        <div>
            <p>FIFA World Cup <br/> Qatar 2022™ <br/> Gather Us</p>
            <button>Official Products</button>
        </div>
        <img src={hakimiImage} alt="hakimi" className="hakimiImage"/>
        <img src={effect} alt="doteffect" className="doteffect"/>
    </div>
  );
}

export default Middle;
