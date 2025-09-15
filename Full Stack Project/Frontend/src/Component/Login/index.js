import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Auth from '../../Auth';
import Axios from 'axios';
import Validator, { trim } from 'validator';
import { Row, Col, Button, Form, InputGroup, Offcanvas, OffcanvasBody, OffcanvasHeader, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import LoginImage from '../../Assets/Images/login.png';
import welcomeDoctor from "../../Assets/Images/welcomeDoctor.png";
import { popup } from '../Popup';
import loginWave from "../../Assets/Images/wave(1).png";
import { MdEmail, MdClose } from 'react-icons/md';
import { IoIosLock } from 'react-icons/io';
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaTwitter, FaApple, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const [visible, setVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [isChecked, setIsChecked] = useState(localStorage.getItem("Remember Me") === 'false' ? false : true);
    const [margin, setMargin] = useState(getMargin());
    const [limit, setLimit] = useState(localStorage.getItem('limit') > 0 ? localStorage.getItem('limit') : 0);
    const [login, setLogin] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();
    const localEmail = localStorage.getItem("email");
    const token = localStorage.getItem("refreshToken");
    const socialIcons = [
        {
            icon0: <FcGoogle />,
            color: 'none',
        },
        {
            icon1: <FaFacebookF />,
            color: '#1877F2',
        },
        {
            icon2: <FaTwitter />,
            color: '#1DA1F2',
        },
        {
            icon3: <FaApple />,
            color: '#000000',
        },
    ]

    function getMargin() {
        if (window.innerWidth > 1200) {
            return '-110px';
        } else if (window.innerWidth > 992) {
            return '-80px';
        } else if (window.innerWidth > 767) {
            return '-50px';
        } else if (window.innerWidth > 576) {
            return '0px';
        } else {
            return '0px';
        }
    };

    const handleCheckChange = (event) => {
        setIsChecked(event.target.checked);
        localStorage.setItem('Remember Me', event.target.checked);

        if (localEmail !== null && token !== null && isChecked !== true) {
            setLogin({
                email: localEmail,
                password: ''
            });
            const password = document.getElementById('myPassword');
            password.setAttribute("disabled", "true");
            password.setAttribute("placeholder", "Please login without password");
        } else {
            const password = document.getElementById('myPassword');
            password.removeAttribute("disabled");
            password.setAttribute("placeholder", "Password");
        }
    };

    const handleClose = () => {
        setIsLoading(false);
        setShow(false);
        setLogin(
            {
                email: '',
                password: '',
            }
        )
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setLogin({
            ...login,
            [name]: value,
        })
    };

    const handleAutoLogin = async () => {
        Auth.login(() => {
            navigate("/home");
        })
    }

    const handleSubmit = async (event) => {
        setIsLoading(true);
        event.preventDefault();
        if (Validator.isEmpty(login.email)) {
            setIsLoading(false);
            popup.errorPopup({ msg: "We'll need your email to continue.", color: "#dc3545", popupIcon: "error" });
        } else if (Validator.isEmpty(login.password)) {
            setIsLoading(false);
            popup.errorPopup({ msg: "Don't forget your password.", color: "#dc3545", popupIcon: "error" });
        } else if (!Validator.isEmail(login.email)) {
            setIsLoading(false);
            popup.errorPopup({ msg: "Enter a valid email (e.g.,name@example.com).", color: "#dc3545", popupIcon: "error" });
        } else if (!Validator.isStrongPassword(login.password)) {
            setIsLoading(false);
            popup.errorPopup({ msg: "Password must be at least 8 characters long, include uppercase, lowercase, a number, and a special character.", color: "#dc3545", popupIcon: "error" });
        } else {
            setTimeout(() => {
                popup.errorPopup({ msg: "Welcome back! You've logged in successfully.", color: "#28a745", popupIcon: "success" });
                Auth.login(() => {
                    navigate('/home');
                });
            }, 3000)
        }
    };

    const handleForgot = () => {
        localStorage.setItem("showComponent", 0);
        navigate('/forgot');

    }

    const closeContent = () => (
        <>
            <div className='m-0 p-2 d-flex justify-content-end w-100'>
                <Button
                    className='m-0 bg-transparent border-0 d-flex'
                    onClick={() => handleClose()}
                >
                    <MdClose className='fs-1 m-0 p-0 fw-bolder' style={{ color: '#003569' }} />
                </Button>
            </div>
        </>
    )

    const loginForm = () => (
        <>
            <div className='m-0 p-0 d-flex h-100 justify-content-center align-items-center'>
                <Form className='w-100 d-flex justify-content-center align-items-center' id="myForm" onSubmit={(event) => isChecked === true && localEmail !== null && token !== null ? handleAutoLogin(event) : handleSubmit(event)}>
                    <div className='m-0 p-0 flex-column w-75'>
                        <p className='m-0 p-0 text-center fw-bolder' style={{ color: '#17414F', fontSize: '17px' }}>Login Please</p>
                        <p className='mt-2 mt-md-1 mb-0 p-0 text-center' style={{ color: '#727272', fontSize: '14px' }}>This is a secure system and you will need to provide your login details to access the site.</p>
                        <Form.Group className='w-100 m-0 p-0 border-0 mt-4'>
                            <InputGroup className='rounded-2' style={{ border: '2px solid #17414F' }}>
                                <InputGroup.Text className='bg-transparent' style={{ border: 'none' }}><MdEmail /></InputGroup.Text>
                                <Form.Control
                                    type={"text"}
                                    placeholder='Email'
                                    name='email'
                                    value={login.email}
                                    onChange={(event) => handleChange(event)}
                                    maxLength={400}
                                    className="bg-transparent rounded-2"
                                    style={{ border: 'none', boxShadow: 'none', outline: 'none' }} />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className='w-100 m-0 p-0 border-0 mt-3'>
                            <InputGroup className='rounded-2' style={{ border: '2px solid #17414F' }}>
                                <InputGroup.Text className='bg-transparent' style={{ border: 'none' }}><IoIosLock /></InputGroup.Text>
                                <Form.Control
                                    type={visible ? "text" : "password"}
                                    placeholder='Password'
                                    name='password'
                                    id='myPassword'
                                    value={login.password}
                                    onChange={(event) => handleChange(event)}
                                    maxLength={30}
                                    className="bg-transparent rounded-2"
                                    style={{ border: 'none', boxShadow: 'none', outline: 'none' }} />

                                <InputGroup.Text className='bg-transparent' style={{ border: 'none' }}>{visible ? <FaEyeSlash onClick={() => setVisible(false)} style={{ cursor: 'pointer' }} /> : <FaEye onClick={() => setVisible(true)} style={{ cursor: 'pointer' }} />}</InputGroup.Text>
                            </InputGroup>
                        </Form.Group>
                        <div className='d-flex mt-3 mb-3 p-0 w-100 justify-content-end'>
                            <a onClick={() => handleForgot()} className='fs-6 m-0 p-0' style={{ color: '#2D3F59', textDecoration: 'none', cursor: 'pointer' }}>Forgot Password?</a>
                        </div>
                        {/* <div className='d-flex m-0 p-0 w-100 mt-2 mb-2 justify-content-start gap-2'>
                        <Form.Group style={{ cursor: "pointer" }}>
                            <Form.Check
                                checked={isChecked}
                                onChange={(event) => handleCheckChange(event)}
                            />
                        </Form.Group>
                        <p>Remember Me</p>
                    </div> */}
                        <div className='d-flex m-0 p-0 flex-column'>
                            <Button className='w-100 text-center border-0 rounded-2' disabled={isLoading ? true : false} id='loginButton' type='submit' style={{ background: '#17414F', color: 'white' }}>{isLoading ? <><Spinner size='sm' className='text-light mx-1 p-0' /> Please wait...</> : "Login"}</Button>
                            <p className='w-100 mt-3 mb-0 p-0 text-center'>Continue With One of These</p>
                            <div className='mt-1 mb-1 p-0 d-flex justify-content-center gap-4 w-100'>
                                {socialIcons.map((value, index) => (
                                    <Button className="fs-4 p-0 border border-0 bg-transparent" style={{ color: `${value.color}` }} key={index}>{value[`icon${index}`]}</Button>
                                ))}
                            </div>
                            <p className='m-0 p-0 gap-3 mt-1 mt-sm-1 mt-md-0 text-center' style={{ color: '#17414F' }}>Dont have an account? <Link className='fw-bolder text-decoration-none' style={{ color: '#17414F' }} to="/register">register</Link></p>
                        </div>
                    </div>
                </Form>
            </div>
        </>
    )

    useEffect(() => {
        const handleResize = () => {
            setMargin(getMargin());
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // useEffect(() => {
    //     Auth.logout(() => {
    //         localStorage.setItem('limit', limit);
    //     });
    //     if (limit >= 5) {
    //         setTimeout(() => { setLimit(0) }, 1000);
    //     };
    // });

    // useEffect(() => {
    //     if (localEmail !== null && token !== null && isChecked === true) {
    //         setLogin({
    //             email: localEmail,
    //         })
    //         const password = document.getElementById('myPassword');
    //         password.setAttribute("disabled", "true");
    //         password.setAttribute("placeholder", "Please login without password");
    //     } else {
    //         const password = document.getElementById('myPassword');
    //         password.removeAttribute("disabled");
    //         password.setAttribute("placeholder", "Password");
    //     }
    // }, []);

    return (
        <>
            <Helmet>
                <title>Login</title>
                <meta name="description" content="Only the best when you choose products offered on our platform - high quality
ingredients for high quality products!"/>
                <meta name="keywords" content="medical,medicine,tablet,hospital products,hospital,hospitals,vitamin,weight less,minerals" />
            </Helmet>
            <Row className='m-0 p-0 d-flex w-100'>
                <Col className='m-0 p-0 d-none d-md-flex' xl={8} lg={8} md={8}>
                    <div className='m-0 p-0 w-100 flex-column d-flex justify-content-center align-items-center' style={{ border: '3px solid #727272', borderRight: "None", background: '#FFFFFF', borderTopLeftRadius: "25px", borderBottomLeftRadius: "25px" }}>
                        <p className='m-0 p-0 fw-bolder w-100 text-center' style={{ color: '#17414F', fontSize: '17px' }}>Essential Vitamins</p>
                        <p className='m-0 p-0 text-center w-75' style={{ color: '#727272', fontSize: '14px' }}>Only the best when you choose products offered on our platform.</p>
                        <p className='m-0 p-0 text-center w-100' style={{ color: '#727272', fontSize: '14px' }}>high quality ingredients for high quality products!</p>
                        <div className='m-0 p-0 w-100 d-flex justify-content-center align-items-center'>
                            <img src={LoginImage} className='img-fluid' alt='loginImage' />
                        </div>
                    </div>
                </Col>
                <Col className='m-0 p-0 d-flex' xxl={4} xl={4} lg={4} md={4}>
                    <div className='m-0 p-0 d-none py-md-5 d-md-flex w-100 ' style={{ backgroundColor: "#003569", border: '3px solid #727272', borderLeft: "None", borderTopRightRadius: '25px', borderBottomRightRadius: '25px' }}>
                        <div className='py-md-3 py-lg-4 w-100 d-flex align-items-center justify-content-center shadow' style={{ marginLeft: `${margin}`, border: "1px solid #737373", borderRadius: '15px', borderColor: '#727272', background: '#FFFFFF' }}>
                            {loginForm()}
                        </div>
                    </div>
                    <div className="w-100 m-0 p-0 d-flex flex-column justify-content-center d-md-none position-relative" style={{ minHeight: '100%', overflow: 'auto', backgroundColor: '#003569' }}>
                        <div className="d-flex justify-content-center m-0 p-0" style={{ height: '61%', position: 'absolute', zIndex: 1, top: '12%', left: '0', right: '0' }}>
                            <img className="img-fluid d-flex m-0 p-0" src={welcomeDoctor} alt="welcome-doctor" />
                        </div>
                        <div className="w-100 m-0 h-50 p-0 d-flex align-items-center justify-content-center flex-column " style={{ position: 'absolute', zIndex: '2', bottom: '0', left: '0', right: '0' }}>
                            <img className="m-0 p-0 img-fluid h-75" style={{ position: 'absolute', zIndex: 1, top: '8%' }} src={loginWave} alt='login-wave' />
                            <p className='m-0 p-0 fs-5 w-100 text-center fw-bolder z-2' style={{ color: '#E2F5FB' }}>Namaste, Welcome Back!</p>
                            <p className='m-0 p-0 fs-6 text-center fw-bolder z-2 mt-2 w-75' style={{ color: '#727272' }}>Discover natural healing and personalized care for a healthier you.</p>
                            <Button onClick={() => setShow(true)} className="rounded-5 mt-3 w-75 fw-bolder text-center z-2" style={{ border: '3px solid #727272', background: '#E2F5FB', color: '#003569' }}>Begin Your Wellness Journey</Button>
                        </div>
                    </div>
                    {popup.offCanvas({
                        show: show,
                        placement: 'bottom',
                        headerContent: closeContent,
                        bodyContent: loginForm,
                        canvasClassname: "m-0 p-0  d-flex d-md-none",
                        canvasStyle: { borderTopRightRadius: '35px', borderTopLeftRadius: '35px', height: '70%', borderTop: '3px solid #727272' },
                        headerClassname: "m-0 p-0 d-flex",
                        headerStyle: {},
                        bodyClassname: 'w-100 d-flex flex-column justify-content-start align-items-center m-0 p-0',
                        bodyStyle: {},
                    })}
                </Col>
            </Row>
        </>
    )
}

export default Login;