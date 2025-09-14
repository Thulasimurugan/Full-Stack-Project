import { useState } from 'react';
import { Helmet } from 'react-helmet';
import Validator, { trim } from 'validator';
import Axios from "axios";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Row, Col, Button, Form, InputGroup, Spinner } from "react-bootstrap";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { popup } from '../../Popup';
import { IoIosLock } from 'react-icons/io';
import heartImage from '../../../Assets/Images/heartForgot.jpeg';
import { GiLindenLeaf, GiBrain } from 'react-icons/gi';


function ResetPassword({ showComponent, setShowComponent }) {
    const [show, setShow] = useState(false);
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
        color: #FFFFFF;
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

    const resetPasswordForm = () => (
        <>
            <h2 className='m-0 p-0 w-100 d-flex' style={{ color: '#FFFFFF' }}>Reset Password</h2>
            <div className='m-0 p-0 my-lg-3 my-md-3 my-sm-3 my-3 w-100'>
                <p className='m-0 p-0 mt-1 mt-xl-0 mt-sm-1 mt-lg-0 mt-md-0' style={{ color: '#FFFFFF' }}>Your new password must be different</p>
                <p className='m-0 p-0 mt-1 mt-xl-0 mt-sm-1 mt-lg-0 mt-md-0' style={{ color: '#FFFFFF' }}>From previous used password.</p>
            </div>
            <Form className='p-0 m-0 flex-column' onSubmit={(event) => handleSubmit(event)}>
                <div className='m-0 p-0 w-75'>
                    <style>{customStyles}</style>
                    <Form.Group className='w-100 m-0 p-0 border-0 my-xl-4'>
                        <Form.Label className='text-light'>Password <span className='fw-bolder m-0 p-0' style={{ color: '#FFFFFF' }}>*</span></Form.Label>
                        <InputGroup className='rounded-2' style={{ border: '2px solid #FFFFFF' }}>
                            <InputGroup.Text style={{ marginLeft: '0px', border: 'none', borderRadius: '0px', color: '#FFFFFF', background: 'rgba(255, 255, 255,0.1', outline: 'none', boxShadow: 'none' }}><IoIosLock /></InputGroup.Text>
                            <Form.Control
                                type={show ? "text" : "password"}
                                placeholder='Password'
                                name='password'
                                value={reset.password}
                                onChange={(event) => handleChange(event)}
                                maxLength={30}
                                className='fw-bolder custom-placeholder'
                                style={{ marginLeft: '0px', border: 'none', boxShadow: 'none', outline: 'none', background: 'rgba(255, 255, 255,0.1)', color: '#FFFFFF' }} />
                            <InputGroup.Text style={{ marginLeft: '0px', border: 'none', borderRadius: '0px', color: '#FFFFFF', background: 'rgba(255, 255, 255,0.1', outline: 'none', boxShadow: 'none' }}>{show ? <FaEyeSlash style={{ cursor: 'pointer' }} onClick={() => handleShow()} /> : <FaEye style={{ cursor: 'pointer' }} onClick={() => handleShow()} />}</InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group className='w-100 m-0 p-0 border-0 my-xl-4 mt-4 mb-2'>
                        <Form.Label className='text-light'>Confirm Password <span className='fw-bolder m-0 p-0' style={{ color: '#FFFFFF' }}>*</span></Form.Label>
                        <InputGroup className='rounded-2' style={{ border: '2px solid #FFFFFF' }}>
                            <InputGroup.Text style={{ marginLeft: '0px', border: 'none', borderRadius: '0px', color: '#FFFFFF', background: 'rgba(255, 255, 255,0.1', outline: 'none', boxShadow: 'none' }}><IoIosLock /></InputGroup.Text>
                            <Form.Control
                                type={visible ? "text" : "password"}
                                placeholder='Confirm Password'
                                name='confirmpassword'
                                value={reset.confirmpassword}
                                onChange={(event) => handleChange(event)}
                                maxLength={30}
                                className='fw-bolder custom-placeholder'
                                style={{ marginLeft: '0px', border: 'none', boxShadow: 'none', outline: 'none', background: 'rgba(255, 255, 255,0.1)', color: '#FFFFFF' }} />
                            <InputGroup.Text style={{ marginLeft: '0px', border: 'none', borderRadius: '0px', color: '#FFFFFF', background: 'rgba(255, 255, 255,0.1', outline: 'none', boxShadow: 'none' }}>{visible ? <FaEyeSlash style={{ cursor: 'pointer' }} onClick={() => handleVisible()} /> : <FaEye style={{ cursor: 'pointer' }} onClick={() => handleVisible()} />}</InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                    <Button className="bg-light w-100 mt-4 mt-md-4 mt-lg-4 mt-xl-4 mt-xxl-4 fw-bolder text-center border-0" id="changeButton" type='submit' style={{ color: '#17414F' }}>{isLoading ? <><Spinner size='sm' className='mx-2 p-0' />Almost done...</> : "Reset Password"}</Button>
                </div>
            </Form>
        </>
    )

    return (
        <>
            <Helmet>
                <title>Reset Password</title>
                <meta name="description" content="Only the best when you choose products offered on our platform - high quality
ingredients for high quality products!"/>
                <meta name="keywords" content="medical,medicine,tablet,hospital products,hospital,hospitals,vitamin,weight less,minerals" />
            </Helmet>
            <Row className='m-0 p-0 d-flex w-100 bg-danger'>
                <Col className='m-0 p-0 d-none d-md-flex' xxl={7} xl={7} lg={7} md={7} style={{ backgroundColor: '#003569', border: '3px solid #727272', borderRight: 'None', borderTopLeftRadius: '25px', borderBottomLeftRadius: '25px' }} >
                    <div className='p-0 m-3 w-100 d-flex justify-content-center' style={{ position: 'relative' }}>
                        <img className="m-0 p-0 img-fluid w-100 h-100" style={{ borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px' }} src={heartImage} alt='heart-image' />
                        <div className='m-0 p-0 py-3 d-flex flex-column align-items-center justify-content-center' style={{ position: 'absolute', bottom: '5%', width: '95%', border: '3px solid #727272', borderRadius: '20px', backgroundColor: "rgba(255, 255, 255, 0.1)", backdropFilter: "blur(10px)" }}>
                            <p className='m-0 p-0 text-light fw-bolder fs-4 w-75'>Knowledge sharing and lifecycle guidence for holistic health</p>
                            <div className='d-flex mt-3 mb-0 p-0 gap-3' style={{ width: '70%' }}>
                                <div className='w-50 p-0 m-0 d-flex justify-content-start align-items-center overflow-hidden' style={{ border: "2px solid #FFFFFF", borderRadius: '20px' }}>
                                    <span className='m-0 fs-6 p-0 d-flex bg-light  h-100 align-items-center justify-content-center' style={{ width: "30%", borderRadius: '20px', color: '#003569' }}><GiLindenLeaf /></span>
                                    <p className='m-0 px-md-2 py-md-2 fw-bolder fs-6 w-100 text-center' style={{ color: '#003569' }}>Herbal Medicine</p>
                                </div>
                                <div className='w-50 p-0 m-0 d-flex justify-content-start align-items-center overflow-hidden' style={{ border: "2px solid #FFFFFF", borderRadius: '20px' }}>
                                    <span className='m-0 p-0 fs-6 d-flex bg-light h-100 align-items-center justify-content-center' style={{ width: "30%", borderRadius: '20px', color: '#003569' }}><GiBrain /></span>
                                    <p className='m-0 px-md-2 py-md-2 fw-bolder fs-6 text-center w-100' style={{ color: '#003569' }}>Mind-Body Wellness</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col className='m-0 p-0 d-flex h-100 align-items-center justify-content-center' xxl={5} xl={5} lg={5} md={5} >
                    <div className='flex-column h-100 m-0 p-0 w-100 px-md-4 px-lg-5 py-md-5 d-none d-md-flex justify-content-center' style={{ backgroundColor: '#003569', border: '3px solid #727272', borderLeft: 'None', borderTopRightRadius: '25px', borderBottomRightRadius: '25px' }}>
                        {resetPasswordForm()}
                    </div>
                    <div className='min-vh-100 w-100 d-flex justify-content-start align-items-end d-md-none m-0 p-4' style={{ backgroundImage: `url(${heartImage})`, backgroundPosition: 'center', backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat' }}>
                        <div className='m-0 p-4 rounded-5' style={{ border: '3px solid #727272', backgroundColor: "rgba(255, 255, 255, 0.1)", backdropFilter: "blur(10px)" }}>
                            {resetPasswordForm()}
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    );
};
export default ResetPassword;