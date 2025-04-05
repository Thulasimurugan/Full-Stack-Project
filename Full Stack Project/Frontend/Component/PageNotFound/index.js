import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import { FaHome } from "react-icons/fa";
import { Button,Row,Col } from 'react-bootstrap';
import ErrorImage from '../../Assets/Images/404-error-3d-icon-png.png';

function NotFound() {
    const navigate = useNavigate();
    return(
        <>
        <Helmet>
          <title>Page Not Found</title>
          <meta name="description" content="Only the best when you choose products offered on our platform - high quality
ingredients for high quality products!"/>
          <meta name="keywords" content="medical,medicine,tablet,hospital products,hospital,hospitals,vitamin,weight less,minerals"/>
        </Helmet>
        <Row className='w-100 d-flex h-100 m-0 p-0' style={{background: "#E2F5FB"}}>
            <Col className='d-flex justify-content-center align-items-center h-100 w-100 m-0 p-0' xl={12}>
                <div className="m-0 p-0 flex-column">
                    <div className='m-0 p-0 d-flex justify-content-center'>
                        <img src={ErrorImage} className='img-fluid' style={{height:'300px',width:'300px'}} alt='ErrorImage' />
                    </div>
                    <div className='flex-column m-0 p-0'>
                        <h3 className='m-0 p-0 text-center' style={{color:'#17414F'}}>Page Not Found</h3>
                        <p className='m-0 p-0 text-center fs-5 fw-bolder mt-1 mt-xl-2 mt-lg-2 mt-md-2 mt-sm-2 px-sm-0 px-5' style={{color:'#727272'}}>Sorry,We can't find the page you're looking for</p>
                        <div className='d-flex m-0 p-0 justify-content-center'>
                            <Button className="d-flex gap-2 px-md-4 p-2 mt-2 mt-xl-3 mt-lg-3 mt-md-3 mt-sm-3 border-0 rounded-5 fw-bolder mb-sm-0" onClick={() => navigate("/")} style={{background:'#17414F',color:'white'}}><FiLogIn className='fs-5 fs-md-4 fw-bolder mt-xl-1 mt-md-1'/><span className="d-none d-md-flex mb-1">Login</span></Button>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
        </>
    );
};

export default NotFound;