"use client";
import React, { BaseSyntheticEvent, useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function SignInForm() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    const signInData = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });
    console.log(signInData);

    if (signInData?.ok) {
      router.push("/");
    } else {
      setMessage("Please enter the correct username or password");
    }
  };
  return (
    <form className='pt-10 flex flex-col gap-4 w-full'>
      <div>
        <input
          type='text'
          className='py-3 border-b border-slate-200 w-full focus:outline-none'
          placeholder='Username'
          onChange={(e) => setUsername(e.target.value)}
          autoComplete='false'
        />
      </div>

      <div>
        <input
          type='password'
          className='py-3 border-b border-slate-200 w-full focus:outline-none'
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
          autoComplete='false'
        />
      </div>
      <p className='text-red-500'>{message}</p>
      <div>
        <Link href={"/"} className='text-blue-500'>
          Forgot password?
        </Link>
      </div>

      <div>
        <button
          className='w-full bg-green-700 text-white p-2 rounded-md'
          onClick={onSubmit}
          type='button'
        >
          Sign in
        </button>
      </div>
    </form>
  );
}
