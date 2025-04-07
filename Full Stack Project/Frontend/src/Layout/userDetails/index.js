import {Row, Col, Button, Container} from 'react-bootstrap';
import UserDetails from '../../Component/userDetails';
import React from "react";

function UserDetailsLayout() {
    return(
        <Container fluid className="d-flex m-0 p-0 vh-100">
            <Row className="d-flex m-0 p-0 w-100">
                <Col className="d-flex m-0 p-0">
                    <UserDetails />
                </Col>
            </Row>
        </Container>
    );
};
export default UserDetailsLayout;