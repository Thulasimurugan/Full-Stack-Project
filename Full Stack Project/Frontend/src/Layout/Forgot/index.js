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
        <Container className='p-0 m-0 vh-100' fluid>
            <Row className=' d-flex m-0 p-0 h-100'>
                <Col className='d-flex m-0 p-0'>
                    {showComponent === 0 && <Forgot showComponent={showComponent} setShowComponent={setShowComponent} />}
                    {showComponent === 1 && <ForgotOTP showComponent={showComponent} setShowComponent={setShowComponent} />}
                    {showComponent === 2 && <ResetPassword showComponent={showComponent} setShowComponent={setShowComponent} />}
                </Col>
            </Row>
        </Container>
    )
}

export default ForgotLayout;