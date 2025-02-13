import { useRef, useEffect } from "react";
import '../../styles/Admin/StadiumsTab.css'

const FormHeader = ({children}) => {
    return (
        <div className="header">
            <h2>{children}</h2>
        </div>
    );
}


const FormBody = ({children}) => {
    return (
        <div className="body">
            {children}
        </div>
    )
}

const FormFooter = ({children}) => {
    return (
        <div className="footer">
            {children}
        </div>
    )
}


const Form = ({isOpen, handleClose, children}) => {
    const formRef = useRef(null);

    useEffect(() => {
            // close the popup window when clicked outside the frame
            window.addEventListener('click', (e) => {
                if(e.target === formRef.current) {
                    handleClose();
                }
            })
        }, [])

    return (
        <div className={`stad-form-con `.concat(isOpen ? '' : 'hidden')} ref={formRef}>
            <div className="stad-form" >
                <div className="inner-cont">
                {children}
                </div>
            </div>
        </div>
    );
}

export {Form, FormBody, FormHeader, FormFooter}