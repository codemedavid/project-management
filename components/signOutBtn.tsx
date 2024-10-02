"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { FaSignOutAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
export default function SignOutBtn() {
  const router = useRouter();
  const signingOut = () => {
    signOut();
    router.push("/");
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
