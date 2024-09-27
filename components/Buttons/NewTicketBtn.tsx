"use client";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
export default function NewTicketBtn() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignee, setAssignee] = useState("");
  const [reporter, setReporter] = useState("");
  const [type, setType] = useState("");

  return (
    <>
      <button
        className='bg-black text-white p-2 rounded-md text-sm flex gap-2'
        onClick={() => setIsOpen(!isOpen)}
      >
        Add Ticket <FaPlus size={15} />
      </button>

      {isOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <button
            className='absolute top-0 right-0 p-2 text-white'
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
        </div>
      )}
    </>
  );
}
