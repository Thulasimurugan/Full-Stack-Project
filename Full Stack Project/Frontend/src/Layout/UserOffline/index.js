import React from 'react';
import UserOffLine from '../../Component/UserOffline';
import {Container, Row, Col, Button} from 'react-bootstrap';

function OffLineLayout() {
    return(
        <Container fluid className='d-flex m-0 p-0 vh-100'>
            <Row className='w-100 m-0 p-0 d-flex'>
                <Col className='m-0 p-0 d-flex'>
                    <UserOffLine />
                </Col>
            </Row>
        </Container>
    );
};
export default OffLineLayout;