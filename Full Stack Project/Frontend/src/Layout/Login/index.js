import { Container, Row, Col } from 'react-bootstrap';
import Login from "../../Component/Login";


function LoginLayout() {
    return (
        <Container fluid className='m-0 p-0 vh-100'>
            <Row className='m-0 p-0 d-flex h-100'>
                <Col className='d-flex m-0 p-0 h-100'>
                    <Login/>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginLayout;