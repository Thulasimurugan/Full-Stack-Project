import React from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { IoFastFood, IoFastFoodOutline, IoFitness, IoFitnessOutline, IoHomeOutline } from 'react-icons/io5';
import { CiCircleInfo, CiMobile3 } from "react-icons/ci";
import { Link } from "react-router-dom";
import Image1 from '../../Assets/Images/product-8-400x400.png.png';
import { MdCopyright, MdMedicalServices, MdOutlineProductionQuantityLimits } from "react-icons/md";
import { GiHealthCapsule, GiMedicinePills, GiChemicalDrop, GiBrain } from "react-icons/gi";

function Footer() {
    const quickLinks = [
        {
            quickName: 'Home',
            quickUrls: '/home',
            quickIcons: <IoHomeOutline className="fs-5" />
        },
        {
            quickName: 'Products',
            quickIcons: <MdOutlineProductionQuantityLimits className="fs-5" />
        },
        {
            quickName: 'Services',
            quickIcons: <MdMedicalServices className="fs-5" />
        },
        {
            quickName: 'Health Blog',
            quickIcons: <GiHealthCapsule className="fs-5" />
        },
        {
            quickName: 'Contact Us',
            quickUrls: '/contact',
            quickIcons: <CiMobile3 className="fs-5" />
        },
        {
            quickName: 'About Us',
            quickUrls: '/about',
            quickIcons: <CiCircleInfo className="fs-5" />
        },
    ]

    const ourProducts = [
        {
            quickName: 'Vitamins',
            quickUrls: '/home',
            quickIcons: <GiMedicinePills className="fs-5" />
        },
        {
            quickName: 'Supplements',
            quickIcons: <GiChemicalDrop className="fs-5" />
        },
        {
            quickName: 'Fitness',
            quickIcons: <IoFitness className="fs-5" />
        },
        {
            quickName: 'Heart Health',
            quickIcons: <IoFitnessOutline className="fs-5" />
        },
        {
            quickName: 'Brain Support',
            quickUrls: '/contact',
            quickIcons: <GiBrain className="fs-5" />
        },
        {
            quickName: 'Immunity',
            quickIcons: <IoFastFoodOutline className="fs-5" />
        },
    ]
    return (
        <>
            <footer className="p-5 m-0 d-flex" style={{ background: '#003569' }}>
                <Container fluid className="m-0 d-flex">
                    <Row className="m-0 p-0 w-100 d-flex flex-row">
                        <Col className="m-0 p-0 d-flex align-items-center" xl={3} sm={12} md={6} lg={3}  xs={12}>
                            <div className="m-0 p-0 w-100">
                                <div className="m-0 p-0 d-flex flex-row gap-2 w-100">
                                    <img
                                        src={Image1}
                                        alt="AyurVita logo"
                                        style={{ height: '40px', width: '40px', border: '3px solid #003569' }}
                                        className="rounded-5 m-0 border border-2 border-light p-0"
                                    />
                                    <p className="p-0 m-0 w-100 fs-4 fw-bolder d-flex text-light">AyurVita Care</p>
                                </div>
                                <div className="d-flex text-light mt-3 p-0">
                                    <p>Premium vitamin supplements and nutritional products. Trusted by healthcare professionals worldwide for quality and efficacy.</p>
                                </div>
                                <div className="d-flex flex-column text-light p-3 w-100 rounded-2" style={{ background: 'rgba(0,0,0, 0.2)' }}>
                                    <p className="fw-bolder m-0 p-0 d-flex w-100">Free Consultation</p>
                                    <p className="m-0 p-0 d-flex mt-2">Get expert advice on vitamin supplementation</p>
                                    <Button className="mt-2 w-50 fw-bolder border-0" style={{ background: '#E2F5FB', color: '#003569' }}>Book Now</Button>
                                </div>
                            </div>
                        </Col>
                        <Col className="m-0 p-0 d-flex" xl={3} sm={12} md={6} lg={3} xs={12}>
                            <div className="mt-4 mt-md-0 px-0 px-sm-0 px-md-4 px-xl-4 d-flex flex-column w-100">
                                <p className="w-100 m-0 p-0 text-light fs-5 fw-bolder">Quick Links</p>
                                <div className="m-0 mt-2 d-flex flex-column">
                                    {quickLinks.map((quick, index) => (
                                        <Link key={index} onClick={() => window.location.href = `${quick.quickUrls}`} className="d-flex align-items-center m-0 py-1 gap-2 text-decoration-none">
                                            <span className="p-0 m-0 d-flex text-light">{quick.quickIcons}</span>
                                            <span className="p-0 m-0 d-flex text-light">{quick.quickName}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </Col>
                        <Col className="m-0 p-0 d-flex" xl={3} sm={12} md={6} lg={3} xs={12}>
                            <div className="mt-4 mt-lg-0 d-flex flex-column w-100">
                                <p className="w-100 m-0 p-0 text-light fs-5 fw-bolder">Our Products</p>
                                <div className="m-0 mt-2 d-flex flex-column">
                                    {ourProducts.map((product, index) => (
                                        <Link key={index} to={product.quickUrls} className="d-flex align-items-center m-0 py-1 gap-2 text-decoration-none">
                                            <span className="p-0 m-0 d-flex text-light">{product.quickIcons}</span>
                                            <span className="p-0 m-0 d-flex text-light" onClick={() => window.location.reload}>{product.quickName}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </Col>
                        <Col className="m-0 p-0 d-flex" xl={3} sm={12} md={6} lg={3} xs={12}>
                            <div className="mt-4 mt-lg-0 d-flex flex-column w-100">
                                <p className="w-100 m-0 p-0 text-light fs-5 fw-bolder">Our Newsletter</p>
                                <p className="mt-3 px-3 px-sm-0 d-flex text-light">Get health tips and exclusive offers delivered to your inbox</p>
                                <Form className='flex-row m-0 px-3 px-sm-0 w-100'>
                                    <Form.Group className='w-100 rounded-2' style={{ background: '#E2F5FB'}}>
                                        <Form.Control
                                            style={{ color: '#003569', boxShadow: 'none', outline: 'none' }}
                                            className='p-2 d-flex m-0 border-0 bg-transparent fw-bolder'
                                            placeholder='Enter your email'
                                        />
                                    </Form.Group>
                                    <Button className='fw-bolder border-0 mt-2 px-4 py-2' style={{ background: 'white', color: '#17414F' }}>Subcribe</Button>
                                </Form>
                            </div>
                        </Col>
                        <Col className="mt-5 p-0">
                            <div className="m-0 p-0 d-flex w-100 justify-content-center gap-2">
                                <p className="m-0 p-0 text-light fw-bolder"><MdCopyright className="fs-5"/> </p>
                                <p className="m-0 p-0 d-flex text-light fw-bolder">2025 AyurVita Care Hospital. All rights reserved. | Privacy Policy | Terms of Service</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </>
    )
};

export default Footer;