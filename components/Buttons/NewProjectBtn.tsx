"use client";
import React from "react";
import { FaPlus } from "react-icons/fa";
export default function NewProjectBtn() {
  return (
    <button className='bg-black text-white py-2 w-full px-4 rounded-md font-light flex items-center justify-center'>
      New Project <FaPlus className='inline-block ml-2' />
    </button>
  );
}
