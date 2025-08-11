import React from "react";
import { Row, Col, Button, Container } from "react-bootstrap";
import About from "../../Component/About";

function AboutLayout() {

    return (
        <>
            <Container fluid className="m-0 p-0 d-flex w-100">
                <Row className="m-0 p-0 w-100 d-flex">
                    <Col style={{background: "#E2F5FB"}} className="h-100 justify-content-center flex-column mt-5 mx-0 my-0 mb-0 p-0 w-100">
                        <About />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default AboutLayout;