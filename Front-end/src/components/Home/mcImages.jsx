import messiImage from '../../images/messi2.png'
import ronaldoImage from '../../images/ronaldo.png'
import '../../styles/Home/mcImages.css'

function MCImages() {
  return (
    <div className="images_container container">
        <img src={messiImage} alt="messi" className="messi_image"/>
        <img src={ronaldoImage} alt="ronaldo" className="ronaldo_image"/>
    </div>
  );
}

export default MCImages;
