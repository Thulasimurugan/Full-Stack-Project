import { useState } from 'react';
import { Helmet } from 'react-helmet';
import Validator, { trim } from 'validator';
import Axios from "axios";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Row, Col, Button, Form, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { IoIosLock } from 'react-icons/io';
import heartImage  from '../../../Assets/Images/doctor.jpeg';
import Image1 from '../../../Assets/Images/product-8-400x400.png.png';


function ResetPassword({showComponent, setShowComponent}) {
    const [show, setShow] = useState(false);
    const [ visible, setVisible ] = useState(false);
    const navigate = useNavigate();
    const [ reset, setReset ] = useState({
        password:'',
        confirmpassword:'',
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
        if(Validator.isEmpty(reset.password)) {
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
                title:'Password is Required',
            })
        } else if(Validator.isEmpty(reset.confirmpassword)) {
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
              title:'Confirm Password is Required',
          })
      } else if(!Validator.isStrongPassword(reset.password)) {
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
                title:'The Password must contain 8 characters, including an uppercase letter, lowercase letter, number and special characters.',
            })
        } else if(!Validator.isStrongPassword(reset.confirmpassword)) {
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
              title:'The Confirm Password must contain 8 characters, including an uppercase letter, lowercase letter, number and special characters.',
          })
      } else if(!Validator.equals(reset.password, reset.confirmpassword)) {
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
            title:'Passwords do not match!',
        })
    } else {
        const email = localStorage.getItem("email");
        const changeDetails = {
            ...reset,
            email: email,
        };
        const trimObject = Object.fromEntries(
            Object.entries(changeDetails).map(([key,value]) => [key, key === "email" && typeof value === 'string' ? value.trim() : value])
        )

        console.log(trimObject);

        try{
            event.preventDefault();
            const changeResponce = await Axios.post('http://127.0.0.1:5000/vitamins/changePassword',trimObject);
            console.log(changeResponce);
            if(changeResponce.data.status === 200 || changeResponce.data.status === 201){

                    const changeButton = document.getElementById('changeButton');
                    changeButton.textContent = "Password Changing....";
                    changeButton.setAttribute("disabled", 'true');
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
                        title:`Password Changed successfully`,
                    });
                    navigate("/");
                } else if(changeResponce.data?.arMissField) {
                    event.preventDefault();
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
                        title:`${changeResponce.data.arMissField[0]} is Required`,
                    });
                } else {
                    event.preventDefault();
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
                        title:`${changeResponce.data.msg}`,
                    });
                }
        } catch(error){
            if(error.message){
                event.preventDefault();
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
                            <div className='flex-column m-0 p-0 w-100 p-xl-5 p-lg-5 py-md-5'>
                                <h2 className='m-0 p-0 w-100 d-flex' style={{color:'#FFFFFF'}}>Reset Password</h2>
                                <div className='m-0 p-0 my-lg-3 my-md-3 my-sm-3 my-3 w-100'>
                                    <p className='m-0 p-0 mt-1 mt-xl-0 mt-sm-1 mt-lg-0 mt-md-0' style={{color:'#FFFFFF'}}>Your new password must be different</p>
                                    <p className='m-0 p-0 mt-1 mt-xl-0 mt-sm-1 mt-lg-0 mt-md-0' style={{color:'#FFFFFF'}}>From previous used password.</p>
                                </div>
                                <Form className='p-0 m-0 flex-column' onSubmit={(event) => handleSubmit(event)}>
                                    <div className='m-0 p-0 w-75'>
                                        <style>{customStyles}</style>
                                    <Form.Group className='w-100 m-0 p-0 border-0 my-xl-4'>
                                    <Form.Label className='text-light'>Password <span className='fw-bolder m-0 p-0' style={{color:'#FFFFFF'}}>*</span></Form.Label>
                                            <InputGroup className='rounded-2' style={{border:'2px solid #FFFFFF'}}>
                                            <InputGroup.Text style={{marginLeft:'0px',border:'none',borderRadius:'0px',color:'#FFFFFF',background:'rgba(255, 255, 255,0.1',outline:'none',boxShadow:'none'}}><IoIosLock /></InputGroup.Text>
                                                <Form.Control 
                                                    type={show ? "text" : "password"}
                                                    placeholder='Password'
                                                    name='password'
                                                    value={reset.password}
                                                    onChange={(event) => handleChange(event)}
                                                    maxLength={30} 
                                                    className='fw-bolder custom-placeholder'
                                                style={{marginLeft:'0px',border:'none',boxShadow:'none',outline:'none',background:'rgba(255, 255, 255,0.1)',color:'#FFFFFF'}}/>
                                              <InputGroup.Text style={{marginLeft:'0px',border:'none',borderRadius:'0px',color:'#FFFFFF',background:'rgba(255, 255, 255,0.1',outline:'none',boxShadow:'none'}}>{show ? <FaEyeSlash style={{cursor:'pointer'}} onClick={() => setShow(false)}/> : <FaEye style={{cursor:'pointer'}} onClick={() => setShow(true)}/>}</InputGroup.Text>
                                            </InputGroup>
                                        </Form.Group>
                                        <Form.Group className='w-100 m-0 p-0 border-0 my-xl-4 mt-4 mb-2'>
                                      <Form.Label className='text-light'>Confirm Password <span className='fw-bolder m-0 p-0' style={{color:'#FFFFFF'}}>*</span></Form.Label>
                                            <InputGroup className='rounded-2' style={{border:'2px solid #FFFFFF'}}>
                                            <InputGroup.Text style={{marginLeft:'0px',border:'none',borderRadius:'0px',color:'#FFFFFF',background:'rgba(255, 255, 255,0.1',outline:'none',boxShadow:'none'}}><IoIosLock /></InputGroup.Text>
                                                <Form.Control 
                                                    type={visible ? "text" : "password"}
                                                    placeholder='Confirm Password'
                                                    name='confirmpassword'
                                                    value={reset.confirmpassword}
                                                    onChange={(event) => handleChange(event)}
                                                    maxLength={30} 
                                                    className='fw-bolder custom-placeholder'
                                                    style={{marginLeft:'0px',border:'none',boxShadow:'none',outline:'none',background:'rgba(255, 255, 255,0.1)',color:'#FFFFFF'}}/>
                                                    <InputGroup.Text style={{marginLeft:'0px',border:'none',borderRadius:'0px',color:'#FFFFFF',background:'rgba(255, 255, 255,0.1',outline:'none',boxShadow:'none'}}>{visible ? <FaEyeSlash style={{cursor:'pointer'}} onClick={() => setVisible(false)}/> : <FaEye style={{cursor:'pointer'}} onClick={() => setVisible(true)} />}</InputGroup.Text>
                                            </InputGroup>
                                        </Form.Group>
                                        <Button className="bg-light w-100 mt-4 mt-md-4 mt-lg-4 mt-xl-4 mt-xxl-4 fw-bolder text-center border-0" id="changeButton" type='submit' style={{color:'#17414F'}}>Reset Password</Button>
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
export default ResetPassword;