import React from "react";
import SideBar from "@/components/sideBar/sideBar";
import Contents from "@/components/dashboard/Contents";
import { FaPlus } from "react-icons/fa";
import RightTicketApproval from "@/components/dashboard/RightTicketApproval";
import ProfileCard from "@/components/Profile/ProfileCard";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

export default async function Admin() {
  try {
    console.log("Fetching server session...");
    const session = await getServerSession(options);
    console.log("Session fetched:", session ? "Session exists" : "No session");

    return (
      <div className='text-black font-light flex justify-between gap-'>
        <div className='w-3/12'>
          <SideBar link='Dashboard' />
        </div>
        <div className='w-[53%] flex justify-center '>
          <Contents />
        </div>
        <div className='w-[22%] border-l border-slate-300'>
          <div className='h-60 bg-white w-full'>
            <ProfileCard
              session={
                session || { user: { name: "", username: "", email: "" } }
              }
            />
          </div>
          <div className='h-2/5 w-full p-2'>
            <div className='flex gap-3 justify-between px-4 items-center'>
              <p className='font-semibold '>Approve Tickets</p>
              <FaPlus
                className='font-thin rounded-full border p-1 border-black'
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
      </div>
    );
  } catch (error) {
    console.error("Error in Admin component:", error);
    return (
      <div>
        An error occurred while loading the dashboard. Please try again later.
      </div>
    );
  }
}
