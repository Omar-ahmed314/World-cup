import { useRef, useEffect } from 'react';
import '../../styles/Admin/Confirm.css'




const Confirm = ({text, confirmFunction, isOpen, handleClose, params}) => {
    const confirmWinRef = useRef(null);

    useEffect(() => {
            // close the popup window when clicked outside the frame
            window.addEventListener('click', (e) => {
                if(e.target === confirmWinRef.current) {
                    handleClose(false);
                }
            })
        }, [])

    return (
        <div className={"confirm-win-cont ".concat((isOpen ? '' : 'hidden'))} ref={confirmWinRef}>
            <div className="confirm-win">
                <div className="inner-cont">
                    <div className="header">
                        <h3>Confirm</h3>
                    </div>
                    <div className="body">
                        <p>{text}</p>
                    </div>
                    <div className="btns">
                        <button className='confirm' onClick={() => {confirmFunction(params); handleClose()}}>Confirm</button>
                        <button className='cancel' onClick={handleClose}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Confirm;