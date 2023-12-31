import React, { useState } from 'react';
import "./CSS/Header.css"
import { Link } from 'react-router-dom';
import { SignInButton, SignOutButton, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';

const Header = () => {
  const [toggle, setToggle] = useState(false)

  const handleLinkClick = () => {
    setToggle(false); // Hide the mobile header when a link is clicked
  };
  return (
    <>
      <div className="header flex h-fit items-center justify-between nd:p-4 p-2 mb-0 ">
        <div className="header-right">
          <Link to="/"><img className='header-icon' src="/logo.png" alt="" /></Link>
        </div>
        <div className="header-left">
          {/* desktop view */}
          <div className='mr-4 hidden md:block'>
            <div className='flex flex-row h-fit items-center'>
              <div>
                <Link to="/movies/popular" className='p-3' >Popular</Link>
                <Link to="/movies/top_rated" className='p-3'>Top Rated</Link>
                <Link to="/movies/upcoming" className='p-3'>Upcoming</Link>
                <Link to="/search" className='p-3'>Search</Link>
              </div>
              <div>
                <SignedIn>
                  <div className='flex h-fit items-center' >
                    <SignOutButton routing="path" path="/">
                      <p className=' cursor-pointer p-4 font-normal text-base '>Logout</p>
                    </SignOutButton>
                    <UserButton />
                  </div>
                </SignedIn>
                <SignedOut>
                  <SignInButton routing='path' path="/sign-in"  >
                    <p className=' cursor-pointer p-4 font-normal text-base '>Login</p>
                  </SignInButton>
                </SignedOut>
              </div>
            </div>
          </div>
          {/* mobile header */}
          <div className="mobile block md:hidden">
            <button
              onClick={() => setToggle(!toggle)}
              className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400 md:hidden"
            >
              <svg
                className={`fill-current h-3 w-3 ${toggle ? "hidden" : "block"}`}
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
              <svg
                className={`fill-current h-3 w-3 ${toggle ? "block " : "hidden"}`}
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`absolute z-[2] w-full ${toggle ? "block animate-slide-down" : "hidden"}`}>
        <div className={`bg-black/90 text-white flex flex-col gap-5 p-4 justify-center items-center ${toggle ? "block animate-fade-in" : "hidden"}`} >
          <Link to="/movies/popular" className='p-3' onClick={handleLinkClick}>Popular</Link>
          <Link to="/movies/top_rated" className='p-3' onClick={handleLinkClick}>Top Rated</Link>
          <Link to="/movies/upcoming" className='p-3' onClick={handleLinkClick}>Upcoming</Link>
          <Link to="/search" className='p-3' onClick={handleLinkClick}>Search</Link>
          <div onClick={handleLinkClick}>
                <SignedIn>
                  <div className='flex h-fit items-center' >
                    <SignOutButton routing="path" path="/">
                      <p className=' cursor-pointer p-4 text-base'>Logout</p>
                    </SignOutButton>
                    <UserButton />
                  </div>
                </SignedIn>
                <SignedOut>
                  <SignInButton routing='path' path="/sign-in"  >
                    <p className=' cursor-pointer p-4 font-normal text-base '>Login</p>
                  </SignInButton>
                </SignedOut>
              </div>
        </div>
      </div>
    </>
  )
}

export default Header
