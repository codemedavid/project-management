import React from "react";
import Banner from "./Banner";
import SmallProjectsCard from "./Cards/SmallProjectsCard";
export default function ProjectManager({
  session,
}: {
  session: { user: { name: string; username: string; email: string } };
}) {
  console.log(session);
  return (
    <div className='w-full flex flex-col gap-4'>
      <div className='h-[30vh] w-full pt-10 pr-12 '>
        <Banner />
      </div>
      <div className='pr-10'>
        <p className='text-xl font-semibold pb-2'>Your Projects</p>
        <div className='flex gap-4 overflow-x-auto '>
          <SmallProjectsCard />
          <SmallProjectsCard />

          <SmallProjectsCard />
        </div>
      </div>
    </div>
  );
}
