import { useState } from 'react';
import Image1 from '../../Assets/Images/product-8-400x400.png.png';
import Profile from '../../Assets/Images/userProfile1.png';
import { RiTeamLine } from "react-icons/ri";
import { HiClipboardCheck } from "react-icons/hi";
import { CgNotes } from "react-icons/cg";
import { LiaNotesMedicalSolid } from "react-icons/lia";
import { MdMenu, MdClose, MdOutlineAccountCircle, MdLightMode, MdDarkMode, } from 'react-icons/md';
import { GiMedicines, GiMedicinePills, GiChemicalDrop } from 'react-icons/gi';
import { FaCartPlus, FaHospitalUser, FaMoneyBill1Wave, FaUserInjured, FaUsers, FaUserTie } from "react-icons/fa6";
import { CiCircleInfo, CiMobile3, CiHeart, CiUser, CiTablets1, CiCalendar, CiMenuFries } from "react-icons/ci";
import { FiShoppingCart } from "react-icons/fi";
import { IoIosArrowDown, IoIosLogOut } from 'react-icons/io';
import { IoHomeOutline } from 'react-icons/io5';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { popup } from '../Popup';
import { Button, Offcanvas, OffcanvasBody, OffcanvasHeader } from 'react-bootstrap';
import Auth from '../../Auth';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isTheme, setIsTheme] = useState("Dark");
    const [activeDropDown, setActiveDropDown] = useState(null);
    const [menuDropDown, setMenuDropDown] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    const navBar = [
        {
            navName: "Main",
            navIcon: <CiMenuFries className='fs-5' />,
            navDownIcon: <IoIosArrowDown className='fs-5' style={{ transform: activeDropDown === "Main" ? "rotate(180deg)" : "" }} />
        },
        {
            navName: "Our Team",
            navIcon: <RiTeamLine className='fs-5' />,
            navDownIcon: <IoIosArrowDown className='fs-5' style={{ transform: activeDropDown === "Our Team" ? "rotate(180deg)" : "" }} />
        },
        {
            navName: "Vitamin Store",
            navIcon: <GiMedicinePills className='fs-5' />,
            navDownIcon: <IoIosArrowDown className='fs-5' style={{ transform: activeDropDown === "Vitamin Store" ? "rotate(180deg)" : "" }} />
        },
        {
            navName: "Patient Care",
            navIcon: <FaUserInjured className='fs-5' />,
            navDownIcon: <IoIosArrowDown className='fs-5' style={{ transform: activeDropDown === "Patient Care" ? "rotate(180deg)" : "" }} />
        },
    ];

    const navBarMainMenu = [
        {
            navName: "My WishList",
            navIcon: <CiHeart className='fs-5' />,
        },
        {
            navName: "My Cart",
            navIcon: <FaCartPlus className='fs-5' />,
        },
        {
            navName: "Contact Us",
            navUrl: "/contact",
            navIcon: <CiMobile3 className='fs-5' />,
        },
        {
            navName: "About Us",
            navUrl: "/about",
            navIcon: <CiCircleInfo className='fs-5' />,
        },
    ]

    const navBarOurTeam = [
        {
            navName: "Doctors & Specialists",
            navIcon: <CiUser className='fs-5' />,
        },
        {
            navName: "Nutritionists",
            navIcon: <FaHospitalUser className='fs-5' />,
        },
        {
            navName: "Pharmacists",
            navIcon: <FaUserTie className='fs-5' />,
        },
        {
            navName: "Support Staff",
            navIcon: <FaUsers className='fs-5' />,
        },
    ]

    const navBarVitaminStore = [
        {
            navName: "Vitamin A (Retinol)",
            navIcon: <GiMedicines className='fs-5' />,
        },
        {
            navName: "Vitamin B",
            navIcon: <CiTablets1 className='fs-5' />,
        },
        {
            navName: "Vitamin C (Ascorbic Acid)",
            navIcon: <GiMedicines className='fs-5' />,
        },
        {
            navName: "Vitamin E (Tocopherol)",
            navIcon: <CiTablets1 className='fs-5' />,
        },
        {
            navName: "Calcium & Megnesium",
            navIcon: <GiMedicinePills className='fs-5' />,
        },
        {
            navName: "Iron & Zinc",
            navIcon: <GiMedicinePills className='fs-5' />,
        },
        {
            navName: "Omega-3 Fatty Acids",
            navIcon: <GiMedicinePills className='fs-5' />,
        },
    ]

    const navBarPatientCare = [
        {
            navName: "Book Consultation",
            navIcon: <CiCalendar className='fs-5' />,
        },
        {
            navName: "Schedule Lap Tests",
            navIcon: <GiChemicalDrop className='fs-5' />,
        },
        {
            navName: "Medical Records",
            navIcon: <LiaNotesMedicalSolid className='fs-5' />,
        },
        {
            navName: "Test Results",
            navIcon: <HiClipboardCheck className='fs-5' />,
        },
        {
            navName: "Prescription History",
            navIcon: <CgNotes className='fs-5' />,
        },
        {
            navName: "Billing & Insurance",
            navIcon: <FaMoneyBill1Wave className='fs-5' />,
        },
    ]

    const navBarSideIcons = [
        {
            navName: "Home",
            navUrl: "/home",
            navIcon: <IoHomeOutline className='fs-5' />,
        },
        {
            navName: "Account",
            navIcon: <MdOutlineAccountCircle className='fs-5' />,
        },
        {
            navName: "Shop",
            navIcon: <FiShoppingCart className='fs-5' />,
        },
        {
            navName: "Logout",
            navUrl: "/",
            navIcon: <IoIosLogOut className='fs-5' />,
        },

    ];

    const handleChangeActiveDropDown = (dropDown) => {
        setActiveDropDown(activeDropDown === dropDown ? null : dropDown)
    }

    const handleLogout = () => {
        Auth.logout(() => {
            navigate("/")
        })
    };

    const handleMenuOpen = (url) => {
        if (url) {
            window.location.href = `${url}`;
        }
        setIsMenuOpen(!isMenuOpen);
    };

    const handleSetMenuDropDown = (dropDown) => {
        switch (dropDown) {
            case "Main":
                return setMenuDropDown(navBarMainMenu);

            case "Our Team":
                return setMenuDropDown(navBarOurTeam);

            case "Vitamin Store":
                return setMenuDropDown(navBarVitaminStore)

            case "Patient Care":
                return setMenuDropDown(navBarPatientCare)

            default:
                return setMenuDropDown([]);
        }
    }

    const headerContent = () => (
            <>
                <div className='m-0 p-0 flex-rows d-flex w-100 gap-3'>
                    <img
                        src={Profile}
                        style={{ height: '60px', width: '60px', border: isTheme === "Dark" ? "none" : '2px solid #003569' }}
                        className={"d-flex rounded-5"}
                        alt='logo_image' />
                    <div className='d-flex align-items-center w-100 m-0 p-0'>
                        <div className='m-0 p-0 d-flex flex-column'>
                            <p className='m-0 p-0 fw-bolder w-100' style={{ fontSize: '16px', color: isTheme === "Dark" ? 'white' : '#003569' }} >Hello, Welcome!</p>
                            <p className='m-0 p-0 w-100' style={{ fontSize: '14px', color: isTheme === "Dark" ? 'white' : '#003569' }}>Thulasi Murugan</p>
                        </div>
                    </div>
                </div>
                <Button
                    className='bg-transparent m-0 p-0 border-0 d-flex'
                    onClick={() => handleMenuOpen()}
                >
                    <MdClose className='fs-1 m-0 p-0 fw-bolder' style={{ color: isTheme === "Dark" ? 'white' : '#003569' }} />
                </Button>
            </>
        )

    const bodyContent = () => (
        <>
            <p className='m-0 p-0 d-flex fw-bolder' style={{ color: isTheme === "Dark" ? 'white' : '#003569' }}>Theme</p>
            <div className='p-1 d-flex flex-row m-0 rounded-2' style={{ maxWidth: '180px', background: isTheme === "Dark" ? 'rgba(0,0,0, 0.5)' : 'rgba(255, 255, 255, 0.5)' }}>
                <Button
                    id='Dark'
                    className='m-0 py-1 px-3 d-flex align-items-center justify-content-center gap-1 border-0'
                    onClick={() => setIsTheme("Light")}
                    style={{ background: isTheme === "Dark" ? "none" : "rgba(0,0,0,0.4)" }}
                >
                    <MdLightMode
                        className='fw-bolder m-0 p-0 fw-bolder'
                        style={{ fontSize: '20px', color: isTheme === "Dark" ? 'white' : '#003569' }}
                    />
                    <span style={{ fontSize: '13px', color: isTheme === "Dark" ? 'white' : '#003569' }} className="fw-bolder">Light</span>
                </Button>
                <Button
                    id='Dark'
                    className='m-0 py-1 px-3 d-flex align-items-center justify-content-center gap-1 border-0'
                    onClick={() => setIsTheme("Dark")}
                    style={{ background: isTheme === "Dark" ? "rgba(255, 255, 255, 0.4)" : "none" }}
                >
                    <MdDarkMode
                        className='fw-bolder m-0 p-0'
                        style={{ fontSize: '20px', color: isTheme === "Dark" ? 'white' : '#003569' }}
                    />
                    <span style={{ fontSize: '13px', color: isTheme === "Dark" ? 'white' : '#003569' }} className="fw-bolder">Dark</span>
                </Button>
            </div>
            <div>
                <nav className='py-1 w-100 h-100 m-0'>
                    <ul className='nav m-0 p-0'>
                        <li className='d-none d-sm-flex flex-column m-0 py-2 w-100'>
                            {mobileNavBar([...navBar])}
                        </li>
                        <li className='d-flex d-sm-none flex-column m-0 py-2 w-100'>
                            {mobileNavBar([...navBarSideIcons, ...navBar])}
                        </li>
                    </ul>
                </nav>
            </div>
            <div className='mt-2 p-0 w-100'>
                <Button
                    className='w-100 bg-transparent fw-bolder rounded-5'
                    style={{ color: isTheme === "Dark" ? 'white' : '#003569', backgroundColor: isTheme === "Dark" ? '#003569' : "#E2F5FB", border: isTheme === "Dark" ? "2px solid #FFFFFF" : "2px solid #003569" }}
                    onClick={() => handleLogout()}
                >
                    Logout
                </Button>
            </div>
        </>
    )

    const mobileNavBar = (mobileNavigationBar) => (
        <>{mobileNavigationBar.filter((values) => values.navUrl !== location.pathname && values.navName !== "Logout").map((navigation, index) => (
            <div className='m-0 p-0'>
                {navigation.navUrl ? <Link
                    key={index}
                    // to={navigation.navUrl}
                    onClick={() => handleMenuOpen(navigation.navUrl)}
                    className={`d-flex my-2 p-0 gap-2 text-decoration-none align-items-center bg-transparent border-0 w-100${navigation.navName === 'Contact' ? 'd-lg-none' : 'd-flex'}`}
                >
                    <div className='d-flex m-0 p-0 p-1 rounded-3' style={{ background: isTheme === "Dark" ? "rgba(255, 255, 255,0.4)" : "rgba(0, 0, 0, 0.4)" }}>
                        <p className='m-0 p-0 fw-bolder' style={{ color: isTheme === "Dark" ? 'white' : '#003569' }}>{navigation.navIcon}</p>
                    </div>
                    <div className='m-0 p-0 d-flex w-100 justify-content-between'>
                        <span className='nav-link m-0 p-0 d-flex fw-bolder' style={{ color: isTheme === "Dark" ? 'white' : '#003569' }}>{navigation.navName}</span>
                    </div>
                </Link> : <Button
                    key={index}
                    onClick={() => { handleChangeActiveDropDown(navigation.navName); handleSetMenuDropDown(navigation.navName) }}
                    className='d-flex my-2 p-0 gap-2 text-decoration-none align-items-center bg-transparent border-0 w-100'
                >
                    <div className='d-flex m-0 p-0 p-1 rounded-3' style={{ background: isTheme === "Dark" ? "rgba(255, 255, 255,0.4)" : "rgba(0, 0, 0, 0.4)" }}>
                        <p className='m-0 p-0 fw-bolder' style={{ color: isTheme === "Dark" ? 'white' : '#003569' }}>{navigation.navIcon}</p>
                    </div>
                    <div className='m-0 p-0 d-flex w-100 justify-content-between'>
                        <span className='nav-link m-0 p-0 d-flex fw-bolder' style={{ color: isTheme === "Dark" ? 'white' : '#003569' }}>{navigation.navName}</span>
                        <p className='d-flex m-0 p-0' style={{ color: isTheme === "Dark" ? 'white' : '#003569' }}>{navigation.navDownIcon}</p>
                    </div>
                </Button>}
                {activeDropDown === navigation.navName && menuDropDown.length > 0 && (
                    <div className='px-3 mt-4 d-flex'>
                        <div className="w-100">
                            <ul className="list-unstyled m-0">
                                {menuDropDown.filter((values) => values.navUrl !== location.pathname && values.navUrl).length !== 0 ? menuDropDown.filter((values) => values.navUrl !== location.pathname && values.navUrl).map((values, menuDropDownIndex) => (
                                    <li className="mb-1" key={menuDropDownIndex}>
                                        <Link onClick={() => { handleMenuOpen(values.navUrl); handleChangeActiveDropDown(); }} className="text-decoration-none d-flex flex-row gap-2 mb-3 align-items-center" style={{ color: isTheme === "Dark" ? 'white' : '#003569' }}>
                                            <div className='d-flex m-0 p-1 rounded-3' style={{ background: isTheme === "Dark" ? "rgba(255, 255, 255,0.4)" : "rgba(0, 0, 0, 0.4)", border: isTheme === "Dark" ? "2px solid white" : '2px s' }}>
                                                <p className='m-0 p-0 fw-bolder' style={{ color: isTheme === "Dark" ? 'white' : '#003569' }}>{values.navIcon}</p>
                                            </div>
                                            <p className="d-flex m-0 p-0 fw-bolder">{values.navName}</p>
                                        </Link>
                                    </li>
                                )) : <p className='m-0 p-0 fw-bolder w-100 text-center' style={{color: "#FFFFFF" }}>Oops! No Menu available right now.</p>}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        ))}</>
    )

    return (
        <>
            <header className="position-relative py-3" style={{ background: '#E2F5FB' }}>
                <div className='d-flex align-items-center px-4 px-sm-5'>
                    <div className='w-100 d-flex align-items-center justify-content-between'>
                        {/* Logo Block*/}
                        <div className='m-0 p-0 d-flex gap-2 align-items-center'>
                            <img src={Image1} style={{ height: '35px', width: '35px', border: '3px solid #003569' }} className='rounded-5 m-00000' alt='Image1' />
                            <div className='m-0 p-0 d-flex align-items-center '>
                                <p className='m-0 fw-bold p-0 fs-4' style={{ color: '#003569' }}>AyurVita Care</p>
                            </div>
                        </div>
                        {/* Desktop Navigation */}
                        <nav className="m-0 p-0 d-xl-flex d-none">
                            <div className="m-0 p-0 mx-auto">
                                <ul className='nav gap-3 p-0 m-0'>
                                    {navBar.map((navigation, navBarIndex) => (
                                        <li key={navBarIndex} className="nav-item m-0 p-0">
                                            <div className='position-relative'>
                                                <Button
                                                    className='nav-link m-0 py-1 px-2 fw-bold bg-transparent gap-3 d-flex'
                                                    style={{ color: '#003569', border: '2px solid #003569' }}
                                                    key={navBarIndex}
                                                    onClick={() => { handleChangeActiveDropDown(navigation.navName); handleSetMenuDropDown(navigation.navName) }}
                                                >
                                                    <span>{navigation.navName}</span>
                                                    <span>{navigation.navDownIcon}</span>
                                                </Button>
                                                {activeDropDown === navigation.navName && (
                                                    <div
                                                        className="position-absolute bg-light mt-2 rounded-3 shadow p-3"
                                                        style={{
                                                            border: '2px solid #003569',
                                                            minWidth: '250px',
                                                            zIndex: 1002,
                                                            top: '100%',
                                                            left: '0'
                                                        }}
                                                    >
                                                        <div className="w-100">
                                                            <p className="m-0 p-0 mb-2 fw-bold" style={{ color: '#003569' }}>
                                                                {navigation.navName} Menu
                                                            </p>
                                                            <ul className="list-unstyled m-0">
                                                                {menuDropDown.filter((values) => values?.navUrl !== location.pathname && values?.navUrl).length !== 0  ? menuDropDown.filter((values) => values?.navUrl !== location.pathname && values?.navUrl).map((values, menuIndex) => (
                                                                    <li className="mb-1" key={menuIndex}>

                                                                        <Link to={values.navUrl} onClick={() => { handleChangeActiveDropDown(); window.location.href = `${values.navUrl}` }} className="text-decoration-none d-flex flex-row gap-2" style={{ color: '#003569' }}>
                                                                            <p className='p-1 m-0 d-flex fw-bolder'>{values.navIcon}</p>
                                                                            {values.navName}
                                                                        </Link>
                                                                    </li>
                                                                )) : <p className='m-0 p-0 fw-bolder w-100' style={{color: "#003569" }}>Oops! No Menu available right now.</p>}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </nav>
                        <div className='m-0 p-0 d-flex flex-row'>
                            <nav className='flex-rows gap-3 d-flex m-0 p-0 d-sm-flex d-none'>
                                {navBarSideIcons.filter((values) => values.navUrl !== location.pathname).map((navigation, navBarSideIconsIndex) => (
                                    <Link
                                        className='rounded-5 d-flex p-2'
                                        style={{ border: "3px solid white", background: '#003569' }}
                                        onClick={() => window.location.href = `${navigation.navUrl}`}
                                        key={navBarSideIconsIndex}
                                    >
                                        <span className='fw-bolder d-flex m-0 p-0' style={{ color: "white" }}>{navigation.navIcon}</span>
                                    </Link>
                                ))}
                            </nav>
                            { /* Mobile Navigation Button */}
                            <div className='m-0 p-0 d-flex d-xl-none px-sm-3'>
                                <Button
                                    className='bg-transparent m-0 p-0 border-0'
                                    onClick={() => { handleMenuOpen() }}
                                >
                                    <MdMenu className='fs-1 m-0 p-0 fw-bolder' style={{ color: '#003569' }} />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {/* Mobile Navigation */}
            {popup.offCanvas({
                show: isMenuOpen,
                placement: 'end',
                headerContent: headerContent,
                bodyContent: bodyContent,
                canvasClassname: '',
                canvasStyle: { backgroundColor: isTheme === "Dark" ? '#003569' : "#E2F5FB", padding: '4px' },
                headerClassname: 'px-3 py-4 d-flex m-0 p-0 d-flex justify-content-between align-items-center',
                headerStyle: { borderBottom: isTheme === "Dark" ? '1px solid white' : "1px solid #003569" },
                bodyClassname: 'm-0',
                bodyStyle: {},
            })}
            {/* <Offcanvas show={isMenuOpen} onHide={handleMenuOpen} placement='end' style={{ backgroundColor: isTheme === "Dark" ? '#003569' : "#E2F5FB", padding: '4px' }}>
                <OffcanvasHeader className='px-3 py-4 d-flex m-0 p-0 d-flex justify-content-between align-items-center' style={{ borderBottom: isTheme === "Dark" ? '1px solid white' : "1px solid #003569" }}>
                    <div className='m-0 p-0 flex-rows d-flex w-100 gap-3'>
                        <img
                            src={Profile}
                            style={{ height: '60px', width: '60px', border: isTheme === "Dark" ? "none" : '2px solid #003569' }}
                            className={"d-flex rounded-5"}
                            alt='logo_image' />
                        <div className='d-flex align-items-center w-100 m-0 p-0'>
                            <div className='m-0 p-0 d-flex flex-column'>
                                <p className='m-0 p-0 fw-bolder w-100' style={{ fontSize: '16px', color: isTheme === "Dark" ? 'white' : '#003569' }} >Hello, Welcome!</p>
                                <p className='m-0 p-0 w-100' style={{ fontSize: '14px', color: isTheme === "Dark" ? 'white' : '#003569' }}>Thulasi Murugan</p>
                            </div>
                        </div>
                    </div>
                    <Button
                        className='bg-transparent m-0 p-0 border-0 d-flex'
                        onClick={() => handleMenuOpen()}
                    >
                        <MdClose className='fs-1 m-0 p-0 fw-bolder' style={{ color: isTheme === "Dark" ? 'white' : '#003569' }} />
                    </Button>
                </OffcanvasHeader>
                <OffcanvasBody className='m-0 p-0'>
                    <p className='m-0 p-0 d-flex fw-bolder' style={{ color: isTheme === "Dark" ? 'white' : '#003569' }}>Theme</p>
                    <div className='p-1 w-50 d-flex flex-row m-0 rounded-2' style={{ background: isTheme === "Dark" ? 'rgba(0,0,0, 0.5)' : 'rgba(255, 255, 255, 0.5)' }}>
                        <Button
                            id='Dark'
                            className='m-0 py-1 px-3 d-flex align-items-center justify-content-center gap-1 border-0'
                            onClick={() => setIsTheme("Light")}
                            style={{ background: isTheme === "Dark" ? "none" : "rgba(0,0,0,0.4)" }}
                        >
                            <MdLightMode
                                className='fw-bolder m-0 p-0 fw-bolder'
                                style={{ fontSize: '20px', color: isTheme === "Dark" ? 'white' : '#003569' }}
                            />
                            <span style={{ fontSize: '13px', color: isTheme === "Dark" ? 'white' : '#003569' }} className="fw-bolder">Light</span>
                        </Button>
                        <Button
                            id='Dark'
                            className='m-0 py-1 px-3 d-flex align-items-center justify-content-center gap-1 border-0'
                            onClick={() => setIsTheme("Dark")}
                            style={{ background: isTheme === "Dark" ? "rgba(255, 255, 255, 0.4)" : "none" }}
                        >
                            <MdDarkMode
                                className='fw-bolder m-0 p-0'
                                style={{ fontSize: '20px', color: isTheme === "Dark" ? 'white' : '#003569' }}
                            />
                            <span style={{ fontSize: '13px', color: isTheme === "Dark" ? 'white' : '#003569' }} className="fw-bolder">Dark</span>
                        </Button>
                    </div>
                    <div>
                        <nav className='py-1 w-100 h-100 m-0'>
                            <ul className='nav m-0 p-0'>
                                <li className='d-none d-sm-flex flex-column m-0 py-2 w-100'>
                                    {mobileNavBar([...navBar])}
                                </li>
                                <li className='d-flex d-sm-none flex-column m-0 py-2 w-100'>
                                    {mobileNavBar([...navBarSideIcons, ...navBar])}
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className='mt-2 p-0 w-100'>
                        <Button
                            className='w-100 bg-transparent fw-bolder rounded-5'
                            style={{ color: isTheme === "Dark" ? 'white' : '#003569', backgroundColor: isTheme === "Dark" ? '#003569' : "#E2F5FB", border: isTheme === "Dark" ? "2px solid #FFFFFF" : "2px solid #003569" }}
                            onClick={() => handleLogout()}
                        >
                            Logout
                        </Button>
                    </div>
                </OffcanvasBody>
            </Offcanvas> */}
        </>
    )
}

export default Header;