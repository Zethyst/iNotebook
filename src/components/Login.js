import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const ref = useRef(null);
    let navigate = useNavigate(); //New version of useHistory
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });

    const handleSignInChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const handleSignUpChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    const handleChange = (e)=>{
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const handleSignInOverlayClick = () => {
        ref.current.classList.remove('right-panel-active');
    }
    const handleSignUpOverlayClick = async () => {
        ref.current.classList.add('right-panel-active');

    }
    const handleSignInClick = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://127.0.0.1:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email: credentials.email, password: credentials.password })
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
        }
        catch (error) {
            props.showAlert("Error Occured", "danger");
            console.error('Error fetching notes:', error);
        }
    }
    const handleSignUpClick = async (e) => {
        e.preventDefault();
        try {
            console.log(credentials.name)
            const response = await fetch("http://127.0.0.1:5000/api/auth/createuser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name:credentials.name, email: credentials.email, password: credentials.password })
            });
            const json = await response.json();
            console.log(json)
            if (json.success) {
                //!Redirect
                localStorage.setItem('token', json.authtoken);
                props.showAlert("Congratulations! You've successfully created your account.", "success");
                navigate("/");
            }
            else {
                props.showAlert(json.error, "danger");
            }
        }
        catch (error) {
            console.error('Error fetching notes:', error);
        }
    }
    return (
        <div className='flex justify-center items-center py-3 '>
            <div className="Logincontainer " ref={ref} id="container">

                <div className="form-container sign-up-container">

                    <form action="/">

                        <h1 className='text-4xl font-semibold  text-center'>Create Account</h1>

                        <div className="social-container">

                            <a href="/" className="social"> <i className="fab fa-facebook-f"></i></a>
                            <a href="/" className="social"> <i className="fab fa-google-plus-g"></i></a>
                            <a href="/" className="social"> <i className="fab fa-linkedin-in"></i></a>
                        </div >

                        <span className='font-medium text-slate-500'>or use your email for registration</span>

                        <input type="text" name="name" value={credentials.name} onChange={handleChange} minLength={5} required placeholder="Name" />
                        <input type="email" name='email' value={credentials.email} onChange={handleChange} required placeholder="Email" />
                        <input type="password" name='password' value={credentials.password} onChange={handleChange} minLength={5} required placeholder="Password" />

                        <button disabled={credentials.name.length<5 || credentials.password.length<5} className='mt-3 hover:bg-[#ff2b2b]' onClick={handleSignUpClick}>Sign Up</button>

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

                        <input type="email" name='email' value={credentials.email} onChange={handleChange} placeholder="Email" />
                        <input type="password" name='password' value={credentials.password} onChange={handleChange} placeholder="Password" />

                        <a href="/" className='font-medium text-slate-500'>Forgot your password?</a>

                        <button className='hover:bg-[#ff2b2b]' onClick={handleSignInClick}>Sign In</button>

                    </form >

                </div >

                <div className="overlay-container">

                    <div className="overlay">

                        <div className="overlay-panel overlay-left">

                            <h1 className='text-4xl'> Hello, Friend!</h1 >

                            <p className='font-medium'>Begin your note-taking journey by providing your personal details.</p>

                            <button onClick={handleSignInOverlayClick} className="ghost" id="signIn">Sign In</button>

                        </div >

                        <div className="overlay-panel overlay-right" >

                            <h1 className='text-4xl'> Welcome Back! </h1>

                            <p>Log in with your information to access your valuable notes.</p>

                            <button onClick={handleSignUpOverlayClick} className="ghost" id="signUp">Sign Up</button>

                        </div >

                    </div >

                </div >

            </div >

        </div>
    )
}

export default Login