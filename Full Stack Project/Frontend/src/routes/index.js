import React from "react";
import { Helmet } from "react-helmet";
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../Component/Layout";

const HomeLayout = React.lazy(() => import('../Layout/Home'));
const ContactLayout = React.lazy(() => import('../Layout/Contact'));
const AboutLayout = React.lazy(() => import('../Layout/About'));
const RegisterLayout = React.lazy(() => import('../Layout/Register'));
const LoginLayout = React.lazy(() => import('../Layout/Login'));
const ForgotLayout = React.lazy(() => import('../Layout/Forgot'));
const NotFoundLayout = React.lazy(() => import('../Layout/PageNotFound'));
const OffLineLayout = React.lazy(() => import('../Layout/UserOffline'));
const UserDetailsLayout = React.lazy(() => import('../Layout/userDetails'));
const PrivateRoutes = React.lazy(() => import('../Component/PrivateRoutes'));

function Routers() {

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return (
      window.removeEventListener('online', handleOnline),
      window.removeEventListener('offline', handleOffline)
    )
  }, []);

  return (
    // <Router>
    //   {isOnline ? (
    //     <><Routes>
    //     <Route path="/" element={<LoginLayout />} />
    //     <Route path="/register" element={<RegisterLayout />} />
    //     <Route element={<PrivateRoutes />}>
    //         <Route path="/home" element={<HomeLayout />} />
    //         <Route path="/contact" element={<ContactLayout />} />
    //     </Route>
    //     <Route path="*" element={<NotFoundLayout />} />
    //   </Routes></>
    //   ) : (
    //     <><Routes>
    //         <Route path="*" element={<OffLineLayout />} />
    //       </Routes></>
    //   )}
    // </Router>
    <Router>
      <Routes>
        <Route path="/" element={<LoginLayout />} />
        <Route path="/register" element={<RegisterLayout />} />
        <Route path="/forgot" element={< ForgotLayout />} />
        <Route element={<PrivateRoutes />}>
          <Route element={<Layout />}>
            <Route path='/home' element={<HomeLayout />} />
            <Route path="/contact" element={<ContactLayout />} />
            <Route path='/about' element={<AboutLayout />} />
          </Route>
        </Route>
        <Route path="/userDetails" element={<UserDetailsLayout />} />
        <Route path="*" element={<NotFoundLayout />} />
        <Route path="/offline" element={<OffLineLayout />} />
      </Routes>
    </Router>
  );
}

export default Routers;
