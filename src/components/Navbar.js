import { React, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'


const Navbar = () => {
    const location = useLocation();
    useEffect(() => {
        // console.log(location)
    }, [location])

    const [isNavOpen, setNavOpen] = useState(false);
    const toggleNavbar = () => {
        setNavOpen((prevState) => !prevState);
    };
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark text-light ">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">iNotebook</Link>
                    <button onClick={toggleNavbar} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`md:flex  ${isNavOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 '
                        } transition-all duration-300 ease-in-out  md:max-h-screen md:!opacity-100`}>
                        {/* <div className=" navbar-collapse" id="navbarSupportedContent"> */}
                        <ul className="navbar-nav flex justify-between items-center md:w-[900px] mb-2 mb-lg-0">
                            <div className='md:flex pr-96'>
                                <li className="nav-item">
                                    <Link className={`nav-link  ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/home">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link  ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                                </li>
                            </div>
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar