import React, { useState } from "react"
import styles from "../styles/apply.module.css"
import { toast } from "react-toastify"
import Link from "next/link"
import axios from 'axios'
import {useRouter} from 'next/router'

const Login = () => {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState('')
  const handleLogin = (e) => {
    e.preventDefault()

    //backend here

    axios.post("https://socialverseserver-z24w.onrender.com/api/login",{  
      email,
      password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    } ).then((response) => {
      const data = response.data
      console.log(data)
      if (data.status == "success") {
        toast("You are Login successfully")
        localStorage.setItem("LinkTreeToken", data.token)
        router.push('/dashboard')
      }
      if(data.status == "error"){
        toast("User not found")
      }
    })
    .catch((error) => {
      setError(error);
      console.log(error)
      toast.error(error.message)
    })
    setEmail("")
    setPassword("")
  }
  return (
    <>
      <section
       className="flex flex-row h-screen overflow-hidden"
      >
        <div className="flex items-center w-2/5 h-full px-10 main">
          <div className="w-full px-4 bg-white content">
            <h1 className="text-2xl font-bold text-left">
              Enter Your Verse
            </h1>
            <p className="mt-2 text-left">Stay Connected, Stay Inspired</p>
            <form
              onSubmit={handleLogin}
              className="flex flex-col w-full gap-3 mt-6 text-lg"
            >
              <input
                className="w-full px-3 py-2 bg-gray-100 border rounded-md focus:outline-none"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Mail"
              />
              {error && <p> try different username </p>}
              <input
                className="w-full px-3 py-2 bg-gray-100 border rounded-md focus:outline-none"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Set a Password"
              />

              <input
                type="submit"
                value="Login"
                className="py-2 text-white bg-indigo-600 rounded-md cursor-pointer "
              />
            </form>
            <h4 className="pt-3 text-left text-black ">
            New here ?{" "}
            <Link className="font-bold text-indigo-500 " href="/apply">
              Apply Now
            </Link>
          </h4>
          </div>    
        </div>
        <div className="flex-1 w-3/5 h-full ">
         <img src="/images/bulb-light.jpg " alt="" className="object-cover w-full h-full rounded-lg" />
        </div>

      </section>
    </>
  )
}

export default Login
