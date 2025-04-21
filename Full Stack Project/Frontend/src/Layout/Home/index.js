import { Row, Col, Button, Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import Home from '../../Component/Home';



function HomeLayout() {

    return (
        <Container className='p-0 m-0' fluid>
            <Row className=' d-flex m-0 p-0'>
                <Col className='d-flex m-0 p-0'>
                    <Home />
                </Col>
            </Row>
        </Container>
    )
}

export default HomeLayout;