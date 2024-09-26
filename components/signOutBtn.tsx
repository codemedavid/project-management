"use client";
import React from "react";
import { signOut } from "next-auth/react";
export default function SignOutBtn() {
  const signingOut = () => {
    const logOut = signOut();
    console.log(logOut);
  };
  return (
    <button
      className='text-base bg-black text-white py-2 px-4 rounded-md font-light'
      onClick={signingOut}
    >
      Sign out
    </button>
  );
}
