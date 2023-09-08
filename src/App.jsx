import React from 'react'
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/clerk-react";
import Home from './Pages/Home';

if (!import.meta.env.VITE_API_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
const clerkPubKey = import.meta.env.VITE_API_CLERK_PUBLISHABLE_KEY;

const ClerkAuth = () => {
  return (
    <>
      <ClerkProvider publishableKey={clerkPubKey}>
        <SignedIn>
          <Home />
        </SignedIn>
        <SignedOut>
          <Home />
        </SignedOut>
      </ClerkProvider>
    </>
  );
};

function App() {

  return (
    <>
      {/* <div className="signin flex flex-col items-center justify-center h-[100vh] ">
         <span className='text-[3rem] font-semibold ' >
          First Sign in To Dive in to Movies
         </span> 
         <a href="/sign-in" className='text-[1.5rem] bg-gray-700 rounded-lg p-3' >SIGN IN</a>
      </div> */}
      <ClerkAuth />

    </>
  )
}

export default App
