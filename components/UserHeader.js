import React, { useContext, useEffect } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import UserContext from "@/context/userContext"
import axios from 'axios'
import {toast} from 'react-toastify'

const UserHeader = () => {
  // const {name, role, avatar, handle, links} = data;
  const router = useRouter()
  function handleLogout() {
    localStorage.removeItem("LinkTreeToken")
    router.push("/login")
  }
  const { userData, setUserData } = useContext(UserContext)
  const { role, avatar, handle } = userData
  useEffect(() => {
    if (!localStorage.getItem("LinkTreeToken"))
      return (window.location.href = "/login")

    axios
      .post(
        "https://socialverseserver-z24w.onrender.com/data/dashboard",
        {
          tokenMail: localStorage.getItem("LinkTreeToken"),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        const data = res.data
        if (data.status == "error") {
          return toast.error("Error Happened")
        }
        // setData(data.userData)
        setUserData(data.userData)
        localStorage.setItem("userHandle", data.userData.handle)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <>
      {/* <header className="flex flex-row items-center justify-between mt-3">
        <div className="flex flex-col md:flex-row ">
          <Link href="/edit/links">
            <button className="inline-flex w-40 px-5 py-3 mb-3 mr-3 font-bold text-gray-600 border rounded-md md:w-auto hover:text-gray-900 hover:bg-gray-100">
              <img src="/svg/url.svg" alt="" className="w-4 h-4 mr-3" />
              <p>Edit Link</p>
            </button>
          </Link>
          <Link href="/edit/profile">
            <button className="inline-flex w-40 px-5 py-3 mb-3 font-bold text-gray-600 border rounded md:w-auto hover:text-gray-900 hover:bg-gray-100">
              <img src="/svg/profile.svg" alt="" className="w-4 h-4 mr-3" />
              <p>Edit Profile</p>
            </button>
          </Link>
        </div>

        <Link href={`http://localhost:3000/${handle}`}>
          <div className="flex flex-row items-center">
            <div className="inline-flex items-center px-5 py-1 mr-5 text-right border rounded-lg mr-s hover:bg-gray-100">
              <div className="flex flex-col flex-wrap mr-2 text-xs md:text-md">
                <span className="font-bold">{handle}</span>
                <span>{role} Pack</span>
              </div>
              <div className="user-img">
                <img src={avatar} alt="" className="w-10" />
              </div>
            </div>
            <img
              className="w-5 h-5 mr-5 cursor-pointer"
              src="/svg/notify.svg"
              alt=""
            />
            <img
              className="w-5 h-5 mr-5 cursor-pointer"
              src="/svg/logout.svg"
              alt=""
              onClick={handleLogout}
            />
          </div>
        </Link>
      </header> */}
      <header className="flex flex-row items-center justify-between max-w-5xl mx-auto mt-3">
  <div className="flex flex-col md:flex-row">
    <Link href="/edit/links">
      <button className="inline-flex w-40 px-5 py-3 mb-3 mr-3 font-bold text-gray-600 border rounded-md md:w-auto hover:text-gray-900 hover:bg-gray-100">
        <img src="/svg/url.svg" alt="" className="w-4 h-4 mr-2" />
        <span className="text-sm">Edit Link</span>
      </button>
    </Link>
    <Link href="/edit/profile">
      <button className="inline-flex w-40 px-5 py-3 mb-3 font-bold text-gray-600 border rounded md:w-auto hover:text-gray-900 hover:bg-gray-100">
        <img src="/svg/profile.svg" alt="" className="w-4 h-4 mr-2" />
        <span className="text-sm">Edit Profile</span>
      </button>
    </Link>
  </div>

  
    <div className="flex flex-row items-center mb-4">
    <Link href={`http://linkupworld.netlify.app/${handle}`}> 
      <div className="inline-flex items-center px-4 py-2 mr-4 border border-gray-300 rounded-lg hover:bg-gray-100">
        <div className="flex flex-col ml-2">
          <span className="text-xs font-medium text-gray-600">{handle}</span>
          <span className="text-xs text-gray-400">{role} Pack</span>
        </div>
        <div className="user-img">
          <img src={avatar} alt="" className="w-10 h-10 ml-3 rounded-full" />
        </div>
      </div>
      </Link>
     
      <img
        className="w-5 h-5 ml-2 cursor-pointer hover:opacity-75"
        src="/svg/logout.svg"
        alt="Logout"
        onClick={handleLogout}
      />
      </div>

</header>

    </>
  )
}

export default UserHeader
