import React from "react";
import SideBar from "@/components/sideBar/sideBar";
import Contents from "@/components/dashboard/Contents";
export default function Home() {
  return (
    <div className=' text-black font-light flex justify-between'>
      <div className='w-[40%]'>
        <SideBar />
      </div>
      <div>
        <Contents />
      </div>
      <div className='w-[30%] border-l border-slate-300'></div>
      {/* {session?.user && <SignOutBtn />} */}
    </div>
  );
}
