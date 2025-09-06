import {Row, Col, Button} from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import Image1 from '../../Assets/Images/f2-1.png.png';
import Image3 from '../../Assets/Images/bn2-2.jpg.png';
import Image2 from '../../Assets/Images/h2-b1.jpg.png';
import Image4 from '../../Assets/Images/bn2-3.jpg.png';
import Image5 from '../../Assets/Images/bn2-4.jpg.png';
import Image6 from '../../Assets/Images/bn2-5.jpg.png';
import Image7 from '../../Assets/Images/Picture-4-1.png.png';
import Image8 from '../../Assets/Images/blog1-450x580.jpg.png';
import Image9 from '../../Assets/Images/blog2-450x580.jpg.png';
import Image10 from '../../Assets/Images/blog3-450x580.jpg.png';
import { useNavigate } from 'react-router-dom';
import { FaTablets, FaMapLocationDot, FaMobile } from "react-icons/fa6";
import { GiWeightScale, GiFoodTruck, GiLeafSwirl} from "react-icons/gi";
import { MdShoppingCart, MdMarkEmailUnread } from 'react-icons/md';
import { SiOverleaf } from 'react-icons/si';
import { SlChemistry } from 'react-icons/sl';
import { LiaFlagUsaSolid } from 'react-icons/lia';
import { TbRotate3D } from 'react-icons/tb';
import Axios  from 'axios';
import Footer from "../Footer";
import { useState, useEffect } from 'react';

function Home() {
    const navigate = useNavigate();
    const [details, setDetails] = useState([]);
    const [role, setRole] = useState("");

    // useEffect(() => {
    //     const userEmail = {
    //         email: localStorage.getItem("email").toLowerCase(),
    //         token: localStorage.getItem("userToken"),
    //     }
    //     const fetchData = async () => {
    //         try{
    //             const userDetails = await Axios.post("http://127.0.0.1:5000/vitamins/generateOneUser", userEmail);
    //             setDetails(userDetails);
    //             userDetails.data.status === 200 && userDetails.data.userData.length > 0 ? setRole(userDetails.data.userData[0].role) : setRole("CUSTOMER");
    //         } catch(error){
    //             console.log(error);
    //         }
    //     } 
    //     fetchData();
    // },[]);

    return (
        <>
        <Helmet>
          <title>Home</title>
          <meta name="description" content="Only the best when you choose products offered on our platform - high quality
ingredients for high quality products!"/>
          <meta name="keywords" content="medical,medicine,tablet,hospital products,hospital,hospitals,vitamin,weight less,minerals"/>
        </Helmet>
        <div className='flex-column w-100 h-100 mt-5 p-0'>
        <Row className='d-flex justify-content-center p-0 m-0'>
            <Col className='d-flex justify-content-center m-0 p-0 ' xl={12} lg={12} md={12} sm={6} xs={6}>
                    <h1 style={{color:'#003569',letterSpacing: '8px'}} className='d- text-center  display-1 fw-bolder mt-5'>Essential Vitamins</h1>
            </Col>
        </Row>
         <Row className='d-flex w-100 justify-content-xl-center mt-0 m-0 p-0 mt-md-3 mt-4 mt-lg-3 mt-xl-3'>
            <Col xl={4} xxl={4} lg={4} md={4} sm={12} xs={12} className='align-items-xl-end align-items-xxl-end align-items-lg-end align-items-md-end align-items-sm-end p-0 d-flex justify-content-center justify-content-xl-end justify-content-xxl-end justify-content-md-end mb-4 mt-0 mt-xl-0 mb-xl-0'>
                <div className='d-flex flex-column align-items-start justify-content-start m-0 p-0'>
                    <p className='d-flex p-0 mb-2 fs-6 text-start' style={{letterSpacing:"0.8px",color:'#727272'}}>Online Medical Supplies</p>
                    <p className='d-flex p-0 fs-4 m-0 text-start' style={{color:'#17414F'}}>Get Your Vitamins</p>
                    <p className='d-flex p-0 fs-4 mt-0 text-start' style={{color:'#17414F'}}>& Minerals</p>
                    <Button className='px-4 py-2 rounded-5 border-0 w-75 text-start' style={{background:"#17414F"}}>EXPLORE</Button>
                </div>
            </Col>
            <Col lg={4} xl={4} xxl={4} md={4} sm={12} xs={12} className='justify-content-center align-items-start align-items-sm-end d-flex mt-3 mt-lg-0'>
                <img src={Image1} className='img-fluid' alt='Image1'/>
            </Col>
            <Col xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} className='justify-content-start mx-md-0 mx-lg-0 mx-xl-0 mx-xxl-0 mt-5 mt-sm-5 mt-md-0 mt-lg-0 mt-xl-0 align-items-end d-flex mt-3 mt-lg-0 p-0'>
                <Row className='w-100 d-flex m-0 p-0 px-4'>
                    <Col xxl={2} xl={2} lg={3} md={3} sm={2} xs={2}  className='justify-content-center justify-content-sm-center align-items-center d-flex p-0 mb-3'>
                        <div className='d-flex align-items-center justify-content-center p-2 m-3 m-sm-2 rounded-circle' style={{background:'#17414F',color: 'white'}}>
                            <h1 className='display-6 d-flex'><FaTablets /></h1>
                        </div>
                    </Col>
                    <Col xxl={10} xl={10} lg={9} md={9} sm={10} xs={10} className='d-flex justify-content-start justify-content-lg-start justify-content-xl-start align-items-start'>
                    <div className='flex-row'>
                            <p className='m-0 p-0 justify-content-start d-flex fs-5 fw-bolder text-start' style={{color:"#17414F"}}>Vitamins</p>
                            <p className='m-0 p-0 justify-content-start d-flex text-start' style={{color:"#727272", fontSize:'13px'}}>Increased Vitamins and</p>
                            <p className='m-0 p-0 justify-content-start d-flex text-start' style={{color:"#727272", fontSize:'13px'}}>minerals in your diet</p>
                        </div>
                    </Col>
                    <Col xxl={2} xl={2} lg={3} md={3} sm={2} xs={2}  className='justify-content-center justify-content-sm-center align-items-center d-flex p-0 mb-3'>
                        <div className='d-flex align-items-center justify-content-center p-2 m-3 m-sm-2 rounded-circle' style={{background:'#17414F',color: 'white'}}>
                            <h1 className='display-6 d-flex'><GiWeightScale/></h1>
                        </div>
                    </Col>
                    <Col xxl={10} xl={10} lg={9} md={9} sm={10} xs={10} className='d-flex justify-content- justify-content-lg-start justify-content-xl-start align-items-start'>
                    <div className='flex-row'>
                            <p className='m-0 p-0 justify-content-start d-flex fs-5 fw-bolder text-start' style={{color:"#17414F"}}>Weight Loss</p>
                            <p className='m-0 p-0 justify-content-start d-flex text-start' style={{color:"#727272", fontSize:'13px'}}>Weight Loss</p>
                            <p className='m-0 p-0 justify-content-start d-flex text-start' style={{color:"#727272", fontSize:'13px'}}>Find scientifically proven solution</p>
                        </div>
                    </Col>
                    <Col xxl={2} xl={2} lg={3} md={3} sm={2} xs={2}  className='justify-content-center justify-content-sm-center align-items-center d-flex p-0 m-0'>
                        <div className='d-flex align-items-center justify-content-center p-2 m-3 m-sm-2 rounded-circle' style={{background:'#17414F',color: 'white'}}>
                            <h1 className='display-6 d-flex'><GiFoodTruck /></h1>
                        </div>
                    </Col>
                    <Col xxl={10} xl={10} lg={9} md={9} sm={10} xs={10} className='d-flex justify-content- justify-content-lg-start justify-content-xl-start align-items-start'>
                    <div className='flex-row'>
                            <p className='m-0 p-0 justify-content-start d-flex fs-5 fw-bolder text-start' style={{color:"#17414F"}}>Functional Foods</p>
                            <p className='m-0 p-0 justify-content-start d-flex text-start' style={{color:"#727272", fontSize:'13px'}}>Functional Foods</p>
                            <p className='m-0 p-0 justify-content-start d-flex text-start' style={{color:"#727272", fontSize:'13px'}}>From protein powers to baby formula</p>
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row  className='d-xl-flex d-lg-flex w-100 d-none mt-3 justify-content-center align-items-center mb-5 mt-lg-5 p-0'>
            <div className='m-0 p-0 d-flex w-75'>
                <Col xxl={12} className='d-flex w-100'>
                    <div className='px-3 py-3 rounded-circle mx-2' style={{background:'#A6A6A6'}}></div>
                    <div className='px-3 py-3 rounded-circle' style={{background:'#A6A6A6'}}></div>
                </Col>
            </div>
        </Row>
        <Row className='w-100 d-flex justify-content-center mt-lg-0 mt-xl-0 m-0 mt-5 p-0'>
            <Col lg={12} xl={12} xxl={12} sm={4} md={12} xs={4} className='d-flex justify-content-center w-100'>
                <div className='h-100 p-0 w-100 mx-xl-5 mx-4 mx-sm-4 mx-md-5 mt-sm-5' style={{background:"#17414F",borderRadius:'50px'}}>
                    <Row className='h-100 m-0 p-0'>
                    <Col xs={12} sm={12} md={4} xl={4} xxl={4} className="m-0 p-0 mb-5 mb-xl-0 mb-lg-0 mb-md-0 mb-sm-5">
                            <Row className='d-flex h-50 p-0 m-0 mb-xl-3 mb-3 mb-sm-0'>
                                <div className='mt-sm-0 m-0 p-0'>
                                <div className='d-flex justify-content-center align-items-start mt-2 mt-sm-0 p-0' style={{height:'50px'}}>
                                    <div className='rounded-circle d-flex align-items-center justify-content-center' style={{height:'65px', width:'65px',background:'#FFFFFF', marginTop:'-32px'}}>
                                        <SlChemistry className='display-6' style={{color:'#17414F'}}/>
                                    </div>
                                </div>
                                    <h6 className='fw-bolder text-center mb-3' style={{color:'#FFFFFF'}}>Clinically Studied</h6>
                                    <p className='mt-sm-0 mb-1 text-center p-0 ' style={{color:'#FFFFFF',fontSize:'13px'}}>All products that we offer have</p>
                                    <p className='mb-xl-4 mb-4 text-center' style={{color:'#FFFFFF',fontSize:'13px'}}>Undergone lab and safety tests</p>
                                </div>
                            </Row>
                            <Row className='d-flex h-50 p-0 m-0'>
                                <div className='mt-4 mt-sm-4 mb-2 mt-xl-0'> 
                                <div className='d-flex justify-content-center align-items-start p-0 mt-1 mt-sm-0' style={{height:'50px'}}>
                                    <div className='rounded-circle d-flex align-items-center justify-content-center' style={{height:'65px', width:'65px',background:'#FFFFFF',marginTop:'-32px'}}>
                                        <MdShoppingCart className='display-6' style={{color:'#17414F'}}/>
                                    </div>
                                </div>
                                    <h6 className='fw-bolder text-center mb-3' style={{color:'#FFFFFF'}}>Free Shipping</h6>
                                    <p className='mt-sm-0 mb-1 text-center p-0' style={{color:'#FFFFFF',fontSize:'13px'}}>We deliver to your door with no</p>
                                    <p className='mb-xl-5 mb-5 text-center' style={{color:'#FFFFFF',fontSize:'13px'}}>Shipping costs on your orders</p>
                                </div>
                            </Row>
                        </Col>
                        <Col xs={12} sm={12} md={4} xl={4} xxl={4} className="m-0 p-0 mb-5 mb-xl-0 mb-lg-0 mb-md-0 mb-sm-5">
                            <Row className='h-50 d-flex p-0 m-0 mb-xl-3 mb-4 mb-sm-0'>
                                <div className='mt-4 mt-sm-0 m-0'>
                                <div className='d-flex justify-content-center align-items-start mt-2 mt-sm-0 p-0' style={{height:'50px'}}>
                                    <div className='rounded-circle d-flex align-items-center justify-content-center' style={{height:'65px', width:'65px',background:'#FFFFFF', marginTop:'-32px'}}>
                                        <SiOverleaf className='display-6' style={{color:'#17414F'}}/>
                                    </div>
                                </div>
                                    <h6 className='fw-bolder text-center mb-3' style={{color:'#FFFFFF'}}>Vegetarian Friendly</h6>
                                    <p className='mt-sm-0 mb-1 p-0 text-center' style={{color:'#FFFFFF',fontSize:'13px'}}>We have a wide selection of vegetarian</p>
                                    <p className='mb-xl-4 mb-4 text-center' style={{color:'#FFFFFF',fontSize:'13px'}}>Products to meet your needs</p>
                                </div>
                            </Row>
                            <Row className='h-50 d-flex p-0 m-0'>
                                <div className='mt-4 mt-sm-4 mb-2 mt-xl-0'> 
                                <div className='d-flex justify-content-center align-items-start p-0 mt-1 mt-sm-0' style={{height:'50px'}}>
                                    <div className='rounded-circle d-flex align-items-center justify-content-center' style={{height:'65px', width:'65px',background:'#FFFFFF',marginTop:'-32px'}}>
                                        <TbRotate3D className='display-6' style={{color:'#17414F'}}/>
                                    </div>
                                </div>
                                    <h6 className='fw-bolder mb-3 text-center' style={{color:'#FFFFFF'}}>No Risk</h6>
                                    <p className='mt-sm-0 mb-1 p-0 text-center' style={{color:'#FFFFFF',fontSize:'13px'}}>We ensure that all products are safe</p>
                                    <p className='mb-xl-5 mb-5 text-center' style={{color:'#FFFFFF',fontSize:'13px'}}>And within their use-by date</p>
                                </div>
                            </Row>
                        </Col>
                        <Col xs={12} sm={12} md={4} xl={4} xxl={4} className='m-0 p-0'>
                        <Row className='h-50 d-flex p-0 m-0 mb-xl-3 mb-0 mb-sm-0'>
                                <div className='mt-2 mb-4 mt-sm-0 mt-xl-0'>
                                <div className='d-flex justify-content-center align-items-start mt-3 mt-sm-0 p-0' style={{height:'50px'}}>
                                    <div className='rounded-circle d-flex align-items-center justify-content-center' style={{height:'65px', width:'65px',background:'#FFFFFF', marginTop:'-32px'}}>
                                        <LiaFlagUsaSolid className='display-6' style={{color:'#17414F'}}/>
                                    </div>
                                </div>
                                    <h6 className='fw-bolder mb-3 text-center' style={{color:'#FFFFFF'}}>Made In India</h6>
                                    <p className='mt-sm-0 mb-1 p-0 text-center' style={{color:'#FFFFFF',fontSize:'13px'}}>Shop local and explore health products</p>
                                    <p className='m-0 p-0 text-center' style={{color:'#FFFFFF',fontSize:'13px'}}>Made right here in India</p>
                                </div>
                            </Row>
                            <Row className='h-50 d-flex p-0 m-0 mb-5 mb-sm-5'>
                                <div className='mt-3 mt-sm-4 mt-xl-0 mb-5 mb-lg-0 mb-sm-0'>
                                <div className='d-flex justify-content-center align-items-start mt-3 mt-sm-0 p-0' style={{height:'50px'}}>
                                    <div className='rounded-circle d-flex align-items-center justify-content-center' style={{height:'65px', width:'65px',background:'#FFFFFF', marginTop:'-32px'}}>
                                        <GiLeafSwirl className='display-6' style={{color:'#17414F'}}/>
                                    </div>
                                </div>
                                    <h6 className='fw-bolder mb-3 text-center' style={{color:'#FFFFFF'}}>GMO Free</h6>
                                    <p className='mt-sm-0 mb-1 p-0 text-center' style={{color:'#FFFFFF',fontSize:'13px'}}>Natural, no modified products and</p>
                                    <p className='mb-sm-0 text-center' style={{color:'#FFFFFF',fontSize:'13px'}}>Derivatives for those who need it</p>
                                </div>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
        <div className='d-flex m-0 p-0 mt-5' style={{background:'#FFFFFF'}}>
            <Row className='w-100 m-0 p-0 px-xl-5 px-5 mt-lg-5 mt-md-5 mt-sm-5 mt-xl-5 mt-4'>
                <Col className='d-flex justify-content-center align-items-center m-0 p-0' xxl={6} xl={6} lg={12} md={12} sm={12}>
                    <div className='d-flex justify-content-start flex-column px-xl-3 px-lg-3 px-md-3 px-0 px-sm-2 align-items-start w-100'>
                        <p className='text-start fw-bolder m-0 p-0' style={{color:'#003569',fontSize:'13px'}}>INGREDIENTS</p>
                        <h3 className='text-start fw-bolder m-0 p-0 mt-2' style={{color:'#17414F'}}>Better Ingredients</h3>
                        <p className='text-start m-0 p-0 mt-3' style={{color:'#727272',fontSize:'13px'}}> Only the best when you choose products offered on our platform - high quality</p>
                        <p className='text-start m-0 p-0 mb-5' style={{color:'#727272',fontSize:'13px'}}>ingredients for high quality products!</p>
                    </div>
                </Col>
                <Col className='m-0 px-0 px-sm-2 px-md-2 px-xl-2 d-flex' xl={3} lg={4} md={6} sm={6}>
                    <div className='m-0 p-0 w-100 px-3 ' style={{backgroundImage:`url(${Image2})`,backgroundPosition:'100%100%',backgroundSize:'100%100%',backgroundRepeat:'no-repeat',height:'170px',}}>
                        <Row className='mt-3 m-0 p-0 mx-2'>
                            <p className='text-start m-0 p-0 fw-bolder' style={{color:'#2D3F59',fontSize:'16px'}}>Vitamin C</p>
                            <p className='text-start mt-2 p-0' style={{color:'#727272',fontSize:'14px'}}>Vitamin C as ascorbic acid</p>
                        </Row>
                        <Row className='mx-2 h-50 d-flex justify-content-start align-items-end m-0 p-0'>
                            <div className='d-flex p-0 m-0 mb-3'>
                                <Button className='text-start bg-transparent border-0 p-0 m-0 mb-1 fw-bolder' style={{color:'#003569',textDecoration:'underline'}}>SEE MORE</Button>    
                            </div>             
                        </Row>
                    </div>
                </Col>
                <Col className='m-0 px-0 mt-5 mt-sm-0 mt-md-0 mt-lg-0 mt-xl-0 mt-xxl-0 px-md-2 px-sm-2 px-md-2 px-xl-2 d-flex' xl={3} lg={4} md={6} sm={6}>
                    <div className='m-0 p-0 w-100 px-3' style={{backgroundImage:`url(${Image3})`,backgroundPosition:'100%100%',backgroundSize:'100%100%',backgroundRepeat:'no-repeat',height:'170px'}}>
                        <Row className='mt-3 m-0 p-0 mx-2'>
                            <p className='text-start m-0 p-0 fw-bolder' style={{color:'#2D3F59',fontSize:'16px'}}>Vitamin B3</p>
                            <p className='text-start mt-2 p-0' style={{color:'#727272',fontSize:'14px'}}>Niacin for healthy gut and skin</p>
                        </Row>
                        <Row className='mx-2 h-50 d-flex justify-content-start align-items-end m-0 p-0'>
                            <div className='d-flex p-0 m-0 mb-3'>
                                <Button className='text-start bg-transparent border-0 p-0 m-0 mb-1 fw-bolder' style={{color:'#003569',textDecoration:'underline'}}>SEE MORE</Button>    
                            </div>             
                        </Row>
                    </div>
                </Col>
                <Col className='m-0 px-0 mt-5 mt-sm-5 mt-md-5 mt-lg-0 mt-xl-3 mt-xxl-3 px-md-2 px-sm-2 px-xl-2 d-flex' xl={3} lg={4} md={6} sm={6}>
                    <div className='m-0 p-0 w-100 px-3' style={{backgroundImage:`url(${Image4})`,backgroundPosition:'100%100%',backgroundSize:'100%100%',backgroundRepeat:'no-repeat',height:'170px'}}>
                        <Row className='m-0 h-50 p-0 mx-2'>
                            <p className='text-start mt-3 mb-2 p-0 fw-bolder' style={{color:'#2D3F59',fontSize:'16px'}}>Magnesium</p>
                            <p className='text-start m-0 p-0' style={{color:'#727272',fontSize:'14px'}}>Boost energy and support</p>
                            <p className='text-start m-0 p-0' style={{color:'#727272',fontSize:'14px'}}>muscle function</p>
                        </Row>
                        <Row className='mx-2 h-50 d-flex justify-content-start align-items-end m-0 p-0'>
                            <div className='d-flex p-0 m-0 mb-3'>
                                <Button className='text-start bg-transparent border-0 p-0 m-0 mb-1 fw-bolder' style={{color:'#003569',textDecoration:'underline'}}>SEE MORE</Button>    
                            </div>             
                        </Row>
                    </div>
                </Col>
                <Col className='m-0 px-0 mt-5 mt-sm-5 mt-md-5 mt-lg-5 mt-xl-3 mt-xxl-3 px-md-2 px-sm-2 px-xl-2 d-flex' xl={3} lg={4} md={6} sm={6}>
                    <div className='m-0 p-0 w-100 px-3' style={{backgroundImage:`url(${Image5})`,backgroundPosition:'100%100%',backgroundSize:'100%100%',backgroundRepeat:'no-repeat',height:'170px'}}>
                        <Row className='mt-0 h-50 m-0 p-0 mx-2'>
                            <p className='text-start mt-3 m-0 p-0 fw-bolder' style={{color:'#2D3F59',fontSize:'16px'}}>Hyaluronic Acid</p>
                            <p className='text-start m-0 mt-2 p-0' style={{color:'#727272',fontSize:'14px'}}>For smooth</p>
                            <p className='text-start m-0 p-0' style={{color:'#727272',fontSize:'14px'}}>supple and soft skin</p>
                        </Row>
                        <Row className='mx-2 my-0 h-50 d-flex justify-content-start align-items-end m-0 p-0'>
                            <div className='d-flex p-0 m-0 mb-3'>
                                <Button className='text-start bg-transparent border-0 p-0 m-0 mb-1 fw-bolder' style={{color:'#003569',textDecoration:'underline'}}>SEE MORE</Button>    
                            </div>             
                        </Row>
                    </div>
                </Col>
                <Col className='m-0 px-0 mt-5 mt-sm-5 mt-md-5 mt-lg-5 mt-xl-3 mt-xxl-3 px-sm-2 px-xl-2 px-md-2 d-flex' xl={3} lg={4} md={6} sm={6}>
                    <div className='m-0 p-0 w-100 px-3' style={{backgroundImage:`url(${Image6})`,backgroundPosition:'100%100%',backgroundSize:'100%100%',backgroundRepeat:'no-repeat',height:'170px'}}>
                    <Row className='m-0 p-0 h-50 mx-2'>
                            <p className='text-start mt-3 m-0 p-0 fw-bolder' style={{color:'#2D3F59',fontSize:'16px'}}>Lactobacillus</p>
                            <p className='text-start m-0 mt-2 p-0' style={{color:'#727272',fontSize:'14px'}}>Invigorate your gut</p>
                            <p className='text-start m-0 p-0' style={{color:'#727272',fontSize:'14px'}}>microbiome</p>
                        </Row>
                        <Row className='mx-2 h-50 d-flex justify-content-start align-items-end m-0 p-0'>
                            <div className='d-flex p-0 m-0 mb-3'>
                                <Button className='text-start bg-transparent border-0 p-0 m-0 mb-1 fw-bolder' style={{color:'#003569',textDecoration:'underline'}}>SEE MORE</Button>    
                            </div>             
                        </Row>
                    </div>
                </Col><Col className='m-0 px-0 mt-5 mt-sm-5 mt-md-5 mt-lg-5 mt-xl-3 mt-xxl-3 px-sm-2 px-md-2 px-xl-2 d-none d-xl-flex d-lg-flex d-md-flex d-sm-flex' xl={3} lg={4} md={6} sm={6}>
                    <div className='m-0 p-0 w-100 px-3' style={{backgroundImage:`url(${Image7})`,backgroundPosition:'100%100%',backgroundSize:'100%100%',backgroundRepeat:'no-repeat',height:'170px'}}>
                    </div>
                </Col>
            </Row>
        </div>
        <div className='m-0 p-0 w-100' style={{background:'#FFFFFF'}}>
        <Row className='d-flex p-0 m-0'>
            <Col className='d-flex justify-content-center align-items-center p-0 m-0 mt-5'>
                <div className='d-flex m-0 p-0 flex-column'>
                    <p className='m-0 p-0 text-center fw-bolder' style={{color:'#003569',fontSize:'14px'}}>OUR BLOG</p>
                    <h4 className='mt-1 p-0 text-start' style={{color:'#17414F'}}>Latest News</h4>
                </div>
            </Col>
        </Row>
        </div>
        <div className='p-0 m-0' style={{background:'#FFFFFF'}}>
            <Row className='w-100 m-0 p-0 px-xl-5 px-5'>
            <Col className='d-flex justify-content-center p-0 m-0 mt-xl-4' xl={3} lg={3} md={6} sm={6} xs={12}>
                <div className='w-100 m-0 p-0'>
                <Row className='m-0 p-0 d-flex' style={{height:'370px'}}>
                <div className='d-flex w-100 h-100 m-0 p-0 flex-column' style={{backgroundImage:`url(${Image8})`,backgroundSize:'95% 95%',backgroundPosition:'center',backgroundRepeat:'no-repeat',borderRadius:'40px'}}>
                    <p className='text-center fw-bolder m-0 p-0 mt-4' style={{height:'25px',width:'100px',color:'#FFFFFF',background:'#003569',borderTopRightRadius:'50px',borderBottomRightRadius:'50px'}}>20 APR</p>
                    <div className='d-flex flex-column mx-xl-4 mx-lg-4 mx-md-5 mx-sm-4 mx-5 mt-2'>
                        <p className='text-start fw-bolder px-xl-3 px-lg-2 px-md-3 px-sm-3 px-5 m-0 p-0' style={{fontSize:'16px',color:'#FFFFFF'}}>The Covid-19 Epidemic In 2022</p>
                        <p className='text-start fw-bolder m-0 px-xl-3 px-lg-2 px-md-3 px-sm- px-5' style={{fontSize:'16px',color:'#FFFFFF'}}>Is Back</p>
                    </div>
                </div>
                </Row>
                <Row className='p-0 m-0' style={{height:'203px'}}>
                    <div className='d-flex w-100 h-100 m-0 p-0 flex-column' style={{backgroundImage:`url(${Image9})`,backgroundSize:'95% 95%',backgroundPosition:'center',backgroundRepeat:'no-repeat',borderRadius:'30px'}}>
                        <p className='text-center fw-bolder m-0 p-0 mt-4 mt-sm-4' style={{height:'25px',width:'100px',color:'#FFFFFF',background:'#003569',borderTopRightRadius:'50px',borderBottomRightRadius:'50px'}}>20 APR</p>
                        <div className='d-flex flex-column mx-xl-4 mx-lg-4 mx-md-5 mx-sm-4 mx-5 mt-2 mt-sm-0'>
                            <p className='text-start fw-bolder px-xl-3 px-lg-2 px-md-3 px-sm-3 px-5 m-0 p-0' style={{fontSize:'16px',color:'#FFFFFF'}}>The Covid-19 Epidemic In 2022</p>
                            <p className='text-start fw-bolder p-0 m-0 px-xl-3 px-lg-2 px-md-3 px-sm-3 px-5' style={{fontSize:'16px',color:'#FFFFFF'}}>Is Back</p>
                        </div>
                    </div>
                </Row>
                </div>
            </Col>
            <Col className='d-flex justify-content-center m-0 p-0 mt-xl-4' xl={3} lg={3} md={6} sm={6} xs={12}>
            <div className='w-100 m-0 p-0'>
                <Row className='p-0 m-0' style={{height:'203px'}}>
                    <div className='d-flex w-100 h-100 p-0 flex-column p-0' style={{backgroundImage:`url(${Image10})`,marginTop:'4px',backgroundSize:'95% 95%',backgroundPosition:'center',backgroundRepeat:'no-repeat',borderRadius:'30px'}}>
                        <p className='text-center fw-bolder m-0 p-0 mt-4' style={{height:'25px',width:'100px',color:'#FFFFFF',background:'#003569',borderTopRightRadius:'50px',borderBottomRightRadius:'50px'}}>20 APR</p>
                        <div className='d-flex flex-column mx-xl-4 mx-lg-4 mx-md-5 mx-sm-4 mt-2 mt-sm-0 mx-5'>
                            <p className='text-start fw-bolder px-xl-3 px-lg-2 px-md-3 m-0 p-0 px-sm-3 px-5' style={{fontSize:'16px',color:'#FFFFFF'}}>The Covid-19 Epidemic In 2023</p>
                            <p className='text-start fw-bolder p-0 m-0 px-xl-3 px-lg-2 px-md-3 px-sm-3 px-5' style={{fontSize:'16px',color:'#FFFFFF'}}>Is Back</p>
                        </div>
                    </div>
                </Row>
                <Row className='m-0 p-0 d-flex' style={{height:'370px'}}>
                    <div className='d-flex w-100 h-100 p-0 flex-column' style={{backgroundImage:`url(${Image9})`,marginTop:'4px',backgroundSize:'95% 95%',backgroundPosition:'center',backgroundRepeat:'no-repeat',borderRadius:'40px'}}>
                        <div className='d-flex flex-column mx-4 mx-xl-4 mx-md-5 mt-5 mx-sm-4 mx-5'>
                            <p className='text-start fw-bolder px-xl-3 px-lg-2 px-md-3 px-sm-3 m-0 p-0 px-5' style={{fontSize:'16px',color:'#FFFFFF'}}>The Covid-19 Epidemic In 2022</p>
                            <p className='text-start fw-bolder p-0 m-0 px-xl-3 px-lg-2 px-md-3 px-sm-3 px-5' style={{fontSize:'16px',color:'#FFFFFF'}}>Is Back</p>
                        </div>
                    </div>
                </Row>
                </div>
            </Col>
            <Col className='d-flex justify-content-center m-0 p-0 mt-xl-4' xl={3} lg={3} md={6} sm={6} xs={12}>
            <div className='w-100 m-0 p-0'>
                <Row className='m-0 p-0 d-flex' style={{height:'370px'}}>
                <div className='d-flex w-100 h-100 m-0 p-0 flex-column' style={{backgroundImage:`url(${Image8})`,backgroundSize:'95% 95%',backgroundPosition:'center',backgroundRepeat:'no-repeat',borderRadius:'40px'}}>
                    <p className='text-center fw-bolder m-0 p-0 mt-4' style={{height:'25px',width:'100px',color:'#FFFFFF',background:'#003569',borderTopRightRadius:'50px',borderBottomRightRadius:'50px'}}>20 APR</p>
                    <div className='d-flex flex-column mx-xl-4 mx-lg-4 mt-xl-2 mt-lg-2 mt-md-2 mt-sm-2 mx-md-5 mx-sm-4 mx-5'>
                        <p className='text-start fw-bolder px-xl-3 px-lg-2 px-md-3 px-sm-3 m-0 p-0 px-5' style={{fontSize:'16px',color:'#FFFFFF'}}>The Covid-19 Epidemic In 2022</p>
                        <p className='text-start fw-bolder p-0 m-0 px-xl-3 px-lg-2 px-md-3 px-sm-3 px-5' style={{fontSize:'16px',color:'#FFFFFF'}}>Is Back</p>
                    </div>
                </div>
                </Row>
                <Row className='p-0 m-0' style={{height:'203px'}}>
                    <div className='d-flex w-100 h-100 p-0 m-0 flex-column' style={{backgroundImage:`url(${Image9})`,backgroundSize:'95% 95%',backgroundPosition:'center',backgroundRepeat:'no-repeat',borderRadius:'30px'}}>
                        <p className='text-center fw-bolder m-0 p-0 mt-4' style={{height:'25px',width:'100px',color:'#FFFFFF',background:'#003569',borderTopRightRadius:'50px',borderBottomRightRadius:'50px'}}>20 APR</p>
                        <div className='d-flex flex-column mx-xl-4 mx-lg-4 mt-lg-2 mt-xl-2 mx-md-5 mx-sm-4 mt-sm-0 mt-md-2 mx-5'>
                            <p className='text-start fw-bolder px-xl-3 px-lg-2 px-md-3 px-sm-3 m-0 p-0 px-5' style={{fontSize:'16px',color:'#FFFFFF'}}>The Covid-19 Epidemic In 2023</p>
                            <p className='text-start fw-bolder p-0 m-0 px-xl-3 px-md-3 px-lg-2 px-sm-3 px-5' style={{fontSize:'16px',color:'#FFFFFF'}}>Is Back</p>
                        </div>
                    </div>
                </Row>
                </div>
            </Col>
            <Col className='d-flex justify-content-center m-0 p-0 mt-xl-4' xl={3} lg={3} md={6} sm={6} xs={12}>
            <div className='w-100 m-0 p-0'>
            <Row className='p-0 m-0 ' style={{height:'203px'}}>
                    <div className='d-flex w-100 h-100 p-0 flex-column' style={{backgroundImage:`url(${Image10})`,marginTop:'4px',backgroundSize:'95% 95%',backgroundPosition:'center',backgroundRepeat:'no-repeat',borderRadius:'30px'}}>
                        <p className='text-center fw-bolder m-0 p-0 mt-4' style={{height:'25px',width:'100px',color:'#FFFFFF',background:'#003569',borderTopRightRadius:'50px',borderBottomRightRadius:'50px'}}>20 APR</p>
                        <div className='d-flex flex-column mx-xl-4 mx-lg-4 mx-md-5 mx-sm-4 mt-2 mt-sm-0 mx-5'>
                            <p className='text-start fw-bolder px-xl-3 px-lg-2 px-md-3 m-0 p-0 px-sm-3 px-5' style={{fontSize:'16px',color:'#FFFFFF'}}>The Covid-19 Epidemic In 2023</p>
                            <p className='text-start fw-bolder p-0 m-0 px-xl-3 px-lg-2 px-md-3 px-sm-3 px-5' style={{fontSize:'16px',color:'#FFFFFF'}}>Is Back</p>
                        </div>
                    </div>
                </Row>
                <Row className='m-0 p-0 d-flex' style={{height:'370px'}}>
                    <div className='d-flex w-100 h-100 p-0 flex-column' style={{backgroundImage:`url(${Image9})`,marginTop:'4px',backgroundSize:'95% 95%',backgroundPosition:'center',backgroundRepeat:'no-repeat',borderRadius:'40px'}}>
                        <p className='text-center fw-bolder m-0 p-0 mt-4' style={{height:'25px',width:'100px',color:'#FFFFFF',background:'#003569',borderTopRightRadius:'50px',borderBottomRightRadius:'50px'}}>17 MAR</p>
                        <div className='d-flex flex-column mx-xl-4 mx-lg-4 mt-xl-2 mt-lg-2 mt-md-2 mt-sm-2 mx-md-5 mx-sm-4 mx-5'>
                            <p className='text-start fw-bolder px-xl-3 px-lg-2 px-md-3 px-sm-3 m-0 p-0 px-5' style={{fontSize:'16px',color:'#FFFFFF'}}>Hac hendrerit mus nons semper</p>
                            <p className='text-start fw-bolder p-0 m-0 px-xl-3 px-lg-2 px-md-3 px-sm-3 px-5' style={{fontSize:'16px',color:'#FFFFFF'}}>Suspendisse</p>
                        </div>
                    </div>
                </Row>
                </div>
            </Col>
            </Row>
        </div>
        </div>
        </>
    )
};

export default  Home;