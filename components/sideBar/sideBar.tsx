import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Image from "next/image";
import React from "react";
import { FaHome } from "react-icons/fa";
import SideBarCards from "./SideBarCards";
import { FaTasks } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import SignOutBtn from "../signOutBtn";
export default async function SideBar({ link }: { link: string }) {
  const session = await getServerSession(options);
  console.log("session", session);
  return (
    <div className='h-[100vh] p-5 pt-8 w-1/5 bg-slate-100 rounded-r-md shadow-md flex flex-col gap-4 fixed top-0 left-0'>
      <div className='flex gap-2'>
        <h2 className='text-3xl text-center px-3 font-bold text-yellow-400'>
          NWH
        </h2>
      </div>

      <div className='px-3'>
        <div className='bg-white w-full h-10 flex items-center justify-center rounded-2xl p-2 overflow-hidden'>
          <Image src={"/static/search.svg"} width={20} height={20} alt='' />
          <input
            type='text'
            className='w-full focus:outline-none font-light text-sm'
            placeholder='Search anything...'
          />
        </div>
      </div>

      {/* NavLinks */}
      <div className='flex flex-col gap-2 mt-4 px-3'>
        <SideBarCards
          link='/'
          name='Dashboard'
          Icon={FaHome}
          active={link === "Dashboard" ? true : false}
        />
        <SideBarCards
          link='/'
          name='My tasks'
          Icon={FaTasks}
          active={link === "My tasks" ? true : false}
        />
        <SideBarCards
          link='/projects'
          name='Projects'
          Icon={FaBriefcase}
          active={link === "Projects" ? true : false}
        />
        <SideBarCards
          link='/users'
          name='Users'
          Icon={FaUsers}
          active={link === "Users" ? true : false}
        />
        <SideBarCards
          link='/clients'
          name='Clients'
          Icon={FaBriefcase}
          active={link === "Clients" ? true : false}
        />
      </div>

      <div className='mt-auto'>
        <SignOutBtn />
      </div>
    </div>
  );
}
