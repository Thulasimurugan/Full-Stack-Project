import Swal from 'sweetalert2';
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from 'react-bootstrap'; 


const errorPopup = ({ msg, color, popupIcon }) => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showCancelButton: false,
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        didOpen: (toast) => {
            const timerProgressBar = document.querySelector('.swal2-timer-progress-bar');
            if (timerProgressBar) {
                timerProgressBar.style.backgroundColor = color;
            }
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    Toast.fire({
        icon: popupIcon,
        title: msg,
        iconColor: color,
    });
};

const offCanvas = ({show, placement, headerContent, bodyContent, canvasClassname, canvasStyle, headerClassname, headerStyle, bodyClassname, bodyStyle}) => {

    return (
        <>
            <Offcanvas show={show} placement={placement} className={canvasClassname} style={canvasStyle}>
                <OffcanvasHeader className={headerClassname} style={headerStyle}>
                    {headerContent()}
                </OffcanvasHeader>
                <OffcanvasBody className={bodyClassname} style={bodyStyle}>
                    {bodyContent()}
                </OffcanvasBody>
            </Offcanvas>
        </>
    );
};

export const popup = {
    errorPopup,
    offCanvas,
};