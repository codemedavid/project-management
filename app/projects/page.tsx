import React from "react";
import SideBar from "@/components/sideBar/sideBar";
export default function Projects() {
  return (
    <div className=' text-black font-light flex justify-between px-4'>
      <div className='w-[30%]'>
        <SideBar link='Projects' />
      </div>
      <div className='w-full py-10'></div>
    </div>
  );
}
