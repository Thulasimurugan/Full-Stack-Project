import {Row, Col, Button, Container} from 'react-bootstrap';
import Register from '../../Component/Register';
import React from "react";

function RegisterLayout() {
    return(
        <Container fluid className="d-flex m-0 p-0 vh-100">
            <Row className="d-flex m-0 p-0 w-100">
                <Col className="d-flex m-0 p-0">
                    <Register />
                </Col>
            </Row>
        </Container>
    );
};
export default RegisterLayout;