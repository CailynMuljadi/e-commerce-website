import { SignInButton } from '@clerk/nextjs';
import React from 'react';

const SignIn = () => {
  return (
    <SignInButton>
    <button className="text-sm font-semibold hover:text-darkColor text-lightColor hover:cursor-pointerhoverEffect">
     Login 
    </button>
    </SignInButton>
  );
};

export default SignIn;
