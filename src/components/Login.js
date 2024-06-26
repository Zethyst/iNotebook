import React, { useRef, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import BarLoader from "./BarLoader";
import ErrorMessage from './ErrorMessage';
import { useDispatch } from "react-redux";
import { showMessage } from "../store/reducers/notificationSlice";

const Login = (props) => {
    const ref = useRef(null);
    const [busy, setBusy] = useState(false);
    const [isNameEmpty, setIsNameEmpty] = useState(false);
    const [isEmailEmpty, setIsEmailEmpty] = useState(false);
    const [isNameFocused, setNameFocus] = useState(false);
    const [isPWDEmpty, setIsPWDEmpty] = useState(false);
    const [isPWDFocused, setPWDFocus] = useState(false);
    const [selectedImage64, setSelectedImage64] = useState("");
    const [selectedImage, setSelectedImage] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('User Type');

    const toggleMenu = () => {
        setIsOpen(!isOpen);
      };
    
      const selectOption = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
      };

    let navigate = useNavigate(); //New version of useHistory
    // const [credentials, setcredentials] = useState({ name: "", email: "", password: "" });
    const dispatch = useDispatch();

    const handleChange = (e)=>{
        props.setCredentials({ ...props.credentials, [e.target.name]: e.target.value });
        if (e.target.name === 'name') {
            setIsNameEmpty(e.target.value.trim() === '')
        }
        if (e.target.name === 'email') {
            setIsEmailEmpty(e.target.value.trim() === '')
        }
        if (e.target.name === 'password') {
            setIsPWDEmpty(e.target.value.trim() === '')
        }
    }
    const handleBlur = (e) => {
        // Check if the input is empty on blur and update the class
        if (e.target.name === 'name') {
            setIsNameEmpty(e.target.value.trim() === '')
            setNameFocus(false);
        }
        if (e.target.name === 'password') {
            setIsPWDEmpty(e.target.value.trim() === '')
            setPWDFocus(false);
        }
      };
      const handleFocus = (e) => {
        if (e.target.name === 'name') {
            setNameFocus(true);
        }
        if (e.target.name === 'password') {
            setPWDFocus(true);
        }
      };

    const handleSignInOverlayClick = () => {
        ref.current.classList.remove('right-panel-active');
    }
    const handleSignUpOverlayClick = async () => {
        ref.current.classList.add('right-panel-active');

    }
    const handleSignInClick = async (e) => {
        e.preventDefault();
        try {
            setBusy(true);
            const response = await fetch("https://inotebook-backend-platinum.onrender.com/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email: props.credentials.email, password: props.credentials.password })
            });
            const json = await response.json();
            // console.log(json)
            if (json.success) {
                //!Redirect
                localStorage.setItem('token', json.authtoken);
                dispatch(showMessage({ message: `Welcome! Login successful`, messageType: 'success' }));
                navigate("/");
            }
            else {
                dispatch(showMessage({ message: json.error, messageType: 'error' }));
            }
            setBusy(false);
        }
        catch (error) {
            setBusy(false);
            dispatch(showMessage({ message: 'Login failed', messageType: 'error' }));
            console.error('Error fetching notes:', error);
        }
    }
    const handleSignUpClick = async (e) => {
        e.preventDefault();
        try {
            // console.log(props.credentials.name)
            setBusy(true);
            const response = await fetch("https://inotebook-backend-platinum.onrender.com/api/auth/createuser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name:props.credentials.name, 
                    email: props.credentials.email, 
                    password: props.credentials.password, 
                    type:selectedOption,
                    image:selectedImage64 
                })
            });
            const json = await response.json();
            props.setID(json.ID);
            // console.log(json)
            if (json.success) {
                //!Redirect
                localStorage.setItem('token', json.authtoken);
                dispatch(showMessage({ message: "Congratulations! You've successfully created your account", messageType: 'success' }));
                navigate("/verify-email");
            }
            else {
                dispatch(showMessage({ message: json.error, messageType: 'error' }));
            }
            setBusy(false);
        }
        catch (error) {
            setBusy(false);
            dispatch(showMessage({ message: `Error Occured: ${error}`, messageType: 'error' }));
            console.error('Error fetching notes:', error);
        }
    }
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
        // console.log(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setSelectedImage64(reader.result);
        };
        reader.onerror=(err)=>{
            console.log("Error:",err);
        }
    };
    return (
        <div className='flex justify-center items-center py-2 m-10'>
            <div className="Logincontainer" ref={ref} id="container">

                <div className="form-container sign-up-container">

                    <form action="/">

                        <h1 className='text-4xl font-semibold  text-center my-3'>Create Account</h1>

                        {/* <div className="social-container">

                            <a href="/" className="social"> <i className="fab fa-facebook-f"></i></a>
                            <a href="/" className="social"> <i className="fab fa-google-plus-g"></i></a>
                            <a href="/" className="social"> <i className="fab fa-linkedin-in"></i></a>
                        </div >

                        <span className='font-medium text-slate-500'>or use your email for registration</span> */}

                        <input className={`${isNameEmpty && props.credentials.name.length < 3 ? 'invalidInput' : ''} loginInputExtended rounded-lg`} type="text" name="name" value={props.credentials.name} onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus} minLength={5} required placeholder="Name" />
                        {(isNameEmpty && !isNameFocused) || (props.credentials.name.length < 3 && isNameFocused) && (
                            <ErrorMessage msg='Name must be greater than 3 characters long!' />)}
                        <input className={`${isEmailEmpty ? 'invalidInput' : ''} loginInputExtended rounded-lg`} type="email" name='email' value={props.credentials.email} onChange={handleChange} onBlur={handleBlur} required placeholder="Email" />
                        <input className={`${isPWDEmpty && props.credentials.password.length < 5 ? 'invalidInput' : ''} loginInputExtended rounded-lg`} type="password" name='password' value={props.credentials.password} onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus} minLength={5} required placeholder="Password" />
                        {(isPWDEmpty && !isPWDFocused) || (props.credentials.password.length < 5 && isPWDFocused) && (
                            <ErrorMessage msg='Password must be greater than 5 characters long!' />)}
                        {busy && <BarLoader/>}

                        <div className='dropdown my-2'>
                                <div className='select' onClick={toggleMenu}>
                                    <div className='selected'>{selectedOption}</div>
                                    <div className={`caret ${isOpen ? 'caret-rotate' : ''}`}></div>
                                </div>
                                <ul className={`menu ${isOpen ? 'menu-open' : ''}`}>
                                    <li onClick={() => selectOption('Free')}>Free</li>
                                    <li onClick={() => selectOption('Developer')}>Developer</li>
                                    <li onClick={() => selectOption('Premium')}>Premium</li>
                                    <li onClick={() => selectOption('Business')}>Business</li>
                                </ul>
                        </div>

                        <div className="image-input my-2">
                                <input type="file" accept="image/*" id="imageInput"  onChange={handleImageChange}/>
                                <label htmlFor="imageInput" className="image-button"><i className="far fa-image"></i> Choose image</label>
                                {selectedImage?<p className='m-2 font-semibold'>{selectedImage.name}</p>:""}
                        </div>
                        <button disabled={ busy || (props.credentials.name.length<3 || props.credentials.password.length<5)} className='mt-3 hover:bg-[#ff2b2b]' onClick={handleSignUpClick}>Sign Up</button>

                    </form >

                </div >

                <div className="form-container sign-in-container">

                    <form action="/">

                        <h1 className='text-4xl font-semibold'>Sign in</h1>

                        <div className="social-container">

                            <a href="a" className="social"><i className="fab fa-facebook-f"></i></a>

                            <a href="" className="social"><i className="fab fa-google-plus-g"></i></a>

                            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>

                        </div>

                        <span className='font-medium text-slate-500'> or use your account </span>

                        <input className={`${isEmailEmpty ? 'invalidInput' : ''} loginInputExtended rounded-lg`} type="email" name='email' value={props.credentials.email} onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus} placeholder="Email" />
                        <input className={`${isPWDEmpty && props.credentials.password.length < 5 ? 'invalidInput' : ''} loginInputExtended rounded-lg`} type="password" name='password' value={props.credentials.password} onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus} placeholder="Password" />
                        {(isPWDEmpty && !isPWDFocused) || (props.credentials.password.length < 5 && isPWDFocused) && (
                            <ErrorMessage msg='Password must be greater than 5 characters long!' />)}
                        <Link to="/forgot-password" className='font-medium text-slate-500 hover:text-red-400'>Forgot your password?</Link>
                        {busy && <BarLoader/>}
                        <button disabled={busy || (props.credentials.email.length<7 || props.credentials.password.length<5)} className='hover:bg-[#ff2b2b]' onClick={handleSignInClick}>Sign In</button>

                    </form >
                    </div >

                <div className="overlay-container">

                    <div className="overlay">

                        <div className="overlay-panel overlay-left">

                            <h1 className='text-4xl'> Hello, Friend!</h1 >

                            <p className='font-medium'>Begin your note-taking journey by providing your personal details.</p>

                            <button onClick={handleSignInOverlayClick} className="ghost btn" id="signIn">Sign In</button>

                        </div >

                        <div className="overlay-panel overlay-right" >

                            <h1 className='text-4xl'> Welcome Back! </h1>

                            <p>Log in with your information to access your valuable notes.</p>

                            <button onClick={handleSignUpOverlayClick} className="ghost btn" id="signUp">Sign Up</button>

                        </div >

                    </div >

                </div >

            </div >

        </div>
    )
}

export default Login