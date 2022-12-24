import messiImage from '../images/messi2.png'
import ronaldoImage from '../images/ronaldo.png'
import '../styles/mcImages.css'

function MCImages() {
  return (
    <div className="imagesContainer">
        <img src={messiImage} alt="messi" className="messiImage"/>
        <img src={ronaldoImage} alt="ronaldo" className="ronaldoImage"/>
    </div>
  );
}

export default MCImages;
