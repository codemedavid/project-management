"use client";
import React, { useState } from "react";
import { AddClient } from "@/lib/Client";
import { useRouter } from "next/navigation";
export default function AddClientBtn({ id }: { id: number }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [client, setClient] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    project_manager_id: id,
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await AddClient(client);
    setLoading(false);
    router.refresh();
    setIsOpen(false);
    setClient({
      name: "",
      email: "",
      phone: "",
      website: "",
      project_manager_id: id,
    });
  };
  return (
    <>
      <button
        className='bg-black text-white px-4 py-2  rounded-md'
        onClick={() => setIsOpen(!isOpen)}
      >
        Add Client
      </button>

      {isOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
          <div className='bg-white p-6 rounded-lg'>
            <h2 className='text-2xl mb-4'>Add New Client</h2>
            <form onSubmit={handleSubmit}>
              {loading ? (
                <div className='flex items-center justify-center'>
                  <div className='spinner'></div>
                </div>
              ) : (
                <>
                  <input
                    type='text'
                    placeholder='Client Name'
                    className='w-full p-2 mb-4 border rounded'
                    required
                    value={client.name}
                    onChange={(e) =>
                      setClient({ ...client, name: e.target.value })
                    }
                  />

                  <input
                    type='text'
                    placeholder='Client Email'
                    className='w-full p-2 mb-4 border rounded'
                    required
                    value={client.email}
                    onChange={(e) =>
                      setClient({ ...client, email: e.target.value })
                    }
                  />
                  <div className='flex items-center gap-4'>
                    <input
                      type='tel'
                      placeholder='Client Phone'
                      className='w-full p-2 mb-4 border rounded'
                      required
                      value={client.phone}
                      onChange={(e) =>
                        setClient({ ...client, phone: e.target.value })
                      }
                    />
                    <input
                      type='text'
                      placeholder='Client Website'
                      className='w-full p-2 mb-4 border rounded'
                      required
                      value={client.website}
                      onChange={(e) =>
                        setClient({ ...client, website: e.target.value })
                      }
                    />
                  </div>
                  <div className='flex justify-end'>
                    <button
                      type='button'
                      onClick={() => setIsOpen(!isOpen)}
                      className='mr-2 px-4 py-2 text-gray-600 rounded'
                    >
                      Cancel
                    </button>
                    <button
                      type='submit'
                      disabled={loading}
                      className='px-4 py-2 bg-black text-white rounded'
                    >
                      {loading ? "Creating..." : "Add Client"}
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
}
