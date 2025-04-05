import React from 'react';
import {Row, Col, Button} from 'react-bootstrap';
import UserOffLineImage from '../../Assets/Images/OffLine.png';
import { IoIosRefresh } from 'react-icons/io';

function UserOffLine() {
    const handleRefresh = () => {
        window.location.reload();
    }
    return(
        <>
            <Row className='d-flex align-items-center m-0 p-0 w-100' style={{background: "#E2F5FB"}}>
                <Col className='d-flex justify-content-center align-items-center m-0 p-0' xl={12}>
                    <div className='m-0 p-0 flex-column'>
                        <div className='d-flex align-items-center justify-content-center'>
                            <img src={UserOffLineImage} className='img-fluid' alt='UserOffLine'/>
                        </div>
                        <div className='flex-column m-0 p-0'>
                            <p className='fw-bolder fs-5 m-0 p-0 mt-1 text-center'>You're offline</p>
                            <p className='m-0 p-0 fs-6 '>Please connect to the internet and try again</p>
                            <div className='w-100 m-0 p-0 d-flex justify-content-center'>
                            <Button className="d-flex gap-2 px-md-4 p-2 mt-2 mt-xl-3 mt-lg-3 mt-md-3 mt-sm-3 border-0 rounded-5 fw-bolder mb-sm-0" onClick={() => handleRefresh()} style={{background:'#17414F',color:'white'}}><IoIosRefresh className='fs-5 fs-md-4 fw-bolder mt-xl-1 mt-md-1'/><span className="d-none d-md-flex mb-1">Refresh</span></Button>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    );
};
export default UserOffLine;