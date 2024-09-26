import React from "react";
import SignInForm from "@/components/form/signInForm";
import Link from "next/link";
export default function SignIn() {
  return (
    <div className='flex justify-start items-center h-[100vh]'>
      <div className='p-10 w-full lg:w-[50%]'>
        <div className='w-full'>
          <h2 className='text-2xl font-semibold'>Sign in</h2>
          <p className='flex gap-2 font-extralight text-md'>
            New to Wealthy Mindset?{" "}
            <Link
              href={"/sign-up"}
              className='text-blue-500 underline underline-offset-1'
            >
              Sign up for free
            </Link>
          </p>
        </div>
        <SignInForm />
      </div>
      <div className='lg:w-[50%] p-4'>
        <div className='w-full rounded-md bg-green-700 h-[90vh]'></div>
      </div>
    </div>
  );
}
