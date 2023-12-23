//add name and handle to the backend while signup 
// add name and handle to the backend while logiin

import React, { useState, useContext } from "react"
import styles from "../styles/apply.module.css"
import { toast } from "react-toastify"
import Link from "next/link"
import axios from "axios"
import { useRouter } from "next/router"
import { AccountContext } from "../context/Account"
import NavBar from "@/components/Navbar"

const Login = () => {
  const router = useRouter()
  const { authenticate , updateUser} = useContext(AccountContext)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = (e) => {
    e.preventDefault()
    authenticate(email, password)
      .then((data) => {
        console.log("Logged In", data)
        axios.get(`https://lm9vl60dre.execute-api.eu-north-1.amazonaws.com/dev/compare-yourself/${email}`, {
         headers:  {
           "Content-Type": "application/json",
          }
        }).then((res) => {
          console.log("got this response in login.js",res.data[0])
          const data = res.data;
          console.log("data in db code in login.js", data)
          updateUser(data[0])
          router.push('/dashboard')
        })
      })
      .catch((err) => console.log("err", console.log(err)))
  }
  return (
    <>
    <NavBar/>
      <section className="flex flex-row h-screen overflow-hidden">
        <div className="flex items-center w-2/5 h-full px-10 main">
          <div className="w-full px-4 bg-white content">
            <h1 className="text-2xl font-bold text-left">Enter Your Verse</h1>
            <p className="mt-2 text-left">Stay Connected, Stay Inspired</p>
            <form
              onSubmit={handleLogin}
              className="flex flex-col w-full gap-3 mt-6 text-lg"
            >
              <input
                className="w-full px-3 py-2 bg-gray-100 border rounded-md focus:outline-none"
                type="text"
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
          <img
            src="/images/bulb-light.jpg "
            alt=""
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
      </section>
    </>
  )
}

export default Login
