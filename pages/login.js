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
import Image from "next/image"

const Login = () => {
  const router = useRouter()
  const { authenticate, updateUser, getAuthenticatedUser, isAuthenticated } =
    useContext(AccountContext)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = (e) => {
    e.preventDefault()
    authenticate(email, password)
      .then((data) => {
        console.log("Logged In", data)
        console.log("The Authenticated User is", getAuthenticatedUser())
        console.log("is Authenticated:", isAuthenticated())
        axios
          .get(
            `https://lm9vl60dre.execute-api.eu-north-1.amazonaws.com/dev/compare-yourself/${email}`,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            console.log("got this response in login.js", res.data[0])
            const data = res.data
            console.log("data in db code in login.js", data)
            updateUser(data[0])
            router.push("/dashboard")
          })
      })
      .catch((err) => console.log("err", console.log(err)))
  }
  return (
    <>
      {/* <NavBar /> */}
      {/* <section className="grid h-screen overflow-hidden md:grid-cols-2 bg-hero-bg">
        <div className="flex flex-col items-center justify-center gap-0">
          <div className="mt-10 text-xl text-left text-[#BBDBF7]">
            <Image
              src={"/svg/quote.svg"}
              width={40}
              height={40}
              alt="A socialverse quote"
              className=""
            />
            <p className="w-[450px] mt-3  mx-auto  ">
              Welcome to Socialverse! 🚀 Your all-in-one solution for link
              management. Create a centralized hub for your digital presence and
              share your profile seamlessly. Say goodbye to scattered links and
              hello to simplicity. Let's elevate your online experience
              together! 🌐
            </p>
            <p className="mt-3 font-semibold"> Sanskar Khandelwal</p>
            <p className="mt-2 font-thin"> Founder, SocialVerse</p>
          </div>
        </div>
        <div className="flex items-center justify-center px-10 ">
          <div className="px-5 py-10 bg-white min-w-sm rounded-xl">
            <h1 className="text-3xl font-bold text-left">
              {" "}
              Create your Personalized hub, <br /> Sign Up today
            </h1>
            <p className="mt-2 text-xl text-left">Link Share Inspire</p>
            <form
              onSubmit={handleRegister}
              className="flex flex-col w-full gap-3 mt-6 text-lg"
            >
              <span className="flex flex-row items-center bg-white border rounded-md ring-white">
                <Image
                  src="/svg/userhandle.svg"
                  width={35}
                  height={30}
                  alt="user handle logo for socialverse"
                  className="w-6 h-6 mx-2 text-white bg-white "
                ></Image>
                <input
                  className="w-full px-3 py-2 bg-gray-100 focus:outline-none"
                  type="text"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  placeholder="Create UserName"
                />
              </span>
              <span className="flex flex-row items-center bg-white border rounded-md ">
                <input
                  className="w-full px-3 py-2 bg-gray-100 rounded-md focus:outline-none"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Write your Name"
                />
              </span>

              <input
                className="px-2 py-2 bg-gray-100 border rounded-md focus:outline-none"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Mail"
              />
              <input
                className="px-2 py-2 bg-gray-100 border rounded-md focus:outline-none"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Set a Password"
              />

              <input
                type="submit"
                value="Apply"
                className="py-2 text-white bg-indigo-600 rounded-md cursor-pointer"
              />
            </form>
            <h4 className="mt-4 text-black text-">
              Already have an account ?
              <Link className="font-bold text-indigo-500" href="/login">
                Login
              </Link>
              {error && (
                <p className="font-mono text-red-700">
                  {" "}
                  try different username or email{" "}
                </p>
              )}
            </h4>
            {visible && (
              <div>
                {" "}
                <input
                  className="block w-full px-2 py-2 mt-10 bg-gray-100 border rounded-md focus:outline-none"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter 6 digits code from Email"
                />
                <button
                  onClick={() =>
                    confirmUser(handle, code, email, password, name)
                  }
                  className="block w-full py-2 mt-3 text-white bg-indigo-600 rounded-md cursor-pointer"
                >
                  submit code
                </button>
              </div>
            )}
          </div>
        </div>
      </section> */}

      {/* Check */}
      <section className="grid h-screen overflow-hidden md:grid-cols-2 bg-hero-bg">
        <div className="flex flex-col items-center justify-center gap-0">
          <div className="mt-10 text-xl text-left text-[#BBDBF7]">
            <Image
              src={"/svg/quote.svg"}
              width={40}
              height={40}
              alt="A socialverse quote"
              className=""
            />
            <p className="w-[450px] mt-3  mx-auto  ">
              Welcome to Socialverse! 🚀 Your all-in-one solution for link
              management. Create a centralized hub for your digital presence and
              share your profile seamlessly. Say goodbye to scattered links and
              hello to simplicity. Let's elevate your online experience
              together! 🌐
            </p>
            <p className="mt-3 font-semibold"> Sanskar Khandelwal</p>
            <p className="mt-2 font-thin"> Founder, SocialVerse</p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="px-5 py-10 bg-white min-w-sm rounded-xl">
            <div className="w-full px-4 bg-white content">
              <h1 className="text-3xl font-bold text-left">
                Welcome back to Your Verse
              </h1>
              <p className="mt-2 text-xl text-left">
                One Link For All Your Links 🔗
              </p>
              <form
                onSubmit={handleLogin}
                className="flex flex-col w-full gap-3 mt-6 text-lg"
              >
                <input
                  className="block w-full px-2 py-2 mt-2 bg-gray-100 border rounded-md focus:outline-none"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Mail"
                />
                {error && <p> try different username </p>}
                <input
                  className="block w-full px-2 py-2 bg-gray-100 border rounded-md focus:outline-none"
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
                New to SocialVerse ?{" "}
                <Link className="font-bold text-indigo-500 " href="/apply">
                  Apply Now
                </Link>
              </h4>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login
