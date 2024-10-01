"use client";
import React, { useState, useEffect, BaseSyntheticEvent } from "react";
import { FaArrowRight, FaPlus } from "react-icons/fa";
import { getUserProjectManager, getUserEditor } from "@/lib/User";
import { postProject } from "@/lib/project";
import { useRouter } from "next/navigation";
export default function NewProjectBtn() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectManager, setProjectManager] = useState("");
  const [editor, setEditor] = useState("");
  const [projectManagers, setProjectManagers] = useState([]);
  const [editors, setEditors] = useState([]);
  const [loading, setLoading] = useState(false);

  // const projectManagers = async () => {
  //   const res = await getUserProjectManager();
  //   return res.json();
  // };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectManagers = await getUserProjectManager();
        const editors = await getUserEditor();

        setProjectManagers(projectManagers?.users);
        setEditors(editors?.users);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = async (event: BaseSyntheticEvent) => {
    event.preventDefault();
    setLoading(true);

    const project = {
      title: projectName,
      description: projectDescription,
      editor_id: parseInt(editor),
      project_manager_id: parseInt(projectManager),
    };
    // TODO: Implement project creation logic here
    const res = await postProject(project);
    if (res) {
      closeModal();
      setLoading(false);
      router.refresh();
    }
    // Reset form fields
    setProjectName("");
    setProjectDescription("");
  };

  return (
    <>
      <button
        onClick={openModal}
        className='bg-black text-white py-2 w-full px-4 rounded-md font-light flex items-center justify-center'
      >
        New Project <FaPlus className='inline-block ml-2' />
      </button>

      {isModalOpen && (
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
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder='Project Name'
                    className='w-full p-2 mb-4 border rounded'
                    required
                  />

                  <div className='flex gap-4 items-center justify-center'>
                    <select
                      value={projectManager}
                      onChange={(e) => setProjectManager(e.target.value)}
                      className='w-full p-2 mb-4 border rounded'
                    >
                      <option value=''>Select Project Manager</option>
                      {projectManagers.map(
                        (manager: { id: string; name: string }) => {
                          return (
                            <option key={manager.id} value={manager.id}>
                              {manager.name}
                            </option>
                          );
                        }
                      )}
                    </select>

                    <div className='flex items-center h-full mb-5 justify-center text-center'>
                      <FaArrowRight />
                    </div>
                    {/* Editor */}
                    <select
                      value={editor}
                      onChange={(e) => setEditor(e.target.value)}
                      className='w-full p-2 mb-4 border rounded'
                    >
                      <option value=''>Select Editor</option>
                      {editors.map((editor: { id: string; name: string }) => {
                        return (
                          <option key={editor.id} value={editor.id}>
                            {editor.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <textarea
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    placeholder='Project Description'
                    className='w-full p-2 mb-4 border rounded'
                    rows={3}
                  ></textarea>
                  <div className='flex justify-end'>
                    <button
                      type='button'
                      onClick={closeModal}
                      className='mr-2 px-4 py-2 text-gray-600 rounded'
                    >
                      Cancel
                    </button>
                    <button
                      type='submit'
                      disabled={loading}
                      className='px-4 py-2 bg-black text-white rounded'
                    >
                      {loading ? "Creating..." : "Create Project"}
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
