import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Validator, { trim } from 'validator';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Button, Form, InputGroup, Spinner } from "react-bootstrap";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { popup } from '../../Popup';
import { IoIosLock } from 'react-icons/io';
import heartImage from '../../../Assets/Images/heartForgot.jpeg';
import heartBackground from "../../../Assets/Images/doctor.jpeg";
import { GiLindenLeaf, GiBrain } from 'react-icons/gi';


function ResetPassword({ showComponent, setShowComponent }) {
    const [show, setShow] = useState(false);
    const [small, setSmall] = useState(window.innerWidth < 768);
    const [isLoading, setIsLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();
    const [reset, setReset] = useState({
        password: '',
        confirmpassword: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setReset({
            ...reset,
            [name]: value,
        });
    }

    const customStyles = `.custom-placeholder::placeholder {
        color: ${small ? "#003569" : '#FFFFFF'};
        opacity: 1;
    }`;

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        if (Validator.isEmpty(reset.password)) {
            setIsLoading(false);
            popup.errorPopup({ msg: "Hmm... looks like you missed your password.", color: "#dc3545", popupIcon: "error" });
        } else if (Validator.isEmpty(reset.confirmpassword)) {
            setIsLoading(false);
            popup.errorPopup({ msg: "Hmm... looks like you missed your confirm password.", color: "#dc3545", popupIcon: "error" });
        } else if (!Validator.isStrongPassword(reset.password)) {
            setIsLoading(false);
            popup.errorPopup({ msg: "Password must be at least 8 characters long, include uppercase, lowercase, a number, and a special character.", color: "#dc3545", popupIcon: "error" });
        } else if (!Validator.isStrongPassword(reset.confirmpassword)) {
            setIsLoading(false);
            popup.errorPopup({ msg: "Confirm Password must be at least 8 characters long, include uppercase, lowercase, a number, and a special character.", color: "#dc3545", popupIcon: "error" });
        } else if (!Validator.equals(reset.password, reset.confirmpassword)) {
            setIsLoading(false);
            popup.errorPopup({ msg: "Oops! Password mismatch! Double check and try again.", color: "#dc3545", popupIcon: "error" });
        } else {
            setTimeout(() => {
                popup.errorPopup({ msg: "Yay! Your password has been changed successfully.", color: "#28a745", popupIcon: "success" });
                navigate("/");
            }, 3000);
        };
    };

    const handleVisible = () => {
        setVisible(!visible)
    }

    const handleShow = () => {
        setShow(!show);
    }

    useEffect(() => {
        const handleResize = () => {
            setSmall(window.innerWidth < 768);
        }
        window.addEventListener("resize", handleResize);
        return () => window.addEventListener("resize", handleResize);
    })

    const resetPasswordForm = () => (
        <>
            <h2 className='m-0 p-0 w-100 d-flex fw-bolder' style={{ color: small ? "#003569" : '#FFFFFF' }}>Let's Get You a Fresh Password</h2>
            <p className='mt-2 mt-md-3 mb-0 w-100 d-flex fw-bolder' style={{ color: small ? "#003569" : '#FFFFFF' }}>Your new password must be different From previous used password.</p>
            <Form className='p-0 m-0 flex-column mt-3 mt-md-4' onSubmit={(event) => handleSubmit(event)}>
                <div className='m-0 p-0 w-100'>
                    <style>{customStyles}</style>
                    <Form.Group className='w-100 m-0 p-0 border-0'>
                        <Form.Label className='m-0 p-0 fw-bolder' style={{ color: small ? "#003569" : "#FFFFFF" }}>Password <span className='fw-bolder m-0 p-0' style={{ color: 'red' }}>*</span></Form.Label>
                        <InputGroup className='rounded-2 mt-1' style={{ border: `2px solid ${small ? "#003569" : '#FFFFFF'}` }}>
                            <InputGroup.Text style={{ marginLeft: '0px', border: 'none', borderRadius: '0px', color: small ? "#003569" : '#FFFFFF', background: 'rgba(255, 255, 255,0.1', outline: 'none', boxShadow: 'none' }}><IoIosLock /></InputGroup.Text>
                            <Form.Control
                                type={show ? "text" : "password"}
                                placeholder='Password'
                                name='password'
                                value={reset.password}
                                onChange={(event) => handleChange(event)}
                                maxLength={30}
                                className='fw-bolder custom-placeholder'
                                style={{ marginLeft: '0px', border: 'none', boxShadow: 'none', outline: 'none', background: 'rgba(255, 255, 255,0.1)', color: small ? "#003569" : '#FFFFFF' }} />
                            <InputGroup.Text style={{ marginLeft: '0px', border: 'none', borderRadius: '0px', color: small ? "#003569" : '#FFFFFF', background: 'rgba(255, 255, 255,0.1', outline: 'none', boxShadow: 'none' }}>{show ? <FaEyeSlash style={{ cursor: 'pointer' }} onClick={() => handleShow()} /> : <FaEye style={{ cursor: 'pointer' }} onClick={() => handleShow()} />}</InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group className='w-100 m-0 p-0 border-0 mt-3 mt-md-4 mb-0 mb-md-1'>
                        <Form.Label className='m-0 p-0 fw-bolder' style={{ color: small ? "#003569" : "#FFFFFF" }}>Confirm Password <span className='fw-bolder m-0 p-0' style={{ color: 'red' }}>*</span></Form.Label>
                        <InputGroup className='rounded-2 mt-1' style={{ border: `2px solid ${small ? "#003569" : '#FFFFFF'}` }}>
                            <InputGroup.Text style={{ marginLeft: '0px', border: 'none', borderRadius: '0px', color: small ? "#003569" : "#FFFFFF", background: 'rgba(255, 255, 255,0.1', outline: 'none', boxShadow: 'none' }}><IoIosLock /></InputGroup.Text>
                            <Form.Control
                                type={visible ? "text" : "password"}
                                placeholder='Confirm Password'
                                name='confirmpassword'
                                value={reset.confirmpassword}
                                onChange={(event) => handleChange(event)}
                                maxLength={30}
                                className='fw-bolder custom-placeholder'
                                style={{ marginLeft: '0px', border: 'none', boxShadow: 'none', outline: 'none', background: 'rgba(255, 255, 255,0.1)', color: small ? "#003569" : '#FFFFFF' }} />
                            <InputGroup.Text style={{ marginLeft: '0px', border: 'none', borderRadius: '0px', color: small ? "#003569" : '#FFFFFF', background: 'rgba(255, 255, 255,0.1', outline: 'none', boxShadow: 'none' }}>{visible ? <FaEyeSlash style={{ cursor: 'pointer' }} onClick={() => handleVisible()} /> : <FaEye style={{ cursor: 'pointer' }} onClick={() => handleVisible()} />}</InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                    <Button className="w-100 mt-4 fw-bolder text-center border-0" id="changeButton" type='submit' disabled={isLoading ? true : false} style={{ color: small ? '#FFFFFF' : '#003569', background: small ? "#003569" : "#FFFFFF" }}>{isLoading ? <><Spinner size='sm' className='mx-1 p-0' />Almost done...</> : "Reset Password"}</Button>
                </div>
            </Form>
        </>
    );

    return (
        <>
            <Helmet>
                <title>Reset Password</title>
                <meta name="description" content="Only the best when you choose products offered on our platform - high quality
                ingredients for high quality products!"/>
                <meta name="keywords" content="medical,medicine,tablet,hospital products,hospital,hospitals,vitamin,weight less,minerals" />
            </Helmet>
            <Row className='m-0 p-0 d-flex w-100'>
                <Col className='m-0 p-0 d-none d-md-flex' xxl={7} xl={7} lg={7} md={6} style={{ backgroundColor: '#003569', border: '3px solid #727272', borderRight: 'None', borderTopLeftRadius: '25px', borderBottomLeftRadius: '25px' }} >
                    <div className='p-0 m-3 w-100 d-flex justify-content-center' style={{ position: 'relative' }}>
                        <img className="m-0 p-0 img-fluid w-100 h-100" style={{ borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px' }} src={heartImage} alt='heart-image' />
                        <div className='m-0 p-md-3 d-flex flex-column align-items-center justify-content-center' style={{ position: 'absolute', bottom: '5%', width: '95%', border: '3px solid #727272', borderRadius: '20px', backgroundColor: "rgba(255, 255, 255, 0.1)", backdropFilter: "blur(10px)" }}>
                            <p className='m-0 p-0 fw-bolder fs-4 w-75' style={{ color: '#003569'}}>Knowledge sharing and lifecycle guidence for holistic health</p>
                            <div className='d-flex mt-3 mb-0 p-0 gap-3 w-100'>
                                <div className='w-50 p-0 m-0 d-flex justify-content-start align-items-center overflow-hidden' style={{ border: "2px solid #003569", borderRadius: '20px' }}>
                                    <span className='m-0 fs-6 p-0 d-flex bg-light  h-100 align-items-center justify-content-center' style={{ width: "30%", borderRadius: '20px', color: '#003569' }}><GiLindenLeaf /></span>
                                    <p className='m-0 px-md-2 py-md-2 fw-bolder fs-6 w-100 text-center' style={{ color: '#003569' }}>Herbal Medicine</p>
                                </div>
                                <div className='w-50 p-0 m-0 d-flex justify-content-start align-items-center overflow-hidden' style={{ border: "2px solid #003569", borderRadius: '20px' }}>
                                    <span className='m-0 p-0 fs-6 d-flex bg-light h-100 align-items-center justify-content-center' style={{ width: "30%", borderRadius: '20px', color: '#003569' }}><GiBrain /></span>
                                    <p className='m-0 px-md-2 py-md-2 fw-bolder fs-6 text-center w-100' style={{ color: '#003569' }}>Mind-Body Wellness</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col className='m-0 p-0 d-flex h-100 align-items-center justify-content-center' xxl={5} xl={5} lg={5} md={6} >
                    <div className='flex-column h-100 m-0 p-0 w-100 px-md-4 py-md-5 d-none d-md-flex justify-content-center' style={{ backgroundColor: '#003569', border: '3px solid #727272', borderLeft: 'None', borderTopRightRadius: '25px', borderBottomRightRadius: '25px' }}>
                        {resetPasswordForm()}
                    </div>
                    <div className='min-vh-100 w-100 d-flex justify-content-start align-items-end d-md-none m-0 p-4' style={{ backgroundImage: `url(${heartBackground})`, backgroundPosition: 'center', backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat' }}>
                        <div className='m-0 p-4 rounded-5 w-100' style={{ border: '3px solid #727272', backgroundColor: "rgba(255, 255, 255, 0.1)", backdropFilter: "blur(10px)" }}>
                            {resetPasswordForm()}
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    );
};
export default ResetPassword;