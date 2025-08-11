import React from 'react';
import { Helmet } from 'react-helmet';
import { useState } from 'react';
import Image1 from '../../Assets/Images/product-8-400x400.png.png';
import { FaHome, FaInstagram, FaTwitter, FaArrowRight } from "react-icons/fa";
import { TiSocialFacebook } from 'react-icons/ti';
import Swal from 'sweetalert2'; 
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useNavigate } from 'react-router-dom';
import Validator from 'validator';
import { Row, Button, Col, Form } from 'react-bootstrap';

function Contact() {
    const navigate = useNavigate();
    const [messageCount, setMessageCount] = useState('');
    const [contact, setContact] = useState({
        username:'',
        email:'',
        phone:'',
        message:'',
    });


    const handleChange = (event) => {
        const {name, value} = event.target;
        setContact({
            ...contact,
            [name]: value,
        })
    }

    const handlePhoneChange = (value, data) => {
        const dialCode = data.dialCode;
        const number = value.startsWith(dialCode) ? value.slice(dialCode.length).trim() : value;
        setContact((contact) => ({...contact, phone: data.dialCode + ' ' + number}));
    }

    const handleSubmit = (event) => { 
        if(Validator.isEmpty(contact.username)) {
            event.preventDefault();
            const Toast = Swal.mixin({
                toast:true,
                position:"top-end",
                showConfirmButton:false,
                timerProgressBar:true,
                timer:3000,
                didOpen:(toast) => {
                    const timerProgressBar = document.querySelector('.swal2-timer-progress-bar');
                    if(timerProgressBar){
                        timerProgressBar.style.backgroundColor = '#ff6347';
                    }
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon:'error',
                title:'Name is Required',
            })
        } else if(Validator.isEmpty(contact.email)){
            event.preventDefault();
            const Toast = Swal.mixin({
                toast:true,
                position:'top-end',
                showConfirmButton:false,
                timerProgressBar:true,
                timer:3000,
                didOpen:(toast) => {
                    const timerProgressBar = document.querySelector('.swal2-timer-progress-bar');
                    if(timerProgressBar){
                        timerProgressBar.style.backgroundColor = '#ff6347';
                    }
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon:'error',
                title:'Email is Required',
            })
        } else if(!Validator.isEmail(contact.email)) {
            event.preventDefault();
            const Toast = Swal.mixin({
                toast:true,
                position:'top-end',
                showConfirmButton:false,
                timerProgressBar: true,
                timer:3000,
                didOpen : (toast) => {
                    const timerProgressBar = document.querySelector('.swal2-timer-progress-bar');
                    if(timerProgressBar) {
                        timerProgressBar.style.backgroundColor = '#ff6347';
                    };
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon:'error',
                title:'Enter a valid Email',
            })
        } else if (Validator.isEmpty(contact.phone)) {
            event.preventDefault();
            const Toast = Swal.mixin({
                toast:true,
                position:'top-end',
                showConfirmButton:false,
                timer:3000,
                timerProgressBar:true,
                didOpen: (toast) => {
                    const timerProgressBar = document.querySelector('.swal2-timer-progress-bar');
                    if(timerProgressBar){
                        timerProgressBar.style.backgroundColor = '#ff6347';
                    }
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
        });
        Toast.fire ({
            icon:'error',
            title:'Phone Number is Required',
        })
        } else if (Validator.isEmpty(contact.message)) {
            event.preventDefault();
            const Toast = Swal.mixin({
                toast:true,
                position:'top-end',
                showConfirmButton:false,
                timer:3000,
                timerProgressBar:true,
                didOpen: (toast) => {
                    const timerProgressBar = document.querySelector('.swal2-timer-progress-bar');
                    if(timerProgressBar){
                        timerProgressBar.style.backgroundColor = '#ff6347';
                    }
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon:'error',
                title:'Message is Required',
            });
        } else {
            event.preventDefault();
            const trimObject = Object.fromEntries(
                Object.entries(contact).map(([key,value]) => ([key,typeof value === 'string' ? value.trim() : value]))
            );
            Swal.fire({
                icon:'success',
                iconColor:'limegreen',
                title:'Are you sure send this details?',
                showCloseButton:true,
                showConfirmButton:true,
                confirmButtonText:'Yes',
                confirmButtonColor:'limegreen',
                cancelButtonText:'No',
                cancelButtonColor:'red',
                showCancelButton:true,
                reverseButtons:true,
            }).then((result) => {
                if(result.isConfirmed){
                    const Toast = Swal.mixin({
                        toast:true,
                        position:'top-end',
                        showConfirmButton:false,
                        timer:3000,
                        timerProgressBar:true,
                    });
                    Toast.fire({
                        icon:'success',
                        iconColor:'limegreen',
                        titleText:'Details sended contact you soon',
                    });
                    setContact({username:'',email:'',phone:'',message:''});
                    setMessageCount('');
                }
                if(result.isDenied){
                    event.preventDefault();
                }
            });
        };
    }

    return(
        <>
        <Helmet>
          <title>Contact</title>
          <meta name="description" content="Only the best when you choose products offered on our platform - high quality
ingredients for high quality products!"/>
          <meta name="keywords" content="medical,medicine,tablet,hospital products,hospital,hospitals,vitamin,weight less,minerals"/>
        </Helmet>
            <Row className='m-0 p-0 d-flex mt-5 px-5'>
                <Col className='m-0 p-0 d-flex px-md-0 px-sm-0 px-0 px-md-2' xxl={11} xl={11} lg={11} md={11} sm={10} xs={10}>
                    <div className='w-100 m-0 p-0 flex-column'>
                        <p className='m-0 p-0 d-flex'>Get Started</p>
                        <p className='m-0 p-0  display-2 fw-bolder d-flex'>Get in touch with us.</p>
                        <p className='m-0 p-0 display-2 fw-bolder'>We're here to assist you.</p>
                    </div>
                </Col>
                <Col className='m-0 p-0 d-flex justify-content-end justify-content-sm-end px-md-2' xxl={1} xl={1} lg={1} md={1} sm={2} xs={2}>
                    <div className='d-flex align-items-center m-0 p-0 h-100'>
                        <div className='m-0 p-0 flex-column'>
                            <div className='m-0 p-2 rounded-circle' style={{border:'1px solid #17414F',cursor:'pointer'}}>
                                <TiSocialFacebook style={{color:'#17414F'}} className='fs-5 d-flex'/>
                            </div>
                            <div className='m-0 p-2 rounded-circle mt-4' style={{border:'1px solid #17414F',cursor:'pointer'}}>
                                <FaInstagram style={{color:'#17414F'}} className='fs-5 d-flex'/>
                            </div>
                            <div className='m-0 p-2 rounded-circle mt-4' style={{border:'1px solid #17414F',cursor:'pointer'}}>
                                <FaTwitter style={{color:'#17414F'}} className='fs-5 d-flex'/>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <Form className='m-0 p-0' onSubmit={(event) => handleSubmit(event)}>
            <Row className='d-flex m-0 p-0 mt-5 px-5'>
                <Col className='d-flex m-0 p-0 mt-3 mt-xl-5 mt-lg-5 mt-md-5 px-md-2' xl={4} lg={4} md={4}>
                    <Form.Group className='w-100 m-0 p-0 border-0'>
                        <Form.Label>Your Name <span style={{color:'red'}}>*</span></Form.Label>
                        <Form.Control 
                        type='text'
                        name='username'
                        maxLength={200}
                        value={contact.username}
                        onChange={(event) => handleChange(event)}
                        className="bg-transparent rounded-0" 
                        style={{borderTop:'none', borderLeft:'none',borderRight:'none',borderBottom:'3px solid #17414F',boxShadow:'none',outline:'none'}}/>
                    </Form.Group>
                </Col>
                <Col className='d-flex m-0 p-0 px-0 mt-3 mt-xl-5 mt-lg-5 mt-md-5 px-md-2' xl={4} lg={4} md={4}>
                    <Form.Group className='w-100 m-0 p-0 border-0'>
                        <Form.Label>Email Address <span style={{color:'red'}}>*</span></Form.Label>
                        <Form.Control 
                        type="text"
                        name='email'
                        maxLength={200}
                        value={contact.email}
                        onChange={(event) => handleChange(event)}
                        className="bg-transparent rounded-0" 
                        style={{borderTop:'none', borderLeft:'none',borderRight:'none',borderBottom:'3px solid #17414F',boxShadow:'none',outline:'none'}}/>
                    </Form.Group>
                </Col>
                <Col className='d-flex m-0 p-0 px-0 px-md-2 mt-3 mt-xl-5 mt-lg-5 mt-md-5' xl={4} lg={4} md={4}>
                    <Form.Group className='w-100 m-0 p-0 border-0'>
                        <Form.Label>Phone Number <span style={{color:'red'}}>*</span></Form.Label>
                        <div className='w-100 mt-1 m-0 p-0 d-flex'>
                        <PhoneInput 
                            country={'in'}
                            inputClass='w-100 bg-transparent rounded-0'
                            buttonClass='bg-transparent rounded-0'
                            placeholder = ''
                            disableDropdown
                            buttonStyle={{borderTop:'none', borderLeft:'none',borderRight:'none',borderBottom:'3px solid #17414F',boxShadow:'none',outline:'none'}}
                            inputStyle={{borderTop:'none', borderLeft:'none',borderRight:'none',borderBottom:'3px solid #17414F',boxShadow:'none',outline:'none'}}
                            value={contact.phone}
                            onChange={handlePhoneChange}
                        /> 
                        </div>
                    </Form.Group>
                </Col>
                <Col className='d-flex m-0 p-0 px-md-2 mt-3' xl={12} lg={12}>
                    <div className="flex-column w-100 m-0 p-0">
                        <Form.Group className='w-100 m-0 p-0 border-0'>
                            <Form.Label>Message <span style={{color:'red'}}>*</span></Form.Label>
                            <Form.Control
                            as="textarea"
                            rows={2}
                            maxLength={1000}
                            name='message'
                            value={contact.message}
                            onChange={(event) => {handleChange(event);setMessageCount(event.target.value)}}
                            className="bg-transparent rounded-0" 
                            style={{borderTop:'none', borderLeft:'none',borderRight:'none',borderBottom:'3px solid #17414F',boxShadow:'none',outline:'none',resize:'none',overflow:'hidden'}}/>
                        </Form.Group>
                        <p className='text-end m-0 p-0 fs-6 fw-bolder'  style={{color:'#727272'}}>Remaining message letter count: {1000 - messageCount.length}</p>
                    </div>
                </Col>
                <Col className='d-flex mt-4 m-0 p-0'>
                    <div className='d-flex justify-content-start m-0 p-0 px-md-2'>
                        <Button className='d-flex py-sm-2 px-sm-5 p-2 border-0 rounded-4 gap-2' type='submit' style={{background:'#17414F',color:'white'}}><span className='d-none d-sm-inline fw-bolder mb-1'>Leave us a Message</span><FaArrowRight className='fs-5 fs-sm-4 mt-xxl-1 mt-xl-1 mt-md-1 mt-sm-1'/></Button>
                    </div>
                </Col>
            </Row>
            </Form>
            <Row className='d-flex m-0 p-0 mt-5 px-5'>
                <Col className='d-flex m-0 p-0 px-md-2' xl={6} lg={6} md={12} sm={12} xs={12}>
                    <div className='w-100 m-0 p-0 flex-column'>
                        <p className='fs-6 m-0 p-0 w-100' style={{color:'#727272'}}>Contact Info</p>
                        <p className='m-0 p-0 w-100 display-4 fw-bolder'>We are always</p>
                        <p className='m-0 p-0 w-100 display-4 fw-bolder'>Happy to assist you</p>
                    </div>
                </Col>
                <Col className='d-flex m-0 p-0 mt-lg-0 mt-md-5 mt-sm-5 mt-5 px-md-2' xl={3} lg={3} md={6} sm={6} xs={12}>
                    <div className='m-0 p-0 w-100 flex-column mb-5'>
                        <p className='w-100 fs-6 fw-bolder m-0 p-0'>Email Address</p>
                        <p className='w-100 fs-6 fw-bolder m-0 p-0'>______</p>
                        <p className='w-100 fs-6 fw-bolder m-0 p-0 mt-3'>Bmthulasi51@gmail.com</p>
                        <p className='w-100 fs-6 m-0 p-0 mt-3' style={{color:'#727272'}}>Assitance hours:</p>
                        <p className='w-100 fs-6 m-0 p-0' style={{color:'#727272'}}>Monday - Friday 6 am to</p>
                        <p className='w-100 fs-6 m-0 p-0' style={{color:'#727272'}}>8 pm EST</p>
                    </div>
                </Col>
                <Col className='d-flex m-0 p-0 mt-lg-0 mt-md-5 mt-sm-5 px-md-2' xl={3} lg={3} md={6} sm={6} xs={12}>
                <div className='m-0 p-0 w-100 flex-column mb-5'>
                        <p className='w-100 fs-6 fw-bolder m-0 p-0'>Number</p>
                        <p className='w-100 fs-6 fw-bolder m-0 p-0'>______</p>
                        <p className='w-100 fs-6 fw-bolder m-0 p-0 mt-3'>+91 8807648750</p>
                        <p className='w-100 fs-6 m-0 p-0 mt-3' style={{color:'#727272'}}>Assitance hours:</p>
                        <p className='w-100 fs-6 m-0 p-0' style={{color:'#727272'}}>Monday - Friday 6 am to</p>
                        <p className='w-100 fs-6 m-0 p-0' style={{color:'#727272'}}>8 pm EST</p>
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default Contact;