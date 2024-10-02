"use client";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { createTicket } from "@/lib/Ticket";
export default function NewTicketBtn({
  projectManagerId,
  projectId,
  editorId,
}: {
  projectManagerId: number;
  projectId: number;
  editorId: number;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [note, setNote] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const response = await createTicket(
      projectManagerId,
      projectId,
      editorId,
      code,
      note,
      url
    );
    if (response) {
      setLoading(false);
      setIsOpen(false);
      router.refresh();
    }
  };
  return (
    <>
      <button
        className='bg-black text-white p-2 rounded-md text-sm flex gap-2'
        onClick={() => setIsOpen(!isOpen)}
      >
        Add Ticket <FaPlus size={15} />
      </button>

      {isOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
          <div className='bg-white p-6 rounded-lg'>
            <h2 className='text-2xl mb-4'>Create New Project</h2>
            <form onSubmit={handleSubmit}>
              {loading ? (
                <div className='flex items-center justify-center'>
                  <div className='spinner'></div>
                </div>
              ) : (
                <>
                  <input
                    type='text'
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder='Ticket Title'
                    className='w-full p-2 mb-4 border rounded'
                    required
                  />
                  <input
                    type='text'
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder='Important Link'
                    className='w-full p-2 mb-4 border rounded'
                    required
                  />

                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder='Project Description'
                    className='w-full p-2 mb-4 border rounded'
                    rows={3}
                  ></textarea>
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
                      {loading ? "Creating..." : "Create Ticket"}
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
