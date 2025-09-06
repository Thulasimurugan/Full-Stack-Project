import { useState } from 'react';
import { Row, Col, Button, Container } from 'react-bootstrap';
import Forgot from '../../Component/Forgot/Email';
import ForgotOTP from '../../Component/Forgot/Otp';
import ResetPassword from '../../Component/Forgot/ResetPassword';
import { useEffect } from 'react';



function ForgotLayout() {
    const [showComponent, setShowComponent] = useState(() => {
        return Number(localStorage.getItem('showComponent')) || 0;
    });

    useEffect(() => {
        localStorage.setItem('showComponent', showComponent);
    })

    return (
        <Container className='p-0 m-0 min-vh-100' fluid style={{ background: "#E2F5FB"}}>
            <Row className=' d-flex m-0 p-0 bg-warning min-vh-100'>
                <Col className='d-flex m-0 p-0 d-flex align-items-center justify-content-center'>
                    {showComponent === 0 && <Forgot showComponent={showComponent} setShowComponent={setShowComponent} />}
                    {showComponent === 1 && <ForgotOTP showComponent={showComponent} setShowComponent={setShowComponent} />}
                    {showComponent === 2 && <ResetPassword showComponent={showComponent} setShowComponent={setShowComponent} />}
                </Col>
            </Row>
        </Container>
    )
}

export default ForgotLayout;