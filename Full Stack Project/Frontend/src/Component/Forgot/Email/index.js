import { useState } from 'react';
import { Helmet } from 'react-helmet';
import Axios from 'axios';
import Validator from 'validator';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Row, Col, Button, Form, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash, FaUserCircle, FaApple ,FaGoogle } from 'react-icons/fa';
import { GrUserWorker } from 'react-icons/gr';
import { MdEmail } from 'react-icons/md';
import { IoIosLock } from 'react-icons/io';
import heartImage  from '../../../Assets/Images/heart.jpeg';
import Image1 from '../../../Assets/Images/product-8-400x400.png.png';


function Register({showComponent, setShowComponent}) {
    const [ visible, setVisible ] = useState(false);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const [ forgot, setForgot ] = useState({
        email:'',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForgot({
            ...forgot,
            [name]: value,
        });
    }

    const customStyles = `.custom-placeholder::placeholder {
        color: #FFFFFF;
        opacity: 1;
    }`;

    const handleSubmit = async (event) => {
        if(Validator.isEmpty(forgot.email)) {
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
                title:'Email is Required',
            })
        } else if(!Validator.isEmail(forgot.email)) {
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
                title:'Enter a Valid Email',
            })
        } else {
            event.preventDefault();
            const trimObject = Object.fromEntries(
                Object.entries(forgot).map(([key,value]) => ([key,key === "email" ?  value.toLowerCase() : value || typeof value === 'string' ? value.trim() : value]))
            );
            try{
                const emailResponce = await Axios.post('http://127.0.0.1:5000/vitamins/verifyEmail',trimObject);
                console.log(emailResponce);
                if(emailResponce.data.status === 200){
                        setShowComponent(1);
                        localStorage.setItem('showComponent', showComponent);
                        localStorage.setItem("email", emailResponce.data.userData[0].email);
                        const emailButton = document.getElementById('emailButton');
                        emailButton.textContent = "OTP Sending....";
                        emailButton.setAttribute('disabled','true');
                        const Toast = Swal.mixin({
                            toast: true,
                            position:'top-end',
                            showCancelButton:false,
                            showConfirmButton:false,
                            timer:4000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                const timerProgressBar = document.querySelector('.swal2-timer-progress-bar');
                                if(timerProgressBar){
                                    timerProgressBar.style.backgroundColor = 'limegreen';
                                }
                                toast.onmouseenter = Swal.stopTimer;
                                toast.onmouseleave = Swal.resumeTimer;
                            }
                        });
                        Toast.fire({
                            icon:'success',
                            title:`Email Verified Successfully We were sended otp at your email`,
                        });
                    } else if(emailResponce.data?.arMissField) {
                        const Toast = Swal.mixin({
                            toast: true,
                            position:'top-end',
                            showCancelButton:false,
                            showConfirmButton:false,
                            timer:4000,
                            timerProgressBar: true,
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
                            title:`${emailResponce.data.arMissField[0]} is Required`,
                        });
                    } else {
                        const Toast = Swal.mixin({
                            toast: true,
                            position:'top-end',
                            showCancelButton:false,
                            showConfirmButton:false,
                            timer:4000,
                            timerProgressBar: true,
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
                            title:`${emailResponce.data.msg}`,
                        });
                    }
            } catch(error){
                if(error.message){
                    const Toast = Swal.mixin({
                        toast: true,
                        position:'top-end',
                        showCancelButton:false,
                        showConfirmButton:false,
                        timer:4000,
                        timerProgressBar: true,
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
                        title:`Refresh this page Try again.`,
                    });
                }
            }
        };
    }

    return (
        <>
        <Helmet>
          <title>Reset Password</title>
          <meta name="description" content="Only the best when you choose products offered on our platform - high quality
ingredients for high quality products!"/>
          <meta name="keywords" content="medical,medicine,tablet,hospital products,hospital,hospitals,vitamin,weight less,minerals"/>
        </Helmet>
        <Row className='m-0 p-0 w-100 h-100 d-flex' style={{background: "#E2F5FB"}}>
            <Col className='w-100 h-100 m-0 d-flex justify-content-center align-items-center px-3 py-3 py-sm-3 py-sm-3 py-md-5 px-md-5 py-lg-5 py-xl-4 py-xxl-5'>
                <div className='w-100 m-0 p-0 flex-grow align-items-xl-center justify-content-xl-center rounded-2' style={{borderColor:'#727272', background:'#17414F',borderRadius:'10px'}}>
                    <Row className='d-flex w-100 h-100 m-0 p-0'>
                        <Col className='m-0 d-xl-flex d-xl-flex d-lg-flex d-md-flex d-sm-none d-none' style={{padding:'12px'}}>
                            <div className='m-0 p-0 w-100 rounded-2 d-flex' style={{backgroundImage:`url(${heartImage})`,backgroundRepeat:'no-repeat',backgroundPosition:'center',backgroundSize:'100% 100%'}}>
                            <div className='m-0 p-3 d-flex align-items-start justify-content-start gap-2 w-50'>
                                <img src={Image1} alt='Image1' className='img-fluid' style={{height:'35px', width:'35px',borderRadius:'50%',border:'3px solid #17414F'}}/>
                                <h5 style={{color:'#FFFFFF'}} className='m-0 p-0 fw-bolder mt-1 mb-1'>Vitamins</h5>
                            </div>
                            </div>
                        </Col>
                        <Col className='d-flex p-5 m-0 align-items-center justify-content-center'>
                            <div className='flex-column m-0 p-0 w-100 p-xl-5'>
                                <h2 className='m-0 p-0 w-100 d-flex' style={{color:'#FFFFFF'}}>Reset Password</h2>
                                <div className='m-0 p-0 my-xxl-3 my-lg-3 my-md-3 my-sm-3 my-3 w-100'>
                                    <p className='m-0 p-0 mt-1 mt-xl-0 mt-sm-1 mt-lg-0 mt-md-0' style={{color:'#FFFFFF'}}>Enter the email associated with your account and we'll send an email with OTP to reset your password.</p>
                                </div>
                                <Form className='p-0 m-0 flex-column' onSubmit={(event) => handleSubmit(event)}>
                                    <div className='m-0 p-0 w-75 my-lg-5 my-md-4 my-sm-3 my-3'>
                                        <style>{customStyles}</style>
                                    <Form.Group className='w-100 m-0 p-0 border-0'>
                                    <Form.Label className='text-light'>Email <span className='fw-bolder m-0 p-0' style={{color:'#FFFFFF'}}>*</span></Form.Label>
                                            <InputGroup className='rounded-2' style={{border:'2px solid #FFFFFF'}}>
                                            <InputGroup.Text style={{marginLeft:'0px',border:'none',borderRadius:'0px',color:'#FFFFFF',background:'rgba(255, 255, 255,0.1',outline:'none',boxShadow:'none'}}><MdEmail /></InputGroup.Text>
                                                <Form.Control 
                                                    type={"text"}
                                                    placeholder='Email'
                                                    name='email'
                                                    value={forgot.email}
                                                    onChange={(event) => handleChange(event)}
                                                    maxLength={400} 
                                                    className='fw-bolder custom-placeholder'
                                                style={{marginLeft:'0px',border:'none',boxShadow:'none',outline:'none',background:'rgba(255, 255, 255,0.1)',color:'#FFFFFF'}}/>
                                            </InputGroup>
                                        </Form.Group>
                                        <div className='m-0 p-0 w-100 my-xxl-4 my-xl-4 my-lg-4 my-md-4 my-sm-4 my-4 gap-2 d-flex'>
                                             <p className='m-0 p-0 gap-3 mt-1 mt-xl-0 mt-sm-1 mt-lg-0 mt-md-0 fw-bolder'><Link className='text-light text-decoration-none' to={'/'}>Wait, I remember my password.</Link></p>
                                        </div>
                                        <Button className="bg-light w-100 mt-2 fw-bolder text-center border-0" id="emailButton" type='submit' style={{color:'#17414F'}}>Send OTP</Button>
                                    </div>
                                </Form>
                            </div> 
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
        </>
    );
};
export default Register;