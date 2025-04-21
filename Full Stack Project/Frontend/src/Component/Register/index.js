import { useState } from 'react';
import Validator from 'validator';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Axios from 'axios';
import { Helmet } from 'react-helmet';
import { Row, Col, Button, Form, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash, FaUserCircle, FaApple ,FaGoogle } from 'react-icons/fa';
import { GrUserWorker } from 'react-icons/gr';
import { MdEmail } from 'react-icons/md';
import { IoIosLock } from 'react-icons/io';
import heartImage  from '../../Assets/Images/heartImage.jpeg';
import Image1 from '../../Assets/Images/product-8-400x400.png.png';
import { useEffect } from 'react';


function Register() {
    const [ visible, setVisible ] = useState(false);
    const [index, setIndex] = useState(0);
    const [welcome, setWelcome] = useState("");
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const word = ["Your health, our priority-welcome to vitamins shop!", "Trusted medicines, doorstep delivery-shop with confidence", "Carring for you, anytime, anywhere-welcome!", "Your one-stop medical shop-fast,reliable, and affordable!", "Health made easy-order your essentials today!", "Because your well-being matters--safe and secure shopping"];
    const [ register, setRegister ] = useState({
        firstname:'',
        lastname:'',
        email:'',
        password:'',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setRegister({
            ...register,
            [name]: value,
        });
    }

    const customStyles = `.custom-placeholder::placeholder {
        color: #FFFFFF;
        opacity: 1;
    }`;

    const handleSubmit = async (event) => {
        if(Validator.isEmpty(register.firstname)) {
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
                title:'First Name is Required',
            })
        } else if(Validator.isEmpty(register.lastname)){
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
                title:'Last Name is Required',
            })
        } else if(Validator.isEmpty(register.email)) {
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
        } else if(Validator.isEmpty(register.password)) {
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
        } else if (!Validator.isStrongPassword(register.password)) {
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
                title:'The Password must contain 8 characters, including an uppercase letter, lowercase letter, number and special characters.',
            });
        } else {
            event.preventDefault();
            const trimObject = Object.fromEntries(
                Object.entries(register).map(([key,value]) => ([key,key === "email" ? value.toLowerCase() : value && typeof value === 'string' ? value.trim() : value]))
            );
            try{
                const registerResponce = await Axios.post('http://127.0.0.1:5000/vitamins/createUser',trimObject);
                
                if(registerResponce.data.status === 200 || registerResponce.data.status === 201){
                        const registerButton = document.getElementById("registerButton");
                        registerButton.textContent = "Account Creating....";
                        registerButton.setAttribute("disabled", "true");
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
                                navigate('/');
                            }
                        });
                        Toast.fire({
                            icon:'success',
                            title:`Registered Your Account Successfully`,
                        });
                    } else if(registerResponce.data?.arMissField){
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
                            title:`${registerResponce.data.arMissField[0]} is Required`,
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
                            title:`${registerResponce.data.msg}`,
                        });
                    }
            } catch(error) {
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

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % word.length)
            console.log(index);
        }, 10000);

        return () => clearInterval(interval);
    })

    return (
        <>
        <Helmet>
          <title>Login</title>
          <meta name="description" content="Only the best when you choose products offered on our platform - high quality
ingredients for high quality products!"/>
          <meta name="keywords" content="medical,medicine,tablet,hospital products,hospital,hospitals,vitamin,weight less,minerals"/>
        </Helmet>
        <Row className='m-0 p-0 w-100 h-100 d-flex' style={{background: "#E2F5FB"}}>
            <Col className='w-100 h-100 m-0 d-flex justify-content-center align-items-center px-3 py-3 py-sm-3 py-sm-3 py-md-5 px-md-5 py-lg-5 py-xl-4 py-xxl-5'>
                <div className='w-100 m-0 p-0 d-flex align-items-xl-center justify-content-xl-center rounded-2' style={{borderColor:'#727272', background:'#17414F',borderRadius:'10px'}}>
                    <Row className='d-flex w-100 m-0 p-0'>
                        <Col className='m-0 d-xl-flex d-xl-flex d-lg-flex d-md-flex d-sm-none d-none' style={{padding:'12px'}}>
                            <div className='m-0 p-0 w-100 rounded-2 flex-column' style={{backgroundImage:`url(${heartImage})`,backgroundRepeat:'no-repeat',backgroundPosition:'center',backgroundSize:'100% 100%'}}>
                            <div className='m-0 p-3 d-flex align-items-start justify-content-start gap-2 w-50'>
                                <img src={Image1} alt='Image1' className='img-fluid' style={{height:'35px', width:'35px',borderRadius:'50%',border:'3px solid #17414F'}}/>
                                <h5 style={{color:'#FFFFFF'}} className='m-0 p-0 fw-bolder mt-1 mb-1'>Vitamins</h5>
                            </div>
                            <div className="w-100 d-flex justify-content-centet align-items-center m-0 px-3">
                                <p className="fw-bolder fs-5 m-0 p-0 w-100" style={{color:'#17414F'}}>{word[index]}</p>
                            </div>
                            </div>
                        </Col>
                        <Col className='d-flex p-5 m-0 align-items-center justify-content-center'>
                            <div className='flex-column m-0 p-0 w-100 py-xl-4'>
                                <h2 className='m-0 p-0 w-100 d-flex' style={{color:'#FFFFFF'}}>Create an account</h2>
                                <div className='m-0 p-0 w-100 gap-2 d-flex mt-xl-0 mb-xl-2 mt-lg-2 mb-lg-2 mt-md-2 mb-md-2 mt-sm-1 mb-sm-1 mb-1 mt-1'>
                                    <p className='m-0 p-0 gap-3 mt-1 mt-xl-0 mt-sm-1 mt-lg-0 mt-md-0' style={{color:'#FFFFFF'}}>Already have an account? <Link className='text-light fw-bolder text-decoration-none' to="/">login</Link></p>
                                </div>
                                <Form className='p-0 m-0 flex-column' onSubmit={(event) => handleSubmit(event)}>
                                <div className='w-100 m-0 p-0 d-md-flex gap-2 mt-3'>
                                    <style>{customStyles}</style>
                                    <Form.Group className='w-100 m-0 p-0 border-0'>
                                            <InputGroup className='rounded-2' style={{border:'2px solid #FFFFFF'}}>
                                            <InputGroup.Text style={{marginLeft:'0px',border:'none',borderRadius:'0px',color:'#FFFFFF',background:'rgba(255, 255, 255,0.1',outline:'none',boxShadow:'none'}}><FaUserCircle /></InputGroup.Text>
                                                <Form.Control 
                                                    type={"text"}
                                                    placeholder='First Name'
                                                    name='firstname'
                                                    value={register.firstname}
                                                    onChange={(event) => handleChange(event)}
                                                    maxLength={400} 
                                                    className='fw-bolder custom-placeholder'
                                                style={{marginLeft:'0px',border:'none',boxShadow:'none',outline:'none',background:'rgba(255, 255, 255,0.1)',color:'#FFFFFF'}}/>
                                            </InputGroup>
                                        </Form.Group>
                                        <Form.Group className='w-100 m-0 p-0 border-0 mt-4 mt-sm-4 mt-md-0 mt-lg-0 mt-xl-0 mt-xxl-0'>
                                            <InputGroup className='rounded-2' style={{border:'2px solid #FFFFFF'}}>
                                            <InputGroup.Text style={{marginLeft:'0px',border:'none',background:'rgba(255, 255, 255, 0.1)',color:'#FFFFFF'}}><FaUserCircle /></InputGroup.Text>
                                                <Form.Control 
                                                type="text"
                                                placeholder='Last Name'
                                                name='lastname'
                                                value={register.lastname}
                                                onChange={(event) => handleChange(event)}
                                                maxLength={30}
                                                className='fw-bolder custom-placeholder'
                                                style={{marginLeft:'0px',border:'none',boxShadow:'none',outline:'none',background:'rgba(255, 255, 255, 0.1)',color:'#FFFFFF'}}/>
                                            </InputGroup>
                                        </Form.Group>
                                    </div>
                                    <div className='flex-row m-0 p-0 gap-2'>
                                    <Form.Group className='w-100 m-0 p-0 border-0 mt-4'>
                                        <InputGroup className='rounded-2' style={{border:'2px solid #FFFFFF'}}>
                                        <InputGroup.Text style={{marginLeft:'0px',border:'none',background:'rgba(255, 255, 255, 0.1)',color:'#FFFFFF'}}><MdEmail/></InputGroup.Text>
                                            <Form.Control 
                                            type="text"
                                            placeholder='Email'
                                            name='email'
                                            value={register.email}
                                            onChange={(event) => handleChange(event)}
                                            maxLength={200}
                                            className='fw-bolder custom-placeholder'
                                            style={{marginLeft:'0px',border:'none',boxShadow:'none',outline:'none',background:'rgba(255, 255, 255, 0.1)',color:'#FFFFFF'}}/>
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group className='w-100 m-0 p-0 border-0 mt-4'>
                                        <InputGroup className='rounded-2' style={{border:'2px solid #FFFFFF'}}>
                                        <InputGroup.Text style={{marginLeft:'0px',border:'none',background:'rgba(255, 255, 255, 0.1)',color:'#FFFFFF'}}><IoIosLock /></InputGroup.Text>
                                             <Form.Control 
                                                type={visible ? "text" : "password"}
                                                placeholder='Password'
                                                name='password'
                                                value={register.password}
                                                onChange={(event) => handleChange(event)}
                                                maxLength={30}
                                                className='fw-bolder custom-placeholder'
                                                style={{marginLeft:'0px',border:'none',boxShadow:'none',outline:'none',background:'rgba(255, 255, 255, 0.1)',color:'#FFFFFF'}}/>
                                             <InputGroup.Text style={{marginLeft:'0px',border:'none',background:'rgba(255, 255, 255, 0.1)',color:'#FFFFFF'}}>{visible ? <FaEyeSlash onClick={() => setVisible(false)} style={{cursor:"pointer"}}/> : <FaEye onClick={() => setVisible(true)} style={{cursor:"pointer"}}/>}</InputGroup.Text>
                                         </InputGroup>
                                     </Form.Group>
                                    <Button className="bg-light w-100 mt-4 fw-bolder text-center border-0" id='registerButton' type='submit' style={{color:'#17414F'}}>Create account</Button>
                                    <p className='w-100 text-center mt-1 mb-1 text-light fw-bolder'>OR</p>
                                    <div className='w-100 m-0 p-0 d-flex justify-content-center align-items-center gap-2'>
                                        <Button  className='w-50 bg-transparent fw-bolder text-center' style={{color:'#FFFFFF',border:'2px solid #FFFFFF'}}>Google</Button>
                                        <Button className='w-50 bg-transparent fw-bolder text-center' style={{color:'#FFFFFF',border:'2px solid #FFFFFF'}}>Apple</Button>
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
    );
};
export default Register;