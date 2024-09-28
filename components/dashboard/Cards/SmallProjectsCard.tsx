import React from "react";
import { FaArrowRight } from "react-icons/fa";

export default function SmallProjectsCard() {
  return (
    <div className='w-4/12 h-32 rounded-md shadow-md px-3 border border-yellow-300 '>
      <div className='w-full h-full flex flex-col justify-center items-start'>
        <p className='text-sm font-semibold'>Project Title</p>
        <p className='text-xs'>This is a project very short description</p>
        <button className='bg-black text-white px-2 py-1 mt-2 rounded-md text-xs font-semibold flex items-center'>
          View <FaArrowRight className='ml-1' />
        </button>
      </div>
    </div>
  );
}
