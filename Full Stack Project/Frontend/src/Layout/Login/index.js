import { Container, Row, Col, Button } from 'react-bootstrap';
import Login from "../../Component/Login";


function LoginLayout() {
    return (
        <Container fluid className='m-0 p-0 min-vh-100 d-flex align-items-md-center justify-content-md-center' style={{ background: "#E2F5FB" }}>
            <Row className='m-0 d-flex w-100 min-vh-100 p-0 px-md-5 justify-content-md-center align-items-md-center'>
                <Col className='d-flex m-0 p-0 vh-75'>
                    <Login/>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginLayout;