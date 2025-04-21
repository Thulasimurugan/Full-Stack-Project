import { Button, Row, Col, Container } from "react-bootstrap";
import Contact from '../../Component/Contact';


function ContactLayout() {
    return (
        <Container fluid className="d-flex m-0 p-0">
            <Row className="w-100 m-0 p-0">
                <Col className="m-0 p-0" style={{background: "#E2F5FB"}}>
                    <Contact />
                </Col>
            </Row>
        </Container>
    );
};

export default ContactLayout;