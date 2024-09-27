"use client";
import React, { BaseSyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";
export default function SignUpForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const onSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    if (password === confirmPassword) {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          username,
          password: confirmPassword,
        }),
      });

      if (response.ok) {
        router.push("/sign-in");
      }
    }
  };
  return (
    <form action='' className='pt-10 flex flex-col gap-4 w-full'>
      <div>
        <input
          type='text'
          className='py-3 border-b border-slate-200 w-full focus:outline-none'
          placeholder='Name'
          onChange={(e) => setName(e.target.value)}
          autoComplete='off '
        />
      </div>
      <div>
        <input
          type='email'
          className='py-3 border-b border-slate-200 w-full focus:outline-none'
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
          autoComplete='off'
        />
      </div>
      <div>
        <input
          type='text'
          className='py-3 border-b border-slate-200 w-full focus:outline-none'
          placeholder='Username'
          onChange={(e) => setUsername(e.target.value)}
          autoComplete='off'
        />
      </div>

      <div>
        <input
          type='password'
          className='py-3 border-b border-slate-200 w-full focus:outline-none'
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
          autoComplete='off'
        />
      </div>

      <div>
        <input
          type='password'
          className='py-3 border-b border-slate-200 w-full focus:outline-none'
          placeholder='Confirm Password'
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete='off'
        />
      </div>

      <div>
        <button
          className='w-full bg-green-700 text-white p-2 rounded-md'
          onClick={onSubmit}
        >
          {loading ? "Loading..." : "Sign up"}
        </button>
      </div>
    </form>
  );
}
