import React from "react";
import SideBar from "@/components/sideBar/sideBar";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { Metadata } from "next";
import { db } from "@/lib/db";
export const metadata: Metadata = {
  title: "Users",
};
export default async function Users() {
  const session = await getServerSession(options);
  const { user } = session || {};
  const role = user?.role;
  const users = await db.user.findMany();
  console.log(users);
  if (role !== "ADMIN") {
    return <div>You are not authorized to access this page</div>;
  }
  return (
    <div className=' text-black font-light flex justify-between px-4'>
      <div className='w-[30%]'>
        <SideBar link='Users' />
      </div>
      <div className='w-full py-10'>
        <div>
          <h2 className='text-2xl font-bold'>Users</h2>
        </div>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-2'></div>
        </div>
      </div>
    </div>
  );
}
