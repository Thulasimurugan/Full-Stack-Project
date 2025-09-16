import { useState, useRef, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Row, Col, Button, Form, Spinner } from "react-bootstrap";
import forgotBackground from '../../../Assets/Images/aboutLugs.jpeg';
import { GiLindenLeaf, GiBrain } from 'react-icons/gi';
import { popup } from '../../Popup';
import { Helmet } from 'react-helmet';
import { Prev } from 'react-bootstrap/esm/PageItem';


function ForgotOTP({ showComponent, setShowComponent, length = 6, isEmaiSubmit, setEmailSubmit }) {
    const [otp, setOtp] = useState(Array(length).fill(""));
    const [countDown, setCountDown] = useState(!isEmaiSubmit ? sessionStorage.getItem("countDown") : 120);
    const [isLoading, setIsLoading] = useState(false);
    const [small, setSmall] = useState(window.innerWidth < 768);
    const inputRef = useRef([]);
    const smallClassname = 'min-vh-100 w-100 d-flex justify-content-start align-items-end d-md-none m-0 px-3 py-4 px-sm-4';
    const largeClassname = 'flex-column h-100 m-0 px-md-3 py-md-5 p-lg-5 w-100 d-none d-md-flex justify-content-center';
    const smallClassname1 = "m-0 px-3 px-sm-4 py-4 rounded-5";
    const largeStyle = {
        backgroundColor: '#003569',
        border: '3px solid #727272',
        borderLeft: 'None',
        borderTopRightRadius: '25px',
        borderBottomRightRadius: '25px'
    };
    const smallStyle = {
        backgroundImage: `url(${forgotBackground})`,
        backgroundPosition: 'center',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat'
    };
    const smallStyle1 = { 
        border: '3px solid #727272', 
        backgroundColor: "rgba(255, 255, 255, 0.1)", 
        backdropFilter: "blur(10px)"
    };

    const handleChange = (event, index) => {
        const value = event.target.value;
        if (value === " ") return;
        if (isNaN(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < length - 1) {
            inputRef.current[index + 1].focus();
        }

    }

    const count = () => {
        const second = String(countDown % 60).padStart(2, "0");
        const minute = String(Math.floor((countDown / 60) % 60)).padStart(2, "0");
        return `${minute}:${second}`;
    }

    const customStyles = `.custom-placeholder::placeholder {
        color: #FFFFFF;
        opacity: 1;
    }`;

    const handleKeyDown = (event, index) => {
        if (event.key === 'Backspace' && !otp[index] && length > 0) {
            if (index > 0) {
                inputRef.current[index - 1].focus();
            }
        }
    }

    const handleResend = () => {
        setEmailSubmit(true);
        setCountDown(120);
        popup.errorPopup({ msg: "We've resend the OTP to your email. Kindly veify.", color: "#28a745", popupIcon: "success" });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        if (otp.includes("")) {
            setIsLoading(false)
            popup.errorPopup({ msg: "Oops! You missed the OTP. Kindly type it in.", color: "#dc3545", popupIcon: "error" });
        } else {
            setTimeout(() => {
                popup.errorPopup({ msg: "Great job! OTP confirmed, let's move on.", color: "#28a745", popupIcon: "success" });
                setShowComponent(2)
            }, 3000)
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setSmall(window.innerWidth < 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    });

    useEffect(() => {
        const interval = setInterval(() => {
            sessionStorage.setItem("countDown", countDown);
            setCountDown((prev) => prev - 1);
        },1000);
        if(countDown < 1) {
            setEmailSubmit(false);
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [countDown]);

    const verifyForm = () => (
        <>
            <h2 className='m-0 p-0 w-100 d-flex fw-bolder' style={{ color: '#FFFFFF' }}>Let's Verify Your OTP!</h2>
            <p className='m-0 p-0 mt-xl-3 mt-lg-3 mt-md-3 mt-2 fw-bolder w-100' style={{ color: '#FFFFFF' }}>Your reset password verification code is on its way! check your email and get started!</p> 
            <p className='mt-3 mb-3 mt-md-4 mb-md-4 p-0 fw-bolder d-flex w-100'><Link style={{ color: "#FFFFFF" }} to={'/'}>Wait, I remember my password.</Link></p>
            <Form className='p-0 m-0 flex-column' onSubmit={(event) => handleSubmit(event)}>
                <div className='m-0 p-0'>
                    <style>{customStyles}</style>
                    <Form.Group className='w-100 m-0 p-0 border-0'>
                        <Form.Label className='text-light m-0 p-0 fw-bolder'>OTP <span className='fw-bolder m-0 p-0' style={{ color: 'red' }}>*</span></Form.Label>
                        <div className='d-flex gap-2 w-100 m-0 p-0'>
                            {otp.map((_, index) => (
                                <Form.Control
                                    key={index}
                                    type={"password"}
                                    value={otp[index]}
                                    ref={(el) => (inputRef.current[index] = el)}
                                    onKeyDown={(event) => handleKeyDown(event, index)}
                                    onChange={(event) => handleChange(event, index)}
                                    maxLength={1}
                                    className='fw-bolder text-center mt-1'
                                    style={{ border: '2px solid #FFFFFF', boxShadow: 'none', outline: 'none', background: 'rgba(255, 255, 255,0.1)', color: '#FFFFFF' }} />
                            ))}
                        </div>
                    </Form.Group>
                    <div className='m-0 p-0 mt-4 mb-4 d-flex'>
                        {countDown === 0 && <p className='m-0 p-0 gap-1 d-flex fw-bolder text-light'>Didn't receive the OTP?<Link className='text-light p-0 m-0' onClick={() => handleResend()}>Resend</Link></p>}
                        {countDown > 0 && <p className='m-0 p-0 text-light fw-bolder'>{`Hurry! Your OTP is valid for the next ${count()} seconds`}</p>}
                    </div>
                    <div className='mt-2 mb-0 d-flex w-100 gap-2'>
                        <Button className="bg-light fw-bolder text-center border-0" onClick={() => setShowComponent(0)} style={{ color: '#17414F', width: '30%'}}>Back</Button>
                        <Button className="bg-light w-100 fw-bolder text-center border-0" type='submit' disabled={isLoading ? true : false} style={{ color: '#17414F' }}>{isLoading ? <><Spinner size='sm' className='mx-1 p-0' /> Verifying...</> : "Verify OTP"}</Button>    
                    </div>
                </div>
            </Form>
        </>
    )

    return (
        <>
            <Helmet>
                <title>Verify OTP</title>
                <meta name="description" content="Only the best when you choose products offered on our platform - high quality
ingredients for high quality products!"/>
                <meta name="keywords" content="medical,medicine,tablet,hospital products,hospital,hospitals,vitamin,weight less,minerals" />
            </Helmet>
            <Row className='m-0 p-0 d-flex w-100'>
                <Col className='m-0 p-0 d-none d-md-flex' xxl={7} xl={7} lg={7} md={6} style={{ backgroundColor: '#003569', border: '3px solid #727272', borderRight: 'None', borderTopLeftRadius: '25px', borderBottomLeftRadius: '25px' }} >
                    <div className='p-0 m-3 w-100 d-flex justify-content-center' style={{ position: 'relative' }}>
                        <img className="m-0 p-0 img-fluid w-100 h-100" style={{ borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px' }} src={forgotBackground} alt='heart-image' />
                        <div className='m-0 p-0 p-md-3 d-flex flex-column align-items-center justify-content-center' style={{ position: 'absolute', bottom: '5%', width: '95%', border: '3px solid #727272', borderRadius: '20px', backgroundColor: "rgba(255, 255, 255, 0.1)", backdropFilter: "blur(10px)" }}>
                            <p className='m-0 p-0 text-light fw-bolder fs-4 w-75'>Knowledge sharing and lifecycle guidence for holistic health</p>
                            <div className='d-flex mt-3 mb-0 p-0 gap-3 w-100'>
                                <div className='w-50 p-0 m-0 d-flex justify-content-start align-items-center overflow-hidden' style={{ border: "2px solid #FFFFFF", borderRadius: '20px' }}>
                                    <span className='m-0 fs-6 p-0 d-flex bg-light  h-100 align-items-center justify-content-center' style={{  width: "30%", borderRadius: '20px', color: '#003569' }}><GiLindenLeaf /></span>
                                    <p className='m-0 px-md-2 py-md-2 fw-bolder fs-6 w-100 text-center' style={{ color: '#FFFFFF' }}>Herbal Medicine</p>
                                </div>
                                <div className='w-50 p-0 m-0 d-flex justify-content-start align-items-center overflow-hidden' style={{ border: "2px solid #FFFFFF", borderRadius: '20px' }}>
                                    <span className='m-0 p-0 fs-6 d-flex bg-light h-100 align-items-center justify-content-center' style={{ width: "30%", borderRadius: '20px', color: '#003569' }}><GiBrain /></span>
                                    <p className='m-0 px-md-2 py-md-2 fw-bolder fs-6 text-center w-100'  style={{ color: '#FFFFFF' }}>Mind-Body Wellness</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col className='m-0 p-0 d-flex h-100 align-items-center justify-content-center' xxl={5} xl={5} lg={5} md={6} >
                    <div className={small ? smallClassname : largeClassname} style={small ? smallStyle : largeStyle}>
                         <div className={small ? smallClassname1 : "h-100 m-0 w-100 d-flex flex-column justify-content-center align-items-center"} style={small ? smallStyle1 : {}}>
                            {verifyForm()}
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    );
};
export default ForgotOTP;