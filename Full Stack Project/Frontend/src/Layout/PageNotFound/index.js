import React from 'react';
import NotFound from '../../Component/PageNotFound';
import {Container, Row, Col} from "react-bootstrap";

function PageLayout() {
    return(
        <Container fluid className="m-0 p-0 vh-100">
            <Row className='h-100 d-flex m-0 p-0'>
                <Col className='m-0 p-0 w-100'>
                    <NotFound />
                </Col>
            </Row>
        </Container>
    );
};
export default PageLayout;