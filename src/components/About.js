import React from 'react'
import self from "../img/self.png"

const About = () => {
  return (
    <>
      <div className='flex justify-center items-center m-2'>
        <div className='w-[70%] h-[80vh] flex gap-5 justify-center items-center p-10' style={{ boxShadow: "0 1px 20px 0 rgba(0, 0, 0, 0.1)", borderRadius: "32px" }}>
          <img src={self} alt="Profile Picture" className='h-[70%] rounded-2xl' />
          <div className='flex flex-col gap-3 justify-center items-center mb-3' >
            <h1 className='font-bold text-4xl' style={{fontFamily:"Poppins,sans-serif"}}>So, who am I?</h1>
            <p className='text-stone-600'>Hi there! I'm Akshat Jaiswal, a Full-Stack Web Developer that eagers to create awesome websites with an remarkable user experience that evoke emotions. Also a deligient college student bringing forth a motivated attitude.</p>
            <p className='text-stone-600'>Passionate programmer obsessed with user's convenience, human centered approach. Have delivered projects an average of 10% before the deadline. Have entensive experience with React, and Nodejs. This skill set allows me to create responsive, user-friendly, and visually appealing websites</p>
            <a href="https://www.linkedin.com/in/akshat-jaiswal-4664a2197/" target='_blank'><button className='w-36 h-10 bg-[#e60023] text-white rounded-3xl' style={{fontFamily:"Poppins,sans-serif"}}>Contact Me</button></a>
          </div>
        </div>
      </div>
    </>
  )
}

export default About