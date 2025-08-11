import React, { useEffect, useState } from "react";
import { Row, Col, Button } from 'react-bootstrap';
import { CiCalendar } from "react-icons/ci";
import aboutBackground from "../../Assets/Images/aboutBackground.jpeg";
import aboutBackground1 from "../../Assets/Images/aboutPicture.png";
import { FaHandshake } from "react-icons/fa";
import { FaRegHandshake, FaEye } from "react-icons/fa";
import aboutHeart from "../../Assets/Images/aboutHeart.jpg";
import lapTesting from "../../Assets/Images/lapTesting.jpg";
import aboutHeart1 from "../../Assets/Images/aboutHeart(1).jpg";
import aboutLugs from "../../Assets/Images/aboutLugs.jpeg";
import userProfile from '../../Assets/Images/userProfile1.png';

function About() {
    const [position, setPosition] = useState(getPosition());
    const [our, setOur] = useState([
        {
            icons: <FaHandshake className="fs-3" />,
            name: "Our Mission",
            message: "At ayurViteCare, we are dedicated to transforming lives through the timeless wisdom of ayurveda, combined with modern wellness practices."
        },
        {
            icons: <FaEye className="fs-3" />,
            name: "Our Vision",
            message: "To become the leading global platform for authentic Ayurvedic wellness, where ancient healing traditions meet modern innovation."
        },
        {
            icons: <FaRegHandshake className="fs-3" />,
            name: "Our Promise",
            message: "At ayurViteCare, We combine the profound wisdom of Ayurveda with modern conveniences to deliver healthcare that is both effective and accessible."
        }
    ]);
    const hospitalCount = [
        {
            count: '15,000+',
            countMessage: 'Patients Treated',
        },
        {
            count: '95%',
            countMessage: 'Success Rate',
        },
        {
            count: '50+',
            countMessage: 'Medical Specialists',
        },
        {
            count: '13',
            countMessage: 'Years of Excellence',
        }
    ];

    const expertDoctor = [
        {
            profile: userProfile,
            name: 'Robert Hentry',
            role: 'Chief Medical Officer & Integrative Medicine Specialist'
        },
        {
            profile: userProfile,
            name: 'Sarah Taylor',
            role: "Women's Health & Reproductive Wellness specialist",
        },
        {
            profile: userProfile,
            name: 'Trent Blake',
            role: 'Senior Consultant - Internal Medicine & Ayurveda'
        },
        {
            profile: userProfile,
            name: 'Jos Butler',
            role: 'Orthopedic Surgeon & Ayurvedic Pain Management Specialist'
        }
    ]

    function getPosition() {
        if (window.innerWidth >= 768) {
            return 'position-absolute';
        } else {
            return 'position-static';
        }
    };


    useEffect(() => {
        const handleResize = () => {
            setPosition(getPosition());
            console.log(position);
        }
        window.addEventListener('resize', handleResize);
        return window.removeEventListener('resize', handleResize());
    })

    return (
        <>
            <Row className="p-0 m-0 w-100">
                <Col className="m-0 p-0 d-flex w-100">
                    <div className="p-0 d-flex w-100 d-flex justify-content-center align-items-center flex-column" style={{ height: "270px", backgroundImage: `url(${aboutBackground})`, backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                        <p className="fw-bolder m-0 p-0 d-flex fs-1" style={{ color: 'white' }}>ABOUT US</p>
                        <p className="fw-bolder mx-5 m-xl-0 p-0 d-flex" style={{ color: 'white' }}>Leading the future of nutritional medicine and vitamin therapy with cutting-edge treatments and personalized care</p>
                    </div>
                </Col>
            </Row>
            <Row className="m-0 p-5 d-flex">
                <Col className="m-0 p-0 px-md-3 d-flex" xl={6} lg={6} md={6} sm={12} xs={12}>
                    <div className="m-0 p-0 w-100" style={{ position: 'relative' }}>
                        <img className="img-fluid w-75 h-75 border border-3 border-light" src={aboutHeart1} alt="aboutBackground" />
                        <img className="img-fluid h-50 w-50 top-50 start-50 border border-3 border-light" style={{ position: 'absolute' }} src={aboutLugs} alt="aboutBackground1" />
                        <div className="m-0 p-0 d-flex p-2 p-md-4 flex-column" style={{ backgroundColor: '#003569', borderBottom: '3px solid white', position: 'absolute', left: '25%', bottom: '9%' }}>
                            <p className="m-0 p-0 d-flex fw-bolder fs-5 fs-md-3 w-100 text-light">{hospitalCount[0].count}</p>
                            <p className="m-0 p-0 d-flex fw-bolder w-100 text-light">{hospitalCount[0].countMessage}</p>
                        </div>
                    </div>
                </Col>
                <Col className=" mt-5 mt-md-0 p-0 p-md-4 d-flex align-items-center" xl={6} lg={6} md={6} sm={12} xs={12}>
                    <div className="m-0 p-0">
                        <p className="m-0 p-0 d-flex fw-bolder gap-2" style={{ color: '#17414F' }}>ABOUT US<span className="m-0 p-0 fw-bolder"> _______</span></p>
                        <p className="mt-2 mb-0 p-0 d-flex fw-bolder fs-1" style={{ color: '#003569' }}>We Are Wellness Practitioners Dedicated To Nurturing Your Health</p>
                        <p className="mt-2 p-0" style={{ fontSize: '17px', color: '#2D3F59' }}>At AyurVita Care, we honor the 5,000-years-old science of Ayurveda to restore harmony between your mind, body, and consciousness.Our certified practitioners combine traditional diagnostic methods with modern understanding to identify your unique constitution and current imbalance.</p>
                        <div className="mx-3 p-0 d-flex align-items-center flex-rows gap-3">
                            <span className="m-0 p-0 d-flex fs-1"><CiCalendar className="fw-bolder d-flex" style={{ color: '#003569' }} /></span>
                            <div className="m-0 p-0 w-100 d-flex flex-column">
                                <p className="m-0 p-0 d-flex w-100 fw-bolder fs-6">10 Years of Trusted Ayurvedic Excellence</p>
                                <p className="d-flex m-0 p-0 fs-6" style={{ color: '#727272' }}>Clinically tested, GMP-certified products.</p>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row className="m-0 p-0 d-flex">
                <Col className="m-0 p-0 d-flex">
                    <div className="m-0 p-0 w-100 position-relative d-flex align-items-center" style={{ backgroundColor: '#003569' }}>
                        <div className={`m-0 w-100 d-flex ${position} px-5 flex-column`} style={{ zIndex: 2 }}>
                            <p className="m-0 p-0 px-md-3 fw-bolder text-light"> OUR MISSION & VISION & PROMISE_______</p>
                            <p className="mt-2 p-0 px-md-3 d-flex fw-bold fs-2 text-light">Discover The Core Principles That Guides Us</p>
                            <Row className="mt-md-4 mt-2 mx-0 my-0 mb-0 p-0 d-flex w-100">
                                {our.map((value, index) => (
                                    <Col key={index} className="m-0 px-xl-3 px-md-3 py-4 py-md-0 px-0 d-flex" xxl={4} xl={4} lg={4} md={4} xs={12}>
                                        <div className="m-0 p-3 d-flex bg-light flex-column" style={{ borderBottom: '3px solid #727272' }}>
                                            <p
                                                className="p-2 text-light border border-2 border-light"
                                                style={{
                                                    marginTop: '-35px',
                                                    backgroundColor: '#17414F',
                                                    top: '0',
                                                    left: '12px',
                                                    width: '45px'
                                                }}
                                            >
                                                {value.icons}
                                            </p>
                                            <p className="m-0 p-0 fw-bolder w-100 d-flex fs-5">
                                                {value.name}
                                            </p>
                                            <p className="m-0 p-0 d-flex" style={{ color: '#727272' }}>
                                                {value.message}
                                            </p>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                        <div className="m-0 p-0 w-100 position-relative d-none d-md-flex justify-content-end" style={{ zIndex: 1 }}>
                            <img
                                style={{
                                    clipPath: 'polygon(15% 0, 100% 0%, 100% 100%, 0% 100%)',
                                }}
                                src={lapTesting}
                                alt="aboutHeart"
                            />
                        </div>
                    </div>
                </Col>
            </Row>
            <Row className="m-0 px-5">
                {hospitalCount.map((value, index) => (
                    <Col className="m-0 p-0 d-flex" key={index} xxl={3} xl={3} lg={3} md={3} sm={6} xs={12}>
                        <div className="m-0 p-5 w-100 d-flex justify-content-center flex-column" style={{ background: '#003569' }} >
                            <p className="text-center w-100 m-0 p-0 text-light fs-2 fw-bolder">{value.count}</p>
                            <p className="text-center w-100 m-0 p-0 text-light fw-bolder">{value.countMessage}</p>
                        </div>
                    </Col>
                ))}
            </Row>
            <Row className="m-0 p-5 d-flex">
                <Col className="m-0 p-0 px-md-4 d-flex" xxl={6} xl={6} lg={6} md={6} sm={12} xs={12}>
                    <div className="m-0 p-0 d-flex w-100">
                        <img className="img-fluid" src={aboutBackground1} alt="aboutBackground" />
                    </div>
                </Col>
                <Col className=" mt-5 mt-md-0 p-0 p-md-4 d-flex align-items-center" xl={6} lg={6} md={6} sm={12} xs={12}>
                    <div className="m-0 p-0">
                        <p className="m-0 p-0 d-flex fw-bolder gap-2" style={{ color: '#17414F' }}>WHY CHOOSE AYURVITACARE_______</p>
                        <p className="mt-2 mb-0 p-0 d-flex fw-bolder fs-1" style={{ color: '#003569' }}>Ayurvedic Healing With Certified Practitioners And Proven Results For Your Complete Wellness.</p>
                        <p className="mt-2 p-0" style={{ fontSize: '17px', color: '#2D3F59' }}>At AyurVita Care, we belive that true health is more than just the absence of disease--it's a  harmonious balance of mind, body, and spirit.Our approach combines 5,000 years of ancient Ayurvedic wisdom with modern healthcare standard to deliver personalized, natural, and effective wellness solutions.</p>
                    </div>
                </Col>
            </Row>
            <Row className="m-0 p-0 d-flex">
                <Col className="m-0 p-0 d-flex">
                    <div className="m-0 w-100 d-flex">
                        <p className="m-0 p-0 w-100 text-center fw-bolder fs-5" style={{ color: '#727272' }}>Meet Our Doctor Experts</p>
                    </div>
                </Col>
            </Row>
            <Row className="m-0 p-5 d-flex bg-warning">
                {expertDoctor.map((value, index) => (
                    <Col key={index} className="m-0 p-0 px-md-3 d-flex" xxl={3} xl={3} lg={3} md={3} sm={12} xs={12}>
                        <div className="m-0 p-0 d-flex w-100 justify-content-center align-items-center flex-column position-relative h-100" style={{ backgroundColor: '#17414F' }}>
                            <img src={value.profile} className="rounded-circle border border-3 border-light p-0 d-flex" style={{top:'30px',height: '60px', width: '60px'}} alt="userProfile" />
                            {/* <p className="mt-2 mb-0 p-0 text-light fw-bolder fs-5  w-100 text-center">{value.name}</p>
                            <p className="mt-1 mb-1 px-4 d-flex text-light fw-bolder text-center">{value.role}</p> */}
                        </div>
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default About;