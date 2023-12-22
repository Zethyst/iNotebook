import { React, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = (props) => {

    const navigate = useNavigate();
    const location = useLocation();
    const [mobileView, setMobileView] = useState(false);

    useEffect(() => {
        // console.log(location)
    }, [location])

    const windowWidth = window.innerWidth;

    //if mobile view then close category panel automatically
    useEffect(() => {
      if (windowWidth<= 768) {
        setMobileView(true);
      }
    }, [])

    const [isNavOpen, setNavOpen] = useState(false);
    const [searchInput, setSearchInput] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
        props.onSearch(searchInput);
    };

    const handleEnterKey = (event) => {
        if (event.key === 'Enter') {
            handleSubmit(event);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    const toggleNavbar = () => {
        setNavOpen((prevState) => !prevState);
    };

    return (
        <>
            <div className="hero-anime">

                <div className="navigation-wrap bg-light start-header start-style">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 block md:flex gap-4 md:justify-start">
                                <nav className="navbar navbar-expand-md navbar-light">
                                    <div className="flex items-center justify-between w-full">
                                        <Link className="navbar-brand" to='/' style={{ fontWeight: "600" }}>
                                            {/* <i className="fa-solid fa-newspaper mr-3" style={{ scale: "1.4" }}></i> */}
                                            <ion-icon className="" name="book" style={{ scale: "1.4", transform: "translate(-8px,3px)" }}></ion-icon>
                                            <span>iNOTEBOOK</span>
                                        </Link>

                                        <button onClick={toggleNavbar} className="navbar-toggler btn-no-outline" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                            <span className="navbar-toggler-icon "></span>

                                        </button>
                                    </div>
                                </nav>

                                <div className={`md:flex ${isNavOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                                    } transition-all duration-500 ease-in-out  md:max-h-screen md:!opacity-100`}>
                                    <ul className={`flex flex-col md:flex-row items-start md:space-x-4 py-4 py-md-0 translate-y-2 opacity-100 ${mobileView? isNavOpen?"":"hidden":""}`}>
                                        <li className={`nav-item text-center pl-4 md:-translate-x-10 pl-md-0 ml-0 ml-md-4  ${location.pathname === "/" ? "active" : ""}`}>
                                            <Link className="nav-link" activeclassname="active" data-toggle="dropdown" to="/" >HOME</Link>
                                        </li>
                                        <li className={`nav-item text-center pl-4 md:-translate-x-10 pl-md-0 ml-0 ml-md-4  ${location.pathname === "/about" ? "active" : ""}`} >
                                            <Link className="font-medium nav-link  text-gray-700 " to="/about">ABOUT</Link>
                                        </li>

                                        <li className='mr-14'></li>

                                        <div className="wrapper">
                                            <div className="searchBar md:translate-x-4 md:-translate-y-1 sm:w-96 md:w-72">
                                                <input id="searchQueryInput" type="text" name="searchQueryInput" placeholder="Search" value={searchInput} onChange={handleSubmit} onKeyDown={handleEnterKey} />
                                                <button id="searchQuerySubmit" type="submit" name="searchQuerySubmit" onClick={handleSubmit}>
                                                    <svg className='ml-2' style={{ width: "24px", height: "24px" }} viewBox="0 0 24 24"><path fill="#666666" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </ul>
                                {!localStorage.getItem('token') ? <Link to={mobileView?`/login-app`:`/login`}>

                                    <div className={`button ${mobileView? isNavOpen?"":"hidden":""}`}><div className="button-layer"></div>
                                    <button className='btn  text-center text-sm font-bold rounded-3xl  mr-10 h-12 w-32  text-slate-800' >Login / Register</button> </div></Link> :
                                   
                                   <div className={`button ${mobileView? isNavOpen?"":"hidden":""}`}><div className="button-layer"></div>
                                        <button onClick={handleLogout} className='btn  text-center text-sm font-bold rounded-3xl  mr-10 h-12 w-24  text-slate-800' style={{ transform: "translate(0px)" }}>Sign Out</button>
                                    </div>
                                }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )

}

export default Navbar