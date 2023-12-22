import React, { useRef, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import BarLoader from "./BarLoader";
import ErrorMessage from './ErrorMessage';

function LoginMobile(props) {

    const ref = useRef(null);
    const [busy, setBusy] = useState(false);
    const [isNameEmpty, setIsNameEmpty] = useState(false);
    const [isEmailEmpty, setIsEmailEmpty] = useState(false);
    const [isNameFocused, setNameFocus] = useState(false);
    const [isPWDEmpty, setIsPWDEmpty] = useState(false);
    const [isPWDFocused, setPWDFocus] = useState(false);
    let navigate = useNavigate(); //New version of useHistory
    // const [credentials, setcredentials] = useState({ name: "", email: "", password: "" });

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

    const handleSignInAppOverlayClick = () => {
        ref.current.classList.add('bottom-panel-active');
    }
    const handleSignUpAppOverlayClick = () => {
        ref.current.classList.remove('bottom-panel-active');
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
                props.showAlert("Login successful!", "success");
                navigate("/");
            }
            else {
                props.showAlert(json.error, "danger");
            }
            setBusy(false);
        }
        catch (error) {
            setBusy(false);
            props.showAlert("Error Occured", "danger");
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
                body: JSON.stringify({name:props.credentials.name, email: props.credentials.email, password: props.credentials.password })
            });
            const json = await response.json();
            props.setID(json.ID);
            // console.log(json)
            if (json.success) {
                //!Redirect
                localStorage.setItem('token', json.authtoken);
                props.showAlert("Congratulations! You've successfully created your account.", "success");
                navigate("/verify-email");
            }
            else {
                props.showAlert(json.error, "danger");
            }
            setBusy(false);
        }
        catch (error) {
            setBusy(false);
            console.error('Error fetching notes:', error);
        }
    }
  return (
    <div className='max-w-screen-sm flex justify-center items-center py-2  m-auto rounded-md'>
        <div ref={ref} className='Logincontainer-app w-full min-h-[620px] flex flex-col justify-center items-center rounded-xl overflow-hidden'>
            <div className='overlay-container-app absolute top-20 h-[25%] w-[100%] overflow-hidden z-50 transition-transform duration-500 ease-in-out'>
                <div className='overlay-app text-white bg-[#ff416c] translate-y-0 flex justify-center items-center w-[100%] h-[200%] transition-transform duration-500 ease-in-out bg-no-repeat bg-cover' style={{background:"linear-gradient(to right, #ff4b2b, #ff416c)"}}></div>
                    <div className='overlay-panel-app  overlay-bottom gap-3 translate-y-0 text-white relative top-0 flex flex-col justify-center items-center px-11 text-center h-[100%] w-[100%] transition-transform duration-500 ease-in-out'>
                    <h1 className='text-2xl'> Welcome Back! </h1 >

                    <p className='font-medium text-sm leading-5 tracking-wide'>Log in with your information to access your valuable notes.</p>

                    <button onClick={handleSignUpAppOverlayClick} className="ghost btn text-white text-sm font-semibold w-24 rounded-2xl " id="signUp">Sign Up</button>     
                    </div>
                    <div className='overlay-panel-app  overlay-top gap-3 translate-y-0 text-white absolute top-0 flex flex-col justify-center items-center px-11 text-center h-[100%] w-[100%] transition-transform duration-500 ease-in-out'>
                    <h1 className='text-2xl'> Hello, Friend!</h1 >

                    <p className='font-medium text-sm leading-5 tracking-wide'>Begin your note-taking journey by providing your personal details.</p>

                    <button onClick={handleSignInAppOverlayClick} className="ghost btn text-white text-sm font-semibold w-24 rounded-2xl " id="signIn">Sign In</button>     
                    </div>
            </div>
            <div className='form-container-app sign-in-container-app p-12 absolute bg-transparent top-1  w-full h-[70%] transition-transform duration-500 ease-in-out'>
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
            </div>
            <div className='form-container-app sign-up-container-app p-12 absolute  w-full h-[70%] transition-transform duration-500 ease-in-out'>
              <form action="/">
               <h1 className='text-4xl font-semibold  text-center'>Create Account</h1>

                <div className="social-container">

                    <a href="/" className="social"> <i className="fab fa-facebook-f"></i></a>
                    <a href="/" className="social"> <i className="fab fa-google-plus-g"></i></a>
                    <a href="/" className="social"> <i className="fab fa-linkedin-in"></i></a>
                </div >

                <span className='font-medium text-slate-500'>or use your email for registration</span>

                <input className={`${isNameEmpty && props.credentials.name.length < 3 ? 'invalidInput' : ''} loginInputExtended rounded-lg`} type="text" name="name" value={props.credentials.name} onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus} minLength={5} required placeholder="Name" />
                {(isNameEmpty && !isNameFocused) || (props.credentials.name.length < 3 && isNameFocused) && (
                    <ErrorMessage msg='Name must be greater than 3 characters long!' />)}
                <input className={`${isEmailEmpty ? 'invalidInput' : ''} loginInputExtended rounded-lg`} type="email" name='email' value={props.credentials.email} onChange={handleChange} onBlur={handleBlur} required placeholder="Email" />
                <input className={`${isPWDEmpty && props.credentials.password.length < 5 ? 'invalidInput' : ''} loginInputExtended rounded-lg`} type="password" name='password' value={props.credentials.password} onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus} minLength={5} required placeholder="Password" />
                {(isPWDEmpty && !isPWDFocused) || (props.credentials.password.length < 5 && isPWDFocused) && (
                    <ErrorMessage msg='Password must be greater than 5 characters long!' />)}
                {busy && <BarLoader/>}

                <button disabled={ busy || (props.credentials.name.length<3 || props.credentials.password.length<5)} className='mt-3 hover:bg-[#ff2b2b]' onClick={handleSignUpClick}>Sign Up</button>

                 </form>
            </div>
        </div>
    </div>
  )
}

export default LoginMobile