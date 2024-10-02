"use client";
import React, { useState, useEffect } from "react";
import { getClientsByProjectManager } from "@/lib/Client";
import { Client } from "@/lib/types";
import { addProjectDetails } from "@/lib/project";
import { ProjectType } from "@prisma/client";
import { useRouter } from "next/navigation";
export default function AddDetails({
  id,
  projectId,
}: {
  id: string;
  projectId: number;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [project, setProject] = useState({
    Platform: "",
    Niche: "",
    Video_Type: "",
    Rate: 0.0,
    client_id: 0,
    project_type: "" as ProjectType,
  });
  const myId = parseInt(id);

  useEffect(() => {
    const fetchClients = async () => {
      const clients = await getClientsByProjectManager(myId);
      setClients(clients);
    };
    fetchClients();
  }, [myId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const projectDetails = await addProjectDetails(project, projectId);
    console.log(projectDetails);
    setLoading(false);
    setIsOpen(false);
    router.refresh();
  };

  return (
    <>
      <button
        className='bg-black text-white p-2 rounded-md text-sm flex gap-2 items-center justify-center'
        onClick={() => setIsOpen(!isOpen)}
      >
        Add Details
      </button>

      {isOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
          <div className='bg-white p-6 rounded-lg'>
            <h2 className='text-2xl mb-4'>Add Project Details</h2>
            <form onSubmit={handleSubmit}>
              {loading ? (
                <div className='flex items-center justify-center'>
                  <div className='spinner'></div>
                </div>
              ) : (
                <>
                  <div className='flex gap-2'>
                    <input
                      type='text'
                      placeholder='Platform'
                      className='w-full p-2 mb-4 border rounded'
                      required
                      value={project.Platform}
                      onChange={(e) =>
                        setProject({ ...project, Platform: e.target.value })
                      }
                    />

                    <input
                      type='text'
                      placeholder='Niche'
                      className='w-full p-2 mb-4 border rounded'
                      required
                      value={project.Niche}
                      onChange={(e) =>
                        setProject({ ...project, Niche: e.target.value })
                      }
                    />
                  </div>
                  <select
                    className='w-full p-2 mb-4 border rounded'
                    required
                    value={project.Video_Type}
                    onChange={(e) =>
                      setProject({
                        ...project,
                        Video_Type: e.target.value,
                      })
                    }
                  >
                    <option value=''>Select Video Type</option>
                    <option value='short form'>Short Form</option>
                    <option value='long form'>Long Form</option>
                  </select>
                  <div className='flex items-center gap-4'>
                    <div className='flex gap-2 items-center justify-center p-2 mb-4 border rounded'>
                      <span className='text-xl'>$</span>
                      <input
                        type='number'
                        placeholder='Rate'
                        className='w-full border-none focus:outline-none '
                        required
                        value={project.Rate}
                        onChange={(e) =>
                          setProject({
                            ...project,
                            Rate: parseFloat(e.target.value),
                          })
                        }
                      />
                    </div>

                    <select
                      className='w-full p-2 mb-4 border rounded'
                      required
                      value={project.project_type}
                      onChange={(e) =>
                        setProject({
                          ...project,
                          project_type: e.target.value as ProjectType,
                        })
                      }
                    >
                      <option value=''>Select Project Type</option>
                      <option value='per_project'>Per Project</option>
                      <option value='per_hour'>Per Hour</option>
                    </select>
                  </div>
                  <select
                    className='w-full p-2 mb-4 border rounded'
                    required
                    value={project.client_id}
                    onChange={(e) =>
                      setProject({
                        ...project,
                        client_id: parseInt(e.target.value),
                      })
                    }
                  >
                    <option value=''>Select Client</option>
                    {clients.length > 0 &&
                      clients.map((client) => (
                        <option key={client.id} value={client.id}>
                          {client.name}
                        </option>
                      ))}
                  </select>

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
