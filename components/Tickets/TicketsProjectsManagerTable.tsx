import React from "react";
import { db } from "@/lib/db";
import Link from "next/link";
export default async function TicketsProjectsManagerTable({
  projectId,
}: {
  projectId: number | null;
}) {
  if (!projectId) {
    return <div>No project selected</div>;
  }
  const projectTickets = await db.tikets.findMany({
    where: {
      project_id: projectId,
    },
  });
  console.log("projectTickets", projectTickets);
  return (
    <div className='flex flex-col items-start w-full text-sm h-full'>
      <table className='w-full'>
        <thead className='bg-gray-100'>
          <tr className='bg-gray-100'>
            <th className='text-center font-bold '>Code</th>
            <th className='text-center font-bold '>Note</th>
            <th className='text-center font-bold '>Status</th>
            <th className='text-center font-bold '>Url</th>
            <th className='text-center font-bold '>Admin Approval</th>
          </tr>
        </thead>
        <tbody className='py-5'>
          {projectTickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.code}</td>
              <td>{ticket.note}</td>
              <td>
                <select
                  className='bg-transparent cursor-pointer focus:outline-none'
                  value={ticket.status}
                >
                  {ticket.status === "pending" && (
                    <>
                      <option value='pending'>pending</option>
                      <option value='on going'>on going</option>
                      <option value='completed'>completed</option>
                    </>
                  )}
                  {ticket.status === "on going" && (
                    <>
                      <option value='on going'>on going</option>
                      <option value='pending'>pending</option>
                      <option value='completed'>completed</option>
                    </>
                  )}
                  {ticket.status === "completed" && (
                    <>
                      <option value='completed'>completed</option>
                      <option value='pending'>pending</option>
                      <option value='completed'>completed</option>
                    </>
                  )}
                </select>
              </td>
              <td>
                <Link
                  href={ticket.url || ""}
                  className='text-blue-500 underline'
                >
                  Link
                </Link>
              </td>
              <td>{ticket.approval}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
