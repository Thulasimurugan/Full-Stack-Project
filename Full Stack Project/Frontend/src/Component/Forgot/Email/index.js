import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Axios from 'axios';
import Validator from 'validator';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Row, Col, Button, Form, InputGroup, Spinner } from "react-bootstrap";
import { FaEye, FaEyeSlash, FaUserCircle, FaApple, FaGoogle } from 'react-icons/fa';
import { GrUserWorker } from 'react-icons/gr';
import { popup } from '../../Popup';
import { MdEmail } from 'react-icons/md';
import { IoIosLock } from 'react-icons/io';
import heartImage from '../../../Assets/Images/heart.jpeg';
import forgotBackground from "../../../Assets/Images/heartForgot.jpeg";
import Image1 from '../../../Assets/Images/product-8-400x400.png.png';


function Register({ showComponent, setShowComponent }) {
    const [visible, setVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [small, setSmall] = useState(window.innerWidth < 768)
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const [forgot, setForgot] = useState({
        email: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForgot({
            ...forgot,
            [name]: value,
        });
    }

    const customStyles = `.custom-placeholder::placeholder {
        color: #003569;
        opacity: 1;
    }`;

    // const handleSubmit = async (event) => {

    //     if (Validator.isEmpty(forgot.email)) {
    //         setIsLoading(false);
    //         popup.errorPopup({ msg: "We'll need your email to continue.", color: "#dc3545", popupIcon: "error" });
    //     } else if (!Validator.isEmail(forgot.email)) {
    //         setIsLoading(false);
    //         popup.errorPopup({ msg: "Enter a valid email (e.g.,name@example.com).", color: "#dc3545", popupIcon: "error" });
    //     } else {
    //         event.preventDefault();
    //         const trimObject = Object.fromEntries(
    //             Object.entries(forgot).map(([key, value]) => ([key, key === "email" ? value.toLowerCase() : value || typeof value === 'string' ? value.trim() : value]))
    //         );
    //         try {
    //             const emailResponce = await Axios.post('http://127.0.0.1:5000/vitamins/verifyEmail', trimObject);
    //             console.log(emailResponce);
    //             if (emailResponce.data.status === 200) {
    //                 setShowComponent(1);
    //                 localStorage.setItem('showComponent', showComponent);
    //                 localStorage.setItem("email", emailResponce.data.userData[0].email);
    //                 const emailButton = document.getElementById('emailButton');
    //                 emailButton.textContent = "OTP Sending....";
    //                 emailButton.setAttribute('disabled', 'true');
    //             } else if (emailResponce.data?.arMissField) {
    //                 const Toast = Swal.mixin({
    //                     toast: true,
    //                     position: 'top-end',
    //                     showCancelButton: false,
    //                     showConfirmButton: false,
    //                     timer: 4000,
    //                     timerProgressBar: true,
    //                     didOpen: (toast) => {
    //                         const timerProgressBar = document.querySelector('.swal2-timer-progress-bar');
    //                         if (timerProgressBar) {
    //                             timerProgressBar.style.backgroundColor = '#ff6347';
    //                         }
    //                         toast.onmouseenter = Swal.stopTimer;
    //                         toast.onmouseleave = Swal.resumeTimer;
    //                     }
    //                 });
    //                 Toast.fire({
    //                     icon: 'error',
    //                     title: `${emailResponce.data.arMissField[0]} is Required`,
    //                 });
    //             } else {
    //                 const Toast = Swal.mixin({
    //                     toast: true,
    //                     position: 'top-end',
    //                     showCancelButton: false,
    //                     showConfirmButton: false,
    //                     timer: 4000,
    //                     timerProgressBar: true,
    //                     didOpen: (toast) => {
    //                         const timerProgressBar = document.querySelector('.swal2-timer-progress-bar');
    //                         if (timerProgressBar) {
    //                             timerProgressBar.style.backgroundColor = '#ff6347';
    //                         }
    //                         toast.onmouseenter = Swal.stopTimer;
    //                         toast.onmouseleave = Swal.resumeTimer;
    //                     }
    //                 });
    //                 Toast.fire({
    //                     icon: 'error',
    //                     title: `${emailResponce.data.msg}`,
    //                 });
    //             }
    //         } catch (error) {
    //             if (error.message) {
    //                 const Toast = Swal.mixin({
    //                     toast: true,
    //                     position: 'top-end',
    //                     showCancelButton: false,
    //                     showConfirmButton: false,
    //                     timer: 4000,
    //                     timerProgressBar: true,
    //                     didOpen: (toast) => {
    //                         const timerProgressBar = document.querySelector('.swal2-timer-progress-bar');
    //                         if (timerProgressBar) {
    //                             timerProgressBar.style.backgroundColor = '#ff6347';
    //                         }
    //                         toast.onmouseenter = Swal.stopTimer;
    //                         toast.onmouseleave = Swal.resumeTimer;
    //                     }
    //                 });
    //                 Toast.fire({
    //                     icon: 'error',
    //                     title: `Refresh this page Try again.`,
    //                 });
    //             }
    //         }
    //     };
    // }

    const handleSubmit = async (event) => {
        setIsLoading(true);
        event.preventDefault();
        if (Validator.isEmpty(forgot.email)) {
            setIsLoading(false);
            popup.errorPopup({ msg: "We'll need your email to continue.", color: "#dc3545", popupIcon: "error" });
        } else if (!Validator.isEmail(forgot.email)) {
            setIsLoading(false);
            popup.errorPopup({ msg: "Enter a valid email (e.g.,name@example.com).", color: "#dc3545", popupIcon: "error" });
        } else {
            popup.errorPopup({ msg: "Success! We've sent a 6-digit code to your email.", color: "#28a745", popupIcon: "success" });
            setShowComponent(1);
        };
    };

    const forgotForm = () => (
        <>
            <h2 className='m-0 p-0 w-100 d-flex fw-bolder' style={{ color: small ? "#003569" : "#FFFFFF" }}>Reset Password</h2>
            <p className='p-0 mt-2 d-flex fw-bolder' style={{ color: small ? "#003569" : "#FFFFFF" }}>Enter the email associated with your account and we'll send an email with OTP to reset your password.</p>
            <Form className='p-0 m-0 flex-column' onSubmit={(event) => handleSubmit(event)}>
                <div className='m-0 p-0 w-75 d-block'>
                    <style>{customStyles}</style>
                    <Form.Group className='w-100 m-0 p-0 border-0'>
                        <Form.Label style={{ color: small ? "#003569" : "#FFFFFF" }} className='m-0 p-0 fw-bolder'>Email <span className='fw-bolder m-0 p-0' style={{ color: "red" }}>*</span></Form.Label>
                        <InputGroup className='rounded-2 mt-1 mb-0' style={{ border: `2px solid ${small ? "#003569" : "#FFFFFF"}` }}>
                            <InputGroup.Text style={{ marginLeft: '0px', border: 'none', borderRadius: '0px', color: small ? "#003569" : "#FFFFFF", background: 'rgba(255, 255, 255,0.1', outline: 'none', boxShadow: 'none' }}><MdEmail /></InputGroup.Text>
                            <Form.Control
                                type={"text"}
                                placeholder='Email'
                                name='email'
                                value={forgot.email}
                                onChange={(event) => handleChange(event)}
                                maxLength={400}
                                className='fw-bolder custom-placeholder'
                                style={{ marginLeft: '0px', border: 'none', boxShadow: 'none', outline: 'none', background: 'rgba(255, 255, 255,0.1)', color: small ? "#003569" : "#FFFFFF"}} />
                        </InputGroup>
                    </Form.Group>
                    <p className='my-3 p-0 gap-3 fw-bolder'><Link style={{ color: small ? "#003569" : "#FFFFFF" }} to={'/'}>Wait, I remember my password.</Link></p>
                    <Button className="w-100 fw-bolder text-center border-0" id="emailButton" type='submit' style={{ color: small ?  "#FFFFFF" : "#003569" , background: small ?  "#003569" : "#FFFFFF"}}>{isLoading ? <><Spinner size='sm' className='mx-2 p-0' /> Sending...</> : "Send OTP"}</Button>
                </div>
            </Form>
        </>
    );

    useEffect(() => {

        const handleResize = () => {
            setSmall(window.innerWidth < 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    })

    return (
        <>
            <Helmet>
                <title>Reset Password</title>
                <meta name="description" content="Only the best when you choose products offered on our platform - high quality
ingredients for high quality products!"/>
                <meta name="keywords" content="medical,medicine,tablet,hospital products,hospital,hospitals,vitamin,weight less,minerals" />
            </Helmet>
            {/* <Row className='m-0 px-5 bg-danger w-100 h-100 d-flex'>
                <Col className='w-100 h-100 m-0 d-flex justify-content-md-center align-items-md-center align-items-start justify-content-start p-0 py-md-5'>
                    <div className='w-100 m-0 p-0 flex-grow align-items-xl-center justify-content-xl-center rounded-2' style={{ borderColor: '#727272', background: '#17414F', borderRadius: '10px' }}>
                        <Row className='d-flex w-100 h-100 m-0 p-0'>
                            <Col className='m-0 d-xl-flex d-xl-flex d-lg-flex d-md-flex d-sm-none d-none' style={{ padding: '12px' }}>
                                <div className='m-0 p-0 w-100 rounded-2 d-flex' style={{ backgroundImage: `url(${heartImage})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: '100% 100%' }}>
                                    <div className='m-0 p-3 d-flex align-items-start justify-content-start gap-2 w-50'>
                                        <img src={Image1} alt='Image1' className='img-fluid' style={{ height: '35px', width: '35px', borderRadius: '50%', border: '3px solid #17414F' }} />
                                        <h5 style={{ color: '#FFFFFF' }} className='m-0 p-0 fw-bolder mt-1 mb-1'>Vitamins</h5>
                                    </div>
                                </div>
                            </Col>
                            <Col className='d-flex p-0 p-md-5 m-0 align-items-md-center justify-content-md-center align-items-start'>
                                <div className='flex-column m-0 p-0 w-100 p-xl-5 d-none d-md-flex'>
                                    {forgotForm()}
                                </div>
                                <div className='min-vh-100 w-100 d-flex justify-content-start align-items-end d-md-none m-0 p-4' style={{ backgroundImage: `url(${forgotBackground})`, backgroundPosition: 'center', backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat'}}>
                                    <div className='m-0 p-4 rounded-5' style={{ border: '3px solid #727272', backgroundColor: "rgba(255, 255, 255, 0.1)", backdropFilter: "blur(10px)"}}>
                                        {forgotForm()}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row> */}
            <Row className='m-0 p-md-5 d-flex w-100'>
                <Col className='m-0 p-0 d-none d-md-flex ' xxl={7} xl={7} lg={7} md={7} style={{ backgroundColor: '#003569', border: '3px solid #727272', borderRight: 'None', borderTopLeftRadius: '25px', borderBottomLeftRadius: '25px' }} >
                    <div className='p-0 m-2 d-flex'>
                        <img className="m-0 p-0 img-fluid" style={{ borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px' }} src={forgotBackground} alt='heart-image' />
                    </div>
                </Col>
                <Col className='m-0 p-0 d-flex align-items-center justify-content-center bg-warning' xxl={5} xl={5} lg={5} md={5} style={{ backgroundColor: '#003569', border: '3px solid #727272', borderLeft: 'None', borderTopRightRadius: '25px', borderBottomRightRadius: '25px' }} >
                    <div className='flex-column m-0 p-0 w-100 p-md-5 d-none d-md-flex'>
                        {forgotForm()}
                    </div>
                    <div className='min-vh-100 w-100 d-flex justify-content-start align-items-end d-md-none m-0 p-4' style={{ backgroundImage: `url(${forgotBackground})`, backgroundPosition: 'center', backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat' }}>
                        <div className='m-0 p-4 rounded-5' style={{ border: '3px solid #727272', backgroundColor: "rgba(255, 255, 255, 0.1)", backdropFilter: "blur(10px)" }}>
                            {forgotForm()}
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    );
};
export default Register;