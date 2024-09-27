import React from "react";
import Link from "next/link";
import SignUpForm from "@/components/form/signUpForm";
export default function SignUp() {
  return (
    <div className='flex justify-start items-center h-[100vh]'>
      <div className='p-10 w-full lg:w-[50%]'>
        <div className='w-full'>
          <h2 className='text-2xl font-semibold'>Sign up</h2>
          <p className='flex gap-2 font-extralight text-md'>
            Already have an account?
            <Link
              href={"/sign-in"}
              className='text-blue-500 underline underline-offset-1'
            >
              Sign in
            </Link>
          </p>
        </div>
        <SignUpForm />
      </div>
      <div className='lg:w-[50%] p-4'>
        <div className='w-full rounded-md bg-green-700 h-[90vh]'></div>
      </div>
    </div>
  );
}
