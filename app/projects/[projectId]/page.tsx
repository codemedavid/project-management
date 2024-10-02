import React from "react";
import SideBar from "@/components/sideBar/sideBar";
import Link from "next/link";
import { FaTelegram } from "react-icons/fa";
import Image from "next/image";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { SiGooglemeet } from "react-icons/si";
import NewTicketBtn from "@/components/Buttons/NewTicketBtn";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { db } from "@/lib/db";
import AddDetails from "@/components/Buttons/AddDetails";
export default async function Projects({
  params,
}: {
  params: { projectId: string };
}) {
  const project = await db.project.findUnique({
    where: {
      id: parseInt(params.projectId),
    },
  });

  const {
    title,
    description,
    Niche,
    Platform,
    Rate,
    Video_Type,
    editor_id,
    project_manager_id,
  } = project || {};

  const editor = await db.user.findUnique({
    where: {
      id: editor_id,
    },
  });
  const { name, email } = editor || {};

  console.log("new project", project);

  const session = await getServerSession(options);
  const { user } = session || {};
  const myId = user?.id.toString();
  const role = user?.role;
  const projectManagerId = project_manager_id?.toString();
  if (!session) {
    return <div>Loading...</div>;
  }
  if (myId !== projectManagerId && role !== "ADMIN") {
    return <div>You are not authorized to access this project</div>;
  }

  return (
    <div className=' text-black font-light flex justify-between px-4'>
      <div className='w-[30%]'>
        <SideBar link='Projects' />
      </div>
      <div className='w-full py-10'>
        {/* UpperCorner */}
        <div className='flex justify-between'>
          <div>
            <h1 className='text-3xl font-bold'>{title}</h1>
            <p className='text-xl text-slate-500'>{description}</p>
          </div>
          <div className='flex flex-col gap-4 w-72 bg-slate-200 rounded-lg p-2'>
            <div className='flex gap-4'>
              <Image
                src='/static/sirandy.jpg'
                alt='profile'
                width={60}
                height={60}
                className='bg-blue-500 text-white rounded-full'
              />
              <div>
                <span className='font-bold'>Editor Profile</span>

                <p>{name}</p>
                <p className='text-xs'>{email}</p>
              </div>
            </div>

            <div className='text-sm px-3 pr-5 whitespace-nowrap overflow-hidden overflow-ellipsis'>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
                quo fugit ut.
              </p>
            </div>
            <div className='flex justify-end gap-2'>
              <Link
                href={""}
                className='bg-black text-white p-1 rounded-md text-sm'
              >
                See Profile
              </Link>
              <Link href={""}>
                <FaTelegram color='#24A1DE' size={30} />
              </Link>
            </div>
          </div>
        </div>
        {/* DownCorner */}
        <div className='flex justify-between mt-10 items-center'>
          <div className='flex gap-5'>
            <h4 className='text-xl font-bold'>Tickets</h4>
            <div>
              <div className='flex gap-2 items-center'>
                <FaMagnifyingGlass size={17} />
                <input
                  type='text'
                  placeholder='Search'
                  className='focus:outline-none'
                />
              </div>
            </div>
          </div>

          <div className='flex gap-2'>
            {Platform == null ||
            Video_Type == null ||
            Rate == null ||
            Niche == null ? (
              <AddDetails />
            ) : (
              <NewTicketBtn />
            )}
            <button className='bg-black text-white p-2 rounded-md text-sm flex gap-2 items-center justify-center'>
              <SiGooglemeet size={20} color='yellow' />
            </button>
          </div>
        </div>

        {/* All Tickets Table */}
        <div className=' flex flex-col gap-2 w-full  h-[40vh] justify-center items-center text-center text-xl mt-10'>
          {Platform == null ||
          Video_Type == null ||
          Rate == null ||
          Niche == null ? (
            <p>Please add Client or Project Details to Create a Ticket</p>
          ) : (
            <p>You Can Now Create a Ticket</p>
          )}
        </div>
      </div>
    </div>
  );
}
