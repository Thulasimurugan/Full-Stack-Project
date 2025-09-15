import { useState } from 'react';
import { Row, Col, Button, Container } from 'react-bootstrap';
import Forgot from '../../Component/Forgot/Email';
import ForgotOTP from '../../Component/Forgot/Otp';
import ResetPassword from '../../Component/Forgot/ResetPassword';
import { useEffect } from 'react';
import forgotBackground from "../../Assets/Images/heartForgot.jpeg";



function ForgotLayout() {
    const [isEmaiSubmit, setEmailSubmit] = useState(false);
    const [showComponent, setShowComponent] = useState(() => {
        return Number(localStorage.getItem('showComponent')) || 0;
    });

    useEffect(() => {
        localStorage.setItem('showComponent', showComponent);
    })

    return (
        <Container className='p-0 m-0 min-vh-100 d-flex align-items-md-center justify-content-md-center' fluid style={{ background: "#E2F5FB"}}>
            <Row className=' d-flex m-0 p-0 min-vh-100 w-100 px-md-5 align-items-md-center justify-content-md-center'>
                <Col className='d-flex m-0 p-0 vh-75'>
                    {showComponent === 0 && <Forgot showComponent={showComponent} setShowComponent={setShowComponent} isEmaiSubmit={isEmaiSubmit} setEmailSubmit={setEmailSubmit} />}
                    {showComponent === 1 && <ForgotOTP showComponent={showComponent} setShowComponent={setShowComponent} isEmaiSubmit={isEmaiSubmit} setEmailSubmit={setEmailSubmit}/>}
                    {showComponent === 2 && <ResetPassword showComponent={showComponent} setShowComponent={setShowComponent} />}

                </Col>
            </Row>
        </Container>
    )
}

export default ForgotLayout;