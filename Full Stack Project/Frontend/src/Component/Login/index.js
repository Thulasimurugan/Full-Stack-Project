import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Auth from '../../Auth';
import Axios from 'axios';
import Validator, { trim } from 'validator';
import Swal from 'sweetalert2';
import { Row, Col, Button, Form, InputGroup } from 'react-bootstrap';
import { useState } from 'react';
import LoginImage from '../../Assets/Images/login.png';
import { MdEmail } from 'react-icons/md';
import { IoIosLock } from 'react-icons/io'; 
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const [visible, setVisible] = useState(false);
    const [isChecked, setIsChecked] = useState(localStorage.getItem("Remember Me") === 'false' ? false : true);
    const [margin,setMargin] = useState(getMargin());
    const [limit, setLimit] = useState(localStorage.getItem('limit') > 0 ? localStorage.getItem('limit') : 0);
    const [login ,setLogin] = useState({
        email:'',
        password:'',
    });

    const navigate = useNavigate();
    const localEmail = localStorage.getItem("email");
    const token = localStorage.getItem("refreshToken");

    function getMargin() {
        if(window.innerWidth > 1200){
            return '-160px';
        } else if(window.innerWidth > 992){
            return '-110px';
        } else if(window.innerWidth > 767){
            return '-70px';
        } else if(window.innerWidth > 576){
            return '0px';
        } else {
            return '0px';
        }
    };

    const handleCheckChange = (event) => {
        setIsChecked(event.target.checked);
        localStorage.setItem('Remember Me',event.target.checked);

        if(localEmail !== null && token !== null && isChecked !== true){
            setLogin({
                email:localEmail,
                password:''
            });
            const password = document.getElementById('myPassword');
            password.setAttribute("disabled","true");
            password.setAttribute("placeholder","Please login without password");
        } else {
            const password = document.getElementById('myPassword');
            password.removeAttribute("disabled");
            password.setAttribute("placeholder","Password");
        }
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setLogin({
            ...login,
            [name]: value,
        })
    };

    const handleAutoLogin = async (event) => {
        if(Validator.isEmpty(login.email)){
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
        } else if(!Validator.isEmail(login.email)) {
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
        } else {
            event.preventDefault();
            const userLogin = {
                ...login,
                ...(token) && { token },
            }
            const trimObject = Object.fromEntries(
                Object.entries(userLogin).map(([key,value]) => ([key,key === 'email' ? value.toLowerCase() : value && typeof value === 'string' ? value.trim() : value]))
            );
            console.log(trimObject);
            try{
                const loginResponce = await Axios.post('http://127.0.0.1:5000/vitamins/autoLogin',trimObject);
                console.log(loginResponce);
                if (loginResponce.data.status === 200 && isChecked === true){
                        localStorage.setItem("userToken",loginResponce.data.userToken);
                        localStorage.setItem("email", trimObject.email);
                        localStorage.removeItem("password");
                        const loginButton = document.getElementById('loginButton')
                        loginButton.textContent =  'Loading....';
                        loginButton.setAttribute('disabled','true');
                        Auth.login(() => {
                            navigate('/home');
                        });
                    } else if(loginResponce.data?.arMissField){
                        setLimit(Number(limit) + 1);
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
                            icon:'error',
                            title:`${loginResponce.data.arMissField[0]} is Required`,
                        });
                    } else if(loginResponce.data?.msg === 'Invalid session. Please re-authenticate with the correct email'){
                        setLimit(Number(limit) + 1);
                        Swal.fire({
                            icon:'success',
                            title:'Update Remember Me Email',
                            text:'The email you entered is different from the saved email. Do you want to update your Remember Me email?',
                            reverseButtons:true,
                            showConfirmButton:true,
                            showCancelButton: true,
                            confirmButtonText:'Yes',
                            cancelButtonText:'No',
                            confirmButtonColor:'limegreen',
                            cancelButtonColor:'#ff6374',
                        }).then(result => {
                            if(result.isConfirmed){
                                localStorage.removeItem('email');
                                localStorage.removeItem('refreshToken');
                                localStorage.removeItem("userToken");
                                window.location.reload();
                                navigate('/');
                            }
                        });
                    } else {
                        setLimit(Number(limit) + 1);
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
                            title:`${loginResponce.data.msg}`,
                        });
                    }
            } catch(error) {
                if(error.message){
                    setLimit(Number(limit) + 1);
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

    const handleSubmit = async (event) => {
        if(Validator.isEmpty(login.email)){
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
        } else if(!Validator.isEmail(login.email)) {
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
        } else if(limit >= 5) {
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
                title:'Too many failed attempts Try again after 10 minutes',
            })
        } else if (Validator.isEmpty(login.password)) {
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
                title:'Password is Required',
            });
        } else if (!Validator.isStrongPassword(login.password)) {
            event.preventDefault();
            const Toast = Swal.mixin({
                toast:true,
                position:'top-end',
                showConfirmButton:false,
                timer:8000,
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
                title:'The Password must contain 8 characters, including an uppercase letter, lowercase letter, number and special characters.',
            });
        } else {
            event.preventDefault();
            const trimObject = Object.fromEntries(
                Object.entries(login).map(([key,value]) => ([key,key === 'email' ? value.toLowerCase() : value && typeof value === 'string' ? value.trim() : value]))
            );
            console.log(trimObject);
            try{
                const loginResponce = await Axios.post('http://127.0.0.1:5000/vitamins/login',trimObject);
                if(loginResponce.data.status === 200 && isChecked === false){
                        localStorage.setItem("userToken", loginResponce.data.userToken);
                        localStorage.setItem("email",login.email);
                        //localStorage.clear();
                        const loginButton = document.getElementById("loginButton");
                        loginButton.textContent = 'Loading....';
                        loginButton.setAttribute("disabled","true");
                        Auth.login(() => {
                            navigate('/home');
                        });
                    } else if (loginResponce.data.status === 200 && isChecked === true){
                        localStorage.setItem("userToken", loginResponce.data.userToken);
                        //localStorage.setItem("refreshToken",loginResponce.data.refreshToken);
                        localStorage.setItem("email", trimObject.email);
                        const loginButton = document.getElementById('loginButton')
                        loginButton.textContent =  'Loading....';
                        loginButton.setAttribute('disabled','true');
                        Auth.login(() => {
                            navigate('/home');
                        });
                    } else if(loginResponce.data?.arMissField){
                        setLimit(Number(limit) + 1);
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
                            icon:'error',
                            title:`${loginResponce.data.arMissField[0]} is Required`,
                        });
                    } else {
                        setLimit(Number(limit) + 1);
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
                            title:`${loginResponce.data.msg}`,
                        });
                    }
            } catch(error) {
                if(error.message){
                    setLimit(Number(limit) + 1);
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
    };

    const handleForgot  = () => {
        localStorage.setItem("showComponent",0);
        navigate('/forgot');

    }

    useEffect(()=> {
        const handleResize = () => {
            setMargin(getMargin());
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    },[]);

    useEffect(() => {
        Auth.logout(() => {
            localStorage.setItem('limit', limit);
        });
        if(limit >= 5){
            setTimeout(()=>{setLimit(0)},1000);
        };
    });

    useEffect(() => {
        if(localEmail !== null && token !== null && isChecked === true){
            setLogin({
                email:localEmail,
            })
            const password = document.getElementById('myPassword');
            password.setAttribute("disabled","true");
            password.setAttribute("placeholder","Please login without password");
        } else {
            const password = document.getElementById('myPassword');
            password.removeAttribute("disabled");
            password.setAttribute("placeholder","Password");
        }
    },[]);

    return(
        <>
        <Helmet>
          <title>Login</title>
          <meta name="description" content="Only the best when you choose products offered on our platform - high quality
ingredients for high quality products!"/>
          <meta name="keywords" content="medical,medicine,tablet,hospital products,hospital,hospitals,vitamin,weight less,minerals"/>
        </Helmet>
        <Row className="m-0 w-100 h-100 px-0 px-xl-5 px-lg-5 px-md-5 px-sm-0 py-xl-2 py-lg-1 py-md-1 py-sm-0" style={{background: "#E2F5FB"}}>
            <Col className='m-0 p-0 d-flex justify-content-md-center align-items-md-center py-xl-4 py-lg-5 py-md-5 py-sm-0 py-0'>
                <div className='m-0 p-0 w-100 border border-2' style={{borderColor:'#727272', background:'#FFFFFF',borderRadius:'10px'}}>
                    <Row className='w-100 d-flex h-100 m-0 p-0'>
                        <Col className='d-none d-xl-flex d-lg-flex d-md-flex d-sm-none justify-content-center align-items-center p-xl-5 p-lg-5 p-md-5 p-sm-5' xl={8} lg={8} md={8}>
                            <div className='w-100 m-0 p-0 d-flex flex-column'>
                                <div className='flex-column m-0 p-0 w-100'>
                                    <p className='m-0 p-0 text-center fw-bolder' style={{color:'#17414F',fontSize:'17px'}}>Essential Vitamins</p>
                                    <p className='m-0 p-0 text-center' style={{color:'#727272',fontSize:'14px'}}>Only the best when you choose products offered on our platform.</p>
                                    <p className='m-0 p-0 text-center' style={{color:'#727272',fontSize:'14px'}}>high quality ingredients for high quality products!</p>
                                </div>
                                <div className='m-0 p-0 w-100 d-flex justify-content-center align-items-center mt-3'>
                                    <img src={LoginImage} className='img-fluid' alt='loginImage' />
                                </div>
                            </div>
                        </Col>
                        <Col className='d-flex justify-content-center align-items-center py-0 px-3 px-sm-5 py-sm-5 px-md-0 px-lg-0 px-xl-0 px-xxl-0' xl={4} lg={4} md={4} sm={12} xs={12} style={{background:'#17414F',borderTopRightRadius:'10px',borderBottomRightRadius:'10px'}}>
                        <div className='p-0 w-100 border border-2 align-items-center d-flex justify-content-center shadow py-5 py-xl-5 py-md-4 py-sm-5' style={{marginLeft:`${margin}`, borderRadius:'10px',borderColor:'#727272',background:'#FFFFFF'}}>
                                <Form className='h-75 w-75 d-flex' id="myForm" onSubmit={(event) => isChecked === true && localEmail !== null && token !== null ? handleAutoLogin(event) : handleSubmit(event)}>
                                    <div className='m-0 p-0 flex-column w-100 mt-xl-0'>
                                        <p className='m-0 p-0 text-center fw-bolder' style={{color:'#17414F',fontSize:'17px'}}>Login Please</p>
                                        <p className='m-0 p-0 text-center mt-1' style={{color:'#727272',fontSize:'14px'}}>This is a secure system and you will need to</p>
                                        <p className='m-0 p-0 text-center' style={{color:'#727272',fontSize:'14px'}}>provide your logim details to access the site.</p>
                                        <Form.Group className='w-100 m-0 p-0 border-0 mt-3 mt-xl-5'>
                                            <InputGroup className='rounded-2' style={{border:'2px solid #17414F'}}>
                                            <InputGroup.Text className='bg-transparent' style={{border:'none'}}><MdEmail /></InputGroup.Text>
                                                <Form.Control 
                                                    type={"text"}
                                                    placeholder='Email'
                                                    name='email'
                                                    value={login.email}
                                                    onChange={(event) => handleChange(event)}
                                                    maxLength={400}
                                                    className="bg-transparent rounded-2" 
                                                style={{border:'none',boxShadow:'none',outline:'none'}}/>
                                            </InputGroup>
                                        </Form.Group>
                                        <Form.Group className='w-100 m-0 p-0 border-0 mt-3'>
                                            <InputGroup className='rounded-2' style={{border:'2px solid #17414F'}}>
                                            <InputGroup.Text className='bg-transparent' style={{border:'none'}}><IoIosLock /></InputGroup.Text>
                                                <Form.Control 
                                                type={visible ? "text" : "password"}
                                                placeholder='Password'
                                                name='password'
                                                id='myPassword'
                                                value={login.password}
                                                onChange={(event) => handleChange(event)}
                                                maxLength={30}
                                                className="bg-transparent rounded-2" 
                                                style={{border:'none',boxShadow:'none',outline:'none'}}/>
                                            
                                                <InputGroup.Text className='bg-transparent' style={{border:'none'}}>{visible ? <FaEyeSlash onClick={() => setVisible(false)} style={{cursor:'pointer'}}/> : <FaEye onClick={() => setVisible(true)} style={{cursor:'pointer'}}/>}</InputGroup.Text>
                                            </InputGroup>
                                        </Form.Group>
                                        <div className='d-flex m-0 p-0 w-100 mt-2 mb-2 justify-content-end'>
                                            <a onClick={() => handleForgot()} className='fs-6 m-0 p-0' style={{color:'#2D3F59',textDecoration:'none',cursor:'pointer'}}>Forgot Password?</a>
                                        </div>
                                        {/* <div className='d-flex m-0 p-0 w-100 mt-2 mb-2 justify-content-start gap-2'>
                                            <Form.Group style={{cursor:"pointer"}}>
                                                <Form.Check 
                                                    checked={isChecked}
                                                    onChange={(event) => handleCheckChange(event)}
                                                />
                                            </Form.Group>
                                            <p>Remember Me</p>
                                        </div> */}
                                        <div className='d-flex m-0 p-0'>
                                            <Button className='w-100 text-center border-0 rounded-2' id='loginButton' type='submit' style={{background:'#17414F',color:'white'}}><span className='fw-bolder'>Login</span></Button>
                                        </div>
                                        <div className='d-flex m-0 p-0 w-100 mt-3 justify-content-center'>
                                            <p className='w-100 m-0 p-0 text-center'>OR</p>
                                        </div>
                                        <div className='m-0 p-0 d-flex justify-content-end w-100 gap-1'>
                                        <p className='m-0 p-0 gap-3 mt-1 mt-xl-0 mt-sm-1 mt-lg-0 mt-md-0 text-md-center' style={{color:'#17414F'}}>Dont have an account? <Link className='fw-bolder text-decoration-none' style={{color:'#17414F'}} to="/register">register</Link></p>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
        </>
    )
}

export default Login;