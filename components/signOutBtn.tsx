"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { FaSignOutAlt } from "react-icons/fa";
export default function SignOutBtn() {
  const signingOut = () => {
    const logOut = signOut();
    console.log(logOut);
  };
  return (
    <button
      className='text-base w-12 bg-black text-white py-2 px-4 rounded-md font-light'
      onClick={signingOut}
    >
      <FaSignOutAlt className='mr-2' />
    </button>
  );
}
