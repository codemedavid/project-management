import React from "react";
import { getProject } from "@/lib/project";
import SideBar from "@/components/sideBar/sideBar";
import Link from "next/link";
import { FaTelegram } from "react-icons/fa";
import Image from "next/image";
import { FaMagnifyingGlass } from "react-icons/fa6";
export default async function Projects({
  params,
}: {
  params: { projectId: string };
}) {
  const project = await getProject(parseInt(params.projectId));
  const projectData = project.project;
  console.log(project);
  return (
    <div className=' text-black font-light flex justify-between px-4'>
      <div className='w-[30%]'>
        <SideBar link='Projects' />
      </div>
      <div className='w-full py-10'>
        {/* UpperCorner */}
        <div className='flex justify-between'>
          <div>
            <h1 className='text-3xl font-bold'>{projectData.title}</h1>
            <p className='text-xl text-slate-500'>{projectData.description}</p>
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

                <p>{projectData.editor.name}</p>
                <p className='text-xs'>{projectData.editor.email}</p>
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
        <div>
          <div className='mt-20 flex gap-5'>
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
        </div>
      </div>
    </div>
  );
}
