import React from "react";
import SideBar from "@/components/sideBar/sideBar";
import Contents from "@/components/dashboard/Contents";
import { FaPlus } from "react-icons/fa";
import RightTicketApproval from "@/components/dashboard/RightTicketApproval";
import ProfileCard from "@/components/Profile/ProfileCard";
export default function Home() {
  return (
    <div className=' text-black font-light flex justify-between  gap-'>
      <div className='w-3/12'>
        <SideBar link='Dashboard' />
      </div>
      <div className='w-[53%] flex justify-center '>
        <Contents />
      </div>
      <div className='w-[22%] border-l border-slate-300'>
        <div className='h-2/5 bg-white w-full'>
          <ProfileCard />
        </div>
        <div className='h-2/5 w-full p-2'>
          <div className='flex gap-3 justify-between px-4 items-center'>
            <p className='font-semibold '>Approve Tickets</p>
            <FaPlus
              className='font-thin rounded-full  border p-1 border-black'
              color='black'
              size={20}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <RightTicketApproval />
            <RightTicketApproval />
            <RightTicketApproval />
          </div>
        </div>
      </div>
      {/* {session?.user && <SignOutBtn />} */}
    </div>
  );
}
