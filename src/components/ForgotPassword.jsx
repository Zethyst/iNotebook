import React, { useState} from "react";
import Spinner from './Spinner';

import LockPersonRoundedIcon from '@mui/icons-material/LockPersonRounded';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

const baseURL = "http://localhost:5000/api/auth";

export default function ForgotPassword(props) {
    const [email, setEmail] = useState('');
    const [busy, setBusy] = useState(false);

    const handleOnChange = ({target})=>{
        const {value}=target;
        setEmail(value);
  }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            setBusy(true);
            const response = await fetch(`${baseURL}/forgot-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email})
            });
            const json = await response.json();
            setBusy(false);
            if (json.success) {
                //!Redirect
                props.showAlert("E-mail sent successfully!", "success");
            }
            else {
                props.showAlert(json.error, "danger");
            }
        } catch (error) {
            props.showAlert("Error Occured", "danger");
        }

    }

  return (
    <div className="shadow rounded-3xl max-w-screen-sm m-auto pt-10 mt-4 flex flex-col justify-center items-center">
            <div className="text-center"><LockPersonRoundedIcon fontSize="large" style={{scale:"1.6"}}/></div>
            <h1 className="my-3 uppercase font-extrabold text-3xl w-52 text-center" style={{fontFamily:"Poppins"}}>Forgot password</h1>
            <p>Provide your account's email for which you want to reset your password!</p>
            <form onSubmit={handleSubmit} className="w-full rounded-lg p-10 pt-4">
            <div className="space-y-6">
            <div className="flex bg-slate-100 justify-center items-center pl-3" style={{boxShadow:"0px 3px 1px rgb(166 173 185)"}}><EmailOutlinedIcon/><input type="email" name="email"  onChange={handleOnChange} className="px-3 text-lg h-12 w-full border-none outline-none rounded-sm bg-slate-100" placeholder="example@email.com"/></div>
            {busy && <Spinner/>}
            <input type="submit" name="" id="" value="Request Password Reset Email" className="btn px-3 text-lg h-10 w-full border-none rounded-sm uppercase font-semibold bg-yellow-300 hover:bg-yellow-400"/>
            </div>
            </form>
        </div>
  )
}
