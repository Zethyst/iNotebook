import React, { useState, useEffect} from "react";
import { useLocation,useNavigate, Link } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";
import MailLockIcon from '@mui/icons-material/MailLock';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VerifiedIcon from '@mui/icons-material/Verified';

const baseURL = "https://inotebook-backend-platinum.onrender.com/api/auth";
export default function ResetPassword(props) {
  const location = useLocation(); //because location has the pathname (url) and search paramenter which has the query
  const navigate = useNavigate();
  const [invalidUser, setInvalidUser] = useState("");
  const [busy, setBusy] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [newPassword, setNewPassword] = useState({
    password:'',
    confirmPassword:''
  });

  const { token, id } = queryString.parse(location.search); //extracting ?token and id from url
  const verifyToken = async () => {
    try {
      await axios(
        `${baseURL}/verify-token?token=${token}&id=${id}`
      );
     //?axios can be used in place of fetch and it uses get request
     setBusy(false);

    } catch (error) {
        setBusy(false);
      if (error?.response?.data) {
        const {data}=error.response;

        if (!data.success) {
            return setInvalidUser(data.error);
          }

        return console.log(error.response.data);
      }
      console.log(error);
    }
  };
  useEffect(() => {
    verifyToken();
  }, []);

  //obj.key or obj[key] works the same
  const handleOnChange = ({target})=>{
        const {name,value}=target;
        setNewPassword({...newPassword,[name]:value}); //[name]:value works exactly like newPassword.name:value or newPassword.confirmPassword:value
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    const {password, confirmPassword} = newPassword;
    if (password.trim().length < 5) {
        return setError("Password must be atleast 5 characters long!");
    }
    if (password !== confirmPassword) {
        return setError("Passwords do not match! Please check and try again.");
    }
    try {
        setBusy(true);
        const { data } = await axios.post(
          `${baseURL}/reset-password?token=${token}&id=${id}`,{password}
        );
       //?axios can be used in place of fetch and it uses get request
       setBusy(false);

       if (data.success) {
           navigate("/reset-password");
            setSuccess(true);
       }
  
      } catch (error) {
        setBusy(false);
        if (error?.response?.data) {
          const {data}=error.response;
  
          if (!data.success) {
              return setError(data.error);
            }
  
          return console.log(error.response.data);
        }
        console.log(error);
      }
  }
  if (success) {
    return <>
       <div className="shadow-lg rounded-3xl max-w-screen-sm  w-[350px] md:w-[640px] m-auto pt-14 p-10 mt-4 flex space-y-10 flex-col justify-center items-center">
            <h1 className="my-3 uppercase font-extrabold text-3xl w-52 text-center" style={{fontFamily:"Poppins"}}>Password Updated</h1>
            <div className="text-center"><VerifiedIcon fontSize="large" style={{scale:"2.6"}}/></div>
            <p>Your password has been updated!</p>
            <Link to="/login"><button className="bg-slate-900 text-white h-12 w-44 uppercase">Login</button></Link>
        </div>;
    </>
  }
  if (invalidUser) {
    return <>
        <div className="max-w-screen-sm m-auto pt-40">
            <h1 className="text-center text-3xl text-gray-500 mb-3">{invalidUser}</h1>
        </div>
    </>
  }
  if (busy) {
    return <>
        <div className="max-w-screen-sm m-auto pt-40">
            <h1 className="text-center text-3xl text-gray-500 mb-3">Wait for a moment</h1>
            <h1 className="text-center text-3xl text-gray-500 mb-3">Verifying Reset Token...</h1>
        </div>
    </>
  }
  return <div className="shadow rounded-3xl max-w-screen-sm  w-[350px] md:w-[640px] md:gap-1 gap-2 m-auto pt-10 mt-1 flex flex-col justify-center items-center">
            <div className="text-center"><MailLockIcon fontSize="large" style={{scale:"1.6"}}/></div>
            <h1 className="my-3 uppercase font-extrabold text-3xl w-52 text-center" style={{fontFamily:"Poppins"}}>New Credentials</h1>
            <p>Your identity has been verified!</p>
            <p className="-translate-y-2">Set your new password!</p>
            <form onSubmit={handleSubmit} className="w-full rounded-lg p-10 pt-4">
                {error && <p className="text-center p-2 mb-3 bg-red-500 text-white">{error}</p>}
            <div className="space-y-6">
            <div className="flex bg-slate-100 justify-center items-center pl-3" style={{boxShadow:"0px 3px 1px rgb(166 173 185)"}}><LockOutlinedIcon/><input type="password" name="password" onChange={handleOnChange} id="" className="px-3 text-lg h-12 w-full border-none outline-none rounded-sm bg-slate-100" placeholder="New Password"/></div>
            <div className="flex bg-slate-100 justify-center items-center pl-3" style={{boxShadow:"0px 3px 1px rgb(166 173 185)"}}><LockOutlinedIcon/><input type="password" name="confirmPassword" onChange={handleOnChange} id="" className="px-3 text-lg h-12 w-full border-none outline-none rounded-sm bg-slate-100" placeholder="Confirm Password"/></div>
            <input type="submit" name="" id="" value="Update" className="btn px-3 text-lg h-10 w-full border-none rounded-sm uppercase font-semibold bg-yellow-300 hover:bg-yellow-400"/>
            </div>
            </form>
        </div>;
}
