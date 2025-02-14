import '../../styles/Home/carosel.css'
import c1 from '../../images/c1.jpg'
import c2 from '../../images/c2.jpeg'
import c3 from '../../images/c3.jpg'

function Carosel() {
  return (
    <div className="caroselContainer container">
        <div className='c1'><img src={c1}/></div>
        <div className='c2'><img src={c2}/></div>
        <div className='c3'><img src={c3}/></div>
    </div>
  );
}

export default Carosel;
