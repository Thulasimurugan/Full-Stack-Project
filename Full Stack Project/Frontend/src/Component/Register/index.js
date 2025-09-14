import { useState } from 'react';
import Validator from 'validator';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Axios from 'axios';
import { Helmet } from 'react-helmet';
import { Row, Col, Button, Form, InputGroup, Spinner } from "react-bootstrap";
import { FaEye, FaEyeSlash, FaUserCircle, FaApple, FaFacebookF, FaTwitter } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { GrUserWorker } from 'react-icons/gr';
import { MdEmail } from 'react-icons/md';
import { IoIosLock } from 'react-icons/io';
import heartImage from '../../Assets/Images/aboutLugs.jpeg';
import registerWave from "../../Assets/Images/wave.png";
import { popup } from '../Popup';
import registerTablets from "../../Assets/Images/registerTablets.png";
import Image1 from '../../Assets/Images/product-8-400x400.png.png';
import { useEffect } from 'react';


function Register() {
    const [visible, setVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [small, setSmall] = useState(window.innerWidth < 768);
    const [index, setIndex] = useState(0);
    const [welcome, setWelcome] = useState("");
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const word = [
        "Your health, our priority-welcome to vitamins shop!",
        "Trusted medicines, doorstep delivery-shop with confidence",
        "Carring for you, anytime, anywhere-welcome!",
        "Your one-stop medical shop-fast,reliable, and affordable!",
        "Health made easy-order your essentials today!",
        "Because your well-being matters--safe and secure shopping"
    ];



    const [register, setRegister] = useState({
        fullname: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
    });
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
            color: '#1DA1F2'
        },
        {
            icon3: <FaApple />,
            color: '#000000',
        },
    ]

    const handleChange = (event) => {
        const { name, value } = event.target;
        setRegister({
            ...register,
            [name]: value,
        });
    }

    const smallCustomStyles = `.custom-placeholder::placeholder {
        color: #FFFFFF;
        opacity: 1;
    }`;

    const largeCustomStyles = `.custom-placeholder::placeholder {
        color: #FFFFFF;
        opacity: 1;
    }`;

    const handleSubmit = async (event) => {
        setIsLoading(true);
        event.preventDefault();
        if (small && Validator.isEmpty(register.fullname)) {
            setIsLoading(false);
            popup.errorPopup({ msg: "Oops! Full name can't be empty.", color: "#dc3545", popupIcon: "error" });
        } else if (!small && Validator.isEmpty(register.firstname)) {
            setIsLoading(false);
            popup.errorPopup({ msg: "Oops! First name can't be empty.", color: "#dc3545", popupIcon: "error" });
        } else if (!small && Validator.isEmpty(register.lastname)) {
            setIsLoading(false);
            popup.errorPopup({ msg: "Oops! Last name can't be empty.", color: "#dc3545", popupIcon: "error" });
        } else if (Validator.isEmpty(register.email)) {
            setIsLoading(false);
            popup.errorPopup({ msg: "We'll need your email to continue.", color: "#dc3545", popupIcon: "error" });
        } else if (Validator.isEmpty(register.password)) {
            setIsLoading(false);
            popup.errorPopup({ msg: "Don't forget your password.", color: "#dc3545", popupIcon: "error" });
        } else if (!Validator.isEmail(register.email)) {
            setIsLoading(false);
            popup.errorPopup({ msg: "Enter a valid email (e.g.,name@example.com).", color: "#dc3545", popupIcon: "error" });
        } else if (!Validator.isStrongPassword(register.password)) {
            setIsLoading(false);
            popup.errorPopup({ msg: "Password must be at least 8 characters long, include uppercase, lowercase, a number, and a special character.", setIsLoading, color: "#dc3545", popupIcon: "error" });
        } else {
            setTimeout(() => {
                popup.errorPopup({ msg: "Welcome aboard Your account is ready.", color: "#28a745", popupIcon: "success" });
                navigate("/");
            },3000);
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % word.length);
        }, 60000);

        return () => clearInterval(interval);
    });

    useEffect(() => {
        const handleResize = () => {
            setSmall(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    })

    const registerForm = () => (
        <>
            <div className='m-0 p-0 d-none d-md-flex flex-column w-100'>
                <p className='m-0 p-0 w-100 text-center text-light fs-5 fs-md-4 fs-lg-3 fw-bolder'>Hey there! Welcome to ayurVitaCare</p>
                <p className='mt-2 mb-0 p-0 text-light text-center w-100'>{word[index]}</p>
            </div>
            <Form className='p-0 m-0 flex-column' onSubmit={(event) => handleSubmit(event)}>
                <div className='w-100 p-0 d-flex d-md-none m-0 mt-md-4'>
                    <style>{small ? smallCustomStyles : largeCustomStyles}</style>
                    <Form.Group className='w-100 m-0 p-0 border-0'>
                        <InputGroup className='rounded-2' style={{ border: `2px solid #FFFFFF` }}>
                            <InputGroup.Text style={{ marginLeft: '0px', border: 'none', borderRadius: '0px', color: '#FFFFFF', background: 'rgba(255, 255, 255,0.1', outline: 'none', boxShadow: 'none' }}><FaUserCircle /></InputGroup.Text>
                            <Form.Control
                                type={"text"}
                                placeholder='Full Name'
                                name='fullname'
                                value={register.fullname}
                                onChange={(event) => handleChange(event)}
                                maxLength={400}
                                className='fw-bolder custom-placeholder'
                                style={{ marginLeft: '0px', border: 'none', boxShadow: 'none', outline: 'none', background: 'rgba(255, 255, 255,0.1)', color: '#FFFFFF' }} />
                        </InputGroup>
                    </Form.Group>
                </div>
                <div className='w-100 p-0 d-none d-md-flex gap-2 mt-4'>
                    <style>{small ? smallCustomStyles : largeCustomStyles}</style>
                    <Form.Group className='w-100 m-0 p-0 border-0'>
                        <InputGroup className='rounded-2' style={{ border: `2px solid #FFFFFF` }}>
                            <InputGroup.Text style={{ marginLeft: '0px', border: 'none', borderRadius: '0px', color: '#FFFFFF', background: 'rgba(255, 255, 255,0.1', outline: 'none', boxShadow: 'none' }}><FaUserCircle /></InputGroup.Text>
                            <Form.Control
                                type={"text"}
                                placeholder='First Name'
                                name='firstname'
                                value={register.firstname}
                                onChange={(event) => handleChange(event)}
                                maxLength={400}
                                className='fw-bolder custom-placeholder'
                                style={{ marginLeft: '0px', border: 'none', boxShadow: 'none', outline: 'none', background: 'rgba(255, 255, 255,0.1)', color: '#FFFFFF' }} />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group className='w-100 m-0 p-0 border-0 d-md-flex'>
                        <InputGroup className='rounded-2' style={{ border: `2px solid #FFFFFF` }}>
                            <InputGroup.Text style={{ marginLeft: '0px', border: 'none', background: 'rgba(255, 255, 255, 0.1)', color: '#FFFFFF' }}><FaUserCircle /></InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder='Last Name'
                                name='lastname'
                                value={register.lastname}
                                onChange={(event) => handleChange(event)}
                                maxLength={30}
                                className='fw-bolder custom-placeholder'
                                style={{ marginLeft: '0px', border: 'none', boxShadow: 'none', outline: 'none', background: 'rgba(255, 255, 255, 0.1)', color: '#FFFFFF' }} />
                        </InputGroup>
                    </Form.Group>
                </div>
                <div className='flex-row m-0 p-0 gap-2'>
                    <Form.Group className='w-100 m-0 p-0 border-0 mt-4'>
                        <InputGroup className='rounded-2' style={{ border: `2px solid #FFFFFF` }}>
                            <InputGroup.Text style={{ marginLeft: '0px', border: 'none', background: 'rgba(255, 255, 255, 0.1)', color: '#FFFFFF' }}><MdEmail /></InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder='Email'
                                name='email'
                                value={register.email}
                                onChange={(event) => handleChange(event)}
                                maxLength={200}
                                className='fw-bolder custom-placeholder'
                                style={{ marginLeft: '0px', border: 'none', boxShadow: 'none', outline: 'none', background: 'rgba(255, 255, 255, 0.1)', color: '#FFFFFF' }} />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group className='w-100 m-0 p-0 border-0 mt-4'>
                        <InputGroup className='rounded-2' style={{ border: `2px solid #FFFFFF` }}>
                            <InputGroup.Text style={{ marginLeft: '0px', border: 'none', background: 'rgba(255, 255, 255, 0.1)', color: '#FFFFFF' }}><IoIosLock /></InputGroup.Text>
                            <Form.Control
                                type={visible ? "text" : "password"}
                                placeholder='Password'
                                name='password'
                                value={register.password}
                                onChange={(event) => handleChange(event)}
                                maxLength={30}
                                className='fw-bolder custom-placeholder'
                                style={{ marginLeft: '0px', border: 'none', boxShadow: 'none', outline: 'none', background: 'rgba(255, 255, 255, 0.1)', color: '#FFFFFF' }} />
                            <InputGroup.Text style={{ marginLeft: '0px', border: 'none', background: 'rgba(255, 255, 255, 0.1)', color: '#FFFFFF' }}>{visible ? <FaEyeSlash onClick={() => setVisible(false)} style={{ cursor: "pointer" }} /> : <FaEye onClick={() => setVisible(true)} style={{ cursor: "pointer" }} />}</InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                    <Button className="w-100 mt-4 fw-bolder text-center border-0" id='registerButton' type='submit' style={{ color: small ? '#FFFFFF' : '#003569', backgroundColor: small ? '#003569' : '#FFFFFF' }}>{isLoading && <Spinner className="mx-2 p-0" size='sm' />}{isLoading ? "Creating..." : "Create account"}</Button>
                    <p className='w-100 text-center mt-3 mb-2 fw-bolder' style={{ color: small ? '#003569' : '#FFFFFF' }}>Continue With Those of One</p>
                    <div className='w-100 m-0 p-0 d-flex justify-content-center align-items-center gap-xl-5 gap-lg-4 gap-md-3'>
                        {socialIcons.map((value, index) => (
                            <Button className="m-0 p-2 d-flex fs-4 bg-transparent border-0" style={{ color: `${value.color}` }} key={index}>{value[`icon${index}`]}</Button>
                        ))}
                    </div>
                    <p className='m-0 p-0 gap-3 mt-1 text-center' style={{ color: small ? '#003569' : '#FFFFFF' }}>Already have an account? <Link className='fw-bolder text-decoration-none' style={{ color: small ? '#003569' : '#FFFFFF' }} to="/"> login</Link></p>
                </div>
            </Form>
        </>
    );

    return (
        <>
            <Helmet>
                <title>Login</title>
                <meta name="description" content="Only the best when you choose products offered on our platform - high quality
ingredients for high quality products!"/>
                <meta name="keywords" content="medical,medicine,tablet,hospital products,hospital,hospitals,vitamin,weight less,minerals" />
            </Helmet>
            <Row className='m-0 p-md-5 p-0 d-flex w-100'>
                <Col className='m-0 p-0 d-flex justify-content-md-center align-items-md-cente' xxl={6} xl={6} lg={6} md={6} sm={12} xs={12}>
                    <div className='position-relative w-100 d-flex d-md-none flex-column'>
                        <div className="w-100 m-0 p-0 d-flex align-items-center justify-content-start flex-column" style={{ height: '62%', borderBottomLeftRadius: '30%', borderBottomRightRadius: '30%', position: 'absolute', zIndex: 1, backgroundImage: `url(${heartImage})`, backgroundPosition: `center`, backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat' }}>
                            <p className='m-0 p-0 fs-4 text-center text-light fw-bolder mt-5'>Welcome to AyurVitaCare</p>
                            <p className='m-0 p-0 fs-6 text-center text-light fw-bolder'>Your journey to natural healing and wellness begins here!</p>
                        </div>
                        <div className='m-0 p-4 d-flex align-items-center d-md-none w-100' style={{ zIndex: 2, position: 'absolute', bottom: '10%' }}>
                            <div className='m-0 p-0 d-flex flex-column w-100 h-100 justify-content-center align-items-center p-4' style={{ color: "#003569", backgroundColor: "rgba(255, 255, 255, 0.1)", backdropFilter: "blur(10px)", border: '3px solid #727272', borderRadius: '35px' }}>
                                {registerForm()}
                            </div>
                        </div>
                    </div>
                    <div className='flex-column d-none d-md-flex m-0 p-0 w-100 h-100 px-5 align-items-center justify-content-center' style={{ color: '#FFFFFF', backgroundColor: "#003569", border: '3px solid #727272', borderRadius: "15px", borderTopRightRadius: '0', borderBottomRightRadius: '0', borderRight: "none" }} >
                        {registerForm()}
                    </div>
                </Col>
                <Col className='d-none d-md-flex m-0 p-0 justify-content-center align-items-center h-100 bg-transparent' xxl={6} xl={6} lg={6} md={6}>
                    <div className='m-0 p-0 d-flex justify-content-start w-100 align-items-center h-100' style={{ backgroundColor: "#003569", backgroundImage: `url(${heartImage})`, backgroundPosition: "right", backgroundSize: "96% 100%", backgroundRepeat: "no-repeat", border: '3px solid #727272', borderRadius: "15px", borderTopLeftRadius: '0', borderBottomLeftRadius: '0', borderLeft: "none" }}>
                        <img className="img-fluid h-100" src={registerWave} alt='register-wave' />
                    </div>
                </Col>
            </Row>
        </>
    );
};
export default Register;