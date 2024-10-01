"use client";
import React from "react";
import { updateUserRole } from "@/lib/User";
import { useRouter } from "next/navigation";
type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  username: string;
};

export default function UsersTables({ users }: { users: User[] }) {
  const router = useRouter();
  const handleUpdateRole = async (id: number, role: string) => {
    await updateUserRole(id, role);
    router.refresh();
  };
  return (
    <div className='flex flex-col items-start w-full'>
      <table className='w-full'>
        <thead className='bg-gray-100'>
          <tr className='bg-gray-100'>
            <th className='text-left font-bold '>Name</th>
            <th className='text-left font-bold '>Email</th>
            <th className='text-left font-bold '>Role</th>
            <th className='text-left font-bold '>Username</th>
            <th className='text-left font-bold '>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <select
                  className='bg-transparent border-none cursor-pointer focus:outline-none'
                  value={user.role}
                  onChange={(e) => handleUpdateRole(user.id, e.target.value)}
                >
                  {user.role === "ADMIN" && (
                    <>
                      <option value='ADMIN'>Admin</option>
                      <option value='EDITOR'>Editor</option>
                      <option value='PROJECT_MANAGER'>Manager</option>
                      <option value='STUDENT'>Student</option>
                    </>
                  )}
                  {user.role === "EDITOR" && (
                    <>
                      <option value='EDITOR'>Editor</option>
                      <option value='ADMIN'>Admin</option>
                      <option value='PROJECT_MANAGER'>Manager</option>
                      <option value='STUDENT'>Student</option>
                    </>
                  )}
                  {user.role === "PROJECT_MANAGER" && (
                    <>
                      <option value='PROJECT_MANAGER'>Manager</option>
                      <option value='ADMIN'>Admin</option>
                      <option value='EDITOR'>Editor</option>
                      <option value='STUDENT'>Student</option>
                    </>
                  )}
                  {user.role === "STUDENT" && (
                    <>
                      <option value='STUDENT'>Student</option>
                      <option value='ADMIN'>Admin</option>
                      <option value='EDITOR'>Editor</option>
                      <option value='PROJECT_MANAGER'>Manager</option>
                    </>
                  )}
                </select>
              </td>
              <td>{user.username}</td>
              <td className='flex gap-2'>
                <button className='bg-red-500 text-white p-1 text-sm rounded-md'>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
