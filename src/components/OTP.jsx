import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BarLoader from "./BarLoader";

const inputs = Array(4).fill(""); // create a blank array of 4 index
let newInputIndex = 0;
const baseURL = "https://inotebook-backend-platinum.onrender.com/api/auth";

export default function OTP(props) {
  const inputRef = useRef(null);
  const resendRef =useRef();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [OTP, setOTP] = useState({ 0: "", 1: "", 2: "", 3: "" });
  let [nextInputIndex, setNextInputIndex] = useState(0);

  //   console.log(props.ID);

  const BoxRefs = useRef();

  const CorrectOTP = () => {
    const boxRefsChildren = BoxRefs.current.children;

    // Loop through the children (input elements) and add the correct-otp class
    for (let i = 0; i < boxRefsChildren.length; i++) {
      const inputElement = boxRefsChildren[i];
      if (inputElement) {
        inputElement.classList.add('correct-otp');
  
        // Remove the class after the animation duration (adjust as needed)
        setTimeout(() => {
          inputElement.classList.remove('correct-otp');
        }, 2000);
        }
    }
  };
  const WrongOTP = () => {
    const boxRefsChildren = BoxRefs.current.children;

    // Loop through the children (input elements) and add the correct-otp class
    for (let i = 0; i < boxRefsChildren.length; i++) {
      const inputElement = boxRefsChildren[i];
      if (inputElement) {
        inputElement.classList.add('wrong-otp');
        inputElement.classList.add('Shake');
  
        // Remove the class after the animation duration (adjust as needed)
        setTimeout(() => {
          inputElement.classList.remove('wrong-otp');
          inputElement.classList.remove('Shake');
        }, 1200);
        }
    }
  };

  const isObjValid = (obj) => {
    let arr = Object.values(obj);
    return arr.every((val) => val.trim());
  };

  const handleOTPChange = (value, index) => {
    let newOTP = { ...OTP };
    newOTP[index] = value;
    setOTP(newOTP);

    let lastInputIndex = inputs.length - 1;
    if (!value) {
      newInputIndex = index === 0 ? 0 : index - 1;
    } else {
      newInputIndex = index === lastInputIndex ? lastInputIndex : index + 1;
    }

    setNextInputIndex(newInputIndex);
  };

  useEffect(() => {
    inputRef.current.focus();
  }, [nextInputIndex]);

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      handleOTPChange("", index);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isObjValid(OTP)) {
      var val = "";

      Object.values(OTP).forEach((v) => {
        val += v;
      });
      // Calling the verification function or API endpoint here
      try {
        setBusy(true);
        const response = await fetch(`${baseURL}/verify-email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ otp: val, UserID: props.ID }),
        });
        setBusy(false);
        const json = await response.json();
        if (json.success) {
            CorrectOTP();
            props.showAlert("E-mail verified successfully!", "success");
            setTimeout(() => {
                navigate("/");
            }, 1200);
        } else {
          props.showAlert(json.error, "danger");
        }
      } catch (error) {
          props.showAlert("Error Occured", "danger");
        }
        //   console.log("Entered OTP:", val);
    } else {
      props.showAlert("Please enter all 4 digits!", "danger");
      WrongOTP();
    }
  };

  const handleResend = async ()=>{
        try {
            setBusy(true);
            resendRef.current.title="Please wait upto 1 min after sending the OTP";
            resendRef.current.classList.add("text-gray-400");
            resendRef.current.classList.add("pointer-events-none");

            setTimeout(() => {
                resendRef.current.title="";
                resendRef.current.classList.remove("text-gray-400");
                resendRef.current.classList.remove("pointer-events-none");
            }, 30000);

            const { data } = await axios.post(
                `${baseURL}/resend`,{ email: props.email, ID: props.ID}
              );
              if (data.success) {
                props.showAlert("E-mail sent successfully!", "success");
              } else {
                props.showAlert(data.error, "danger");
              }
              setBusy(false);
        } catch (error) {
            setBusy(false);
            props.showAlert("Error Occured", "danger");
        }
  }

  return (
    <div className="overflow-hidden shadow-md rounded-3xl max-w-screen-sm w-80 md:w-96 m-auto mt-4 flex flex-col justify-center items-center">
      <div className="bg-[#ff4828] h-[50%] w-full p-10">
        <h1 className="font-semibold text-xl text-center text-white select-none">
          Verify Your E-mail Account!
        </h1>
      </div>
      <div className="h-[50%] w-full p-10 flex flex-col gap-8 justify-center items-center">
        <p className="text-center text-gray-500">{`We have sent an OTP to ${props.email}. Please enter it below to continue.`}</p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 justify-center items-center"
        >
          <div className="flex gap-4" ref={BoxRefs}>
            {inputs.map((digit, index) => (
              <input
                className="rounded-lg h-10 w-10 text-[#ff4828] text-center font-semibold custom-input"
                key={index}
                type="text"
                maxLength={1}
                value={OTP[index]}
                onChange={(e) => handleOTPChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={nextInputIndex === index ? inputRef : null}


              />
            ))}
          </div>
          {busy && <BarLoader/>}
          <button
            type="submit"
            className=" btn h-12 w-44 bg-[#ff4828] hover:bg-[#ff2828] uppercase text-center font-semibold text-white rounded-3xl"
          >
            Verify
          </button>
        </form>
        <p
          className="text-[#ff4828] font-semibold text-center cursor-pointer transition-all delay-100 ease-in"
          onClick={handleResend}
          title=""
          ref={resendRef}
        >
          Resend OTP
        </p>
      </div>
    </div>
  );
}
