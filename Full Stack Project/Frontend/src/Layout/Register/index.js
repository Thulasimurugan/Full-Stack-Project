import {Row, Col, Button, Container} from 'react-bootstrap';
import Register from '../../Component/Register';
import React from "react";

function RegisterLayout() {
    return(
        <>
        <Container fluid className='m-0 p-0 min-vh-100 d-flex align-items-md-center justify-content-md-center' style={{ background: "#E2F5FB" }}>
            <Row className='m-0 d-flex w-100 min-vh-100 p-0 px-md-5 justify-content-md-center align-items-md-center'>
                <Col className='d-flex m-0 p-0 vh-75'>
                    <Register />
                </Col>
            </Row>
        </Container>
        </>
    );
};
export default RegisterLayout;