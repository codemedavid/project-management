import React from "react";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import NewProjectBtn from "@/components/Buttons/NewProjectBtn";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/db";
import ProjectsContents from "./Projects.Contents";

export default async function Contents() {
  const projectManagers = await db.user.findMany({
    where: {
      role: "PROJECT_MANAGER",
    },
  });

  const editors = await db.user.findMany({
    where: {
      role: "EDITOR",
    },
  });

  const session = await getServerSession(options);
  return (
    <div className='py-10 mr-10 w-full'>
      <div className='flex justify-between '>
        <div className='w-full'>
          <h1 className='text-3xl'>
            Hello, <span className='font-semibold'>{session?.user.name}</span>
          </h1>
          <p className='font-thin'>Let&apos;s get things done</p>
        </div>
        <div className='w-52'>
          <NewProjectBtn
            projectManagers={
              projectManagers.length > 0
                ? projectManagers.map(({ id, name }) => ({
                    id: id.toString(),
                    name,
                  }))
                : []
            }
            editors={
              editors.length > 0
                ? editors.map(({ id, name }) => ({
                    id: id.toString(),
                    name,
                  }))
                : []
            }
          />
        </div>
      </div>

      {/* Cards Components */}
      <div className='flex gap-4 pt-4'>
        <div className='w-40 h-32 p-4 rounded-xl border-2 border-slate-300 hover:bg-slate-100'>
          <div className='h-10'>
            <Image src={"/static/groups.svg"} width={30} height={30} alt='' />
          </div>
          <div className='flex flex-col gap-3'>
            <p className='font-semibold text-xl'>36</p>
            <span className='text-sm overflow-hidden whitespace-nowrap overflow-ellipsis'>
              Project Managers
            </span>
          </div>
        </div>

        <div className='w-40 h-32 p-4 rounded-xl border-2 border-slate-300 hover:bg-slate-100'>
          <div className='h-10'>
            <Image src={"/static/tickets.svg"} width={30} height={30} alt='' />
          </div>
          <div className='flex flex-col gap-3'>
            <p className='font-semibold text-xl'>120</p>
            <span className='text-sm'>Tickets</span>
          </div>
        </div>

        <div className='w-40 h-32 p-4 rounded-xl border-2 border-slate-300 hover:bg-slate-100'>
          <div className='h-10'>
            <Image src={"/static/student.svg"} width={30} height={30} alt='' />
          </div>
          <div className='flex flex-col gap-3'>
            <p className='font-semibold text-xl'>22</p>
            <span className='text-sm'>Students</span>
          </div>
        </div>
        <div className='w-40 h-32 p-4 rounded-xl border-2 border-slate-300 hover:bg-slate-100'>
          <div className='h-10'>
            <Image src={"/static/movie2.svg"} width={30} height={30} alt='' />
          </div>
          <div className='flex flex-col gap-3'>
            <p className='font-semibold text-xl'>12</p>
            <span className='text-sm'>Editors</span>
          </div>
        </div>
      </div>

      {/* Recent Tasks */}
      <div className='flex flex-col gap-4 mt-4'>
        <div className='flex justify-between items-center'>
          <h1 className='text-xl font-semibold'>Ongoing Projects</h1>
          <Link href={"/projects"} className='text-sm font-light'>
            View All
          </Link>
        </div>

        <ProjectsContents />
      </div>
    </div>
  );
}
