import LoginForm from "@/components/loginform"
import React from 'react'

const page = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center p-3">Welcome To InficureX</h1>
      <p className="text-2xl font-semibold text-slate-500 text-center pb-3">Give Us oppourtunity to support you..</p>
      <LoginForm />
    </div>
  )
}

export default page
