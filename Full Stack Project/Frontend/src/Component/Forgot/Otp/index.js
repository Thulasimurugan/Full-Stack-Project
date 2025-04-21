import { useState, useRef, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Row, Col, Button, Form } from "react-bootstrap";
import doctorImage  from '../../../Assets/Images/doctorImage.jpeg';
import Image1 from '../../../Assets/Images/product-8-400x400.png.png';
import { Helmet } from 'react-helmet';


function ForgotOTP({showComponent,setShowComponent,length = 6}) {
    const [otp, setOtp] = useState(Array(length).fill(""));
    const inputRef = useRef([]);

    const handleChange = (event, index) => {
        const value = event.target.value;
        if(value === " ") return;
        if(isNaN(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if(value && index < length - 1){
            inputRef.current[index + 1].focus();
        }

    }

    const customStyles = `.custom-placeholder::placeholder {
        color: #FFFFFF;
        opacity: 1;
    }`;

    const handleKeyDown = (event, index) => {
        if(event.key === 'Backspace' && !otp[index] && length > 0 ){
            if(index > 0){
                inputRef.current[index - 1].focus();
            }
        }
    }

    const handleResend = () => {
        const Toast = Swal.mixin({
            toast: true,
            position:'top-end',
            timer:3000,
            timerProgressBar:true,
            showConfirmButton:false,
            didOpen: () => {
                const timerProgressBar = document.querySelector(".swal2-timer-progress-bar");
                if(timerProgressBar){
                    timerProgressBar.style.backgroundColor = 'limegreen';
                }
            }
        });
        Toast.fire({
            title:'OTP was sended check your email again',
            icon:'success',
        })
    } 

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(otp.includes("")) {
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
                title:'Enter a Valid OTP',
            })
        }  else {
            const email = localStorage.getItem("email");
            const splitOpt = otp.join("");
            console.log(splitOpt);
            try{
                const trimObject = {
                    otp:splitOpt,
                    ...(email) && { email },
                }
                const otpResponce = await Axios.post('http://127.0.0.1:5000/vitamins/verifyOtp',trimObject);
                
                if(otpResponce.data.status === 200 || otpResponce.data.status === 201){
                        setShowComponent(2);
                        localStorage.setItem('showComponent', showComponent);
                        const otpButton = document.getElementById('otpButton');
                        otpButton.textContent = "OTP Verifing....";
                        otpButton.setAttribute("disabled", 'true');
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
                            title:`OTP verified successfully`,
                        });
                    } else if(otpResponce.data?.arMissField) {
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
                            title:`${otpResponce.data.arMissField[0]} is Required`,
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
                            title:`${otpResponce.data.msg}`,
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
    }
};

    return (
        <>
        <Helmet>
          <title>Verify OTP</title>
          <meta name="description" content="Only the best when you choose products offered on our platform - high quality
ingredients for high quality products!"/>
          <meta name="keywords" content="medical,medicine,tablet,hospital products,hospital,hospitals,vitamin,weight less,minerals"/>
        </Helmet>
        <Row className='m-0 p-0 w-100 h-100 d-flex' style={{background: "#E2F5FB"}}>
            <Col className='w-100 h-100 m-0 d-flex justify-content-center align-items-center px-3 py-3 py-sm-3 py-sm-3 py-md-5 px-md-5 py-lg-5 py-xl-4 py-xxl-5'>
                <div className='w-100 m-0 p-0 flex-grow align-items-xl-center justify-content-xl-center rounded-2' style={{borderColor:'#727272', background:'#17414F',borderRadius:'10px'}}>
                    <Row className='d-flex w-100 h-100 m-0 p-0'>
                        <Col className='m-0 d-xl-flex d-xl-flex d-lg-flex d-md-flex d-sm-none d-none' style={{padding:'12px'}}>
                            <div className='m-0 p-0 w-100 rounded-2 d-flex' style={{backgroundImage:`url(${doctorImage})`,backgroundRepeat:'no-repeat',backgroundPosition:'center',backgroundSize:'100% 100%'}}>
                            <div className='m-0 p-3 d-flex align-items-start justify-content-start gap-2 w-50'>
                                <img src={Image1} alt='Image1' className='img-fluid' style={{height:'35px', width:'35px',borderRadius:'50%',border:'3px solid #17414F'}}/>
                                <h5 style={{color:'#FFFFFF'}} className='m-0 p-0 fw-bolder mt-1 mb-1'>Vitamins</h5>
                            </div>
                            </div>
                        </Col> 
                        <Col className='d-flex p-5 m-0 align-items-center justify-content-center'>
                            <div className='flex-column m-0 p-0 w-100 p-xl-5'>
                                <h2 className='m-0 p-0 w-100 d-flex' style={{color:'#FFFFFF'}}>Verification Code</h2>
                                <div className='m-0 p-0 my-xxl-3 my-lg-3 my-md-3 my-sm-3 my-3 w-100'>
                                    <p className='m-0 p-0 mt-1 mt-xl-0 mt-sm-1 mt-lg-0 mt-md-0' style={{color:'#FFFFFF'}}>Your reset password verification code is on its way! check your email and get started!</p>
                                </div>
                                <Form className='p-0 m-0 flex-column' onSubmit={(event) => handleSubmit(event)}>
                                    <div className='m-0 p-0 w-75 my-lg-5 my-md-4 my-sm-3 my-3'>
                                        <style>{customStyles}</style>
                                    <Form.Group className='w-100 m-0 p-0 border-0'>
                                        <Form.Label className='text-light'>OTP <span className='fw-bolder m-0 p-0' style={{color:'#FFFFFF'}}>*</span></Form.Label>
                                            <div className='d-flex gap-3 w-100 m-0 p-0'>
                                                {otp.map((_,index) => (
                                                    <Form.Control 
                                                    key={index}
                                                    type={"password"}
                                                    value={otp[index]}
                                                    ref={(el) => (inputRef.current[index] = el)}
                                                    onKeyDown={(event) => handleKeyDown(event, index)}
                                                    onChange={(event) => handleChange(event, index)}
                                                    maxLength={1} 
                                                    className='fw-bolder text-center'
                                                    style={{marginLeft:'0px',border:'2px solid #FFFFFF',boxShadow:'none',outline:'none',background:'rgba(255, 255, 255,0.1)',color:'#FFFFFF'}}/>
                                                ))}
                                            </div>  
                                        </Form.Group>
                                        <div className='m-0 p-0 w-100 my-xxl-4 my-xl-4 my-lg-4 my-md-4 my-sm-4 my-4 gap-2 d-flex'>
                                             <p className='m-0 p-0 mt-1 mt-xl-0 mt-sm-1 mt-lg-0 mt-md-0 fw-bolder text-light'>Didn't receive the OTP? <Link className='text-light px-1' onClick={() => handleResend()}>Resend</Link></p>
                                        </div>
                                        <Button className="bg-light mt-2 w-100 fw-bolder text-center border-0" id="otpButton" type='submit' style={{color:'#17414F'}}>Verify OTP</Button>
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
export default ForgotOTP;