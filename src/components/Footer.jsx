import React from 'react'
import { AiOutlineGithub, AiFillLinkedin } from "react-icons/ai";
import "./CSS/Footer.css"


const Footer = () => {
    return (
        <>
            <div className='main flex md:p-5 p-2 h-100px bg-gray-900 w-full  flex-col md:gap-5 gap-1  justify-center items-center md:flex-row md:justify-evenly md:text-xl text-sm'>
                {/* name */}
                <div className="name  md:m-[-65px] m-0">
                    ©2023 Moviewise | Devendra
                </div>
                {/* shouout */}
                <div className="shoutout md:block hidden">
                    Made With TMDB API
                </div>
                {/* links */}
                <div className="links flex gap-3 text-xl ">
                    <a href="https://github.com/DevendraBhoraniya"> <AiOutlineGithub /> </a>
                    <a href="https://www.linkedin.com/in/devendra-bhoraniya-ab517b250/"> <AiFillLinkedin /> </a>
                </div>
            </div>

        </>
    )
}

export default Footer
