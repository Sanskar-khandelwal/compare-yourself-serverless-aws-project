import React, { useContext, useEffect } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import UserContext from "@/context/userContext"
import axios from 'axios'
import {toast} from 'react-toastify'
import { AccountContext } from "@/context/Account"


const UserHeader = () => {
  // const {name, role, avatar, handle, links} = data;
  const router = useRouter()
  const { user, updateUser  } = useContext(AccountContext)
  console.log("console statement from userHeader", user)

  return (
    <>
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
    <Link href="/edit/socials">
      <button className="inline-flex w-40 px-5 py-3 mb-3 font-bold text-gray-600 border rounded md:w-auto hover:text-gray-900 hover:bg-gray-100">
        <img src="/svg/profile.svg" alt="" className="w-4 h-4 mr-2" />
        <span className="text-sm">Edit Socials</span>
      </button>
    </Link>
  </div>

  
    <div className="flex flex-row items-center mb-4">
    <Link href={`http://localhost:3000/${user.handle}`}> 
      <div className="inline-flex items-center px-4 py-2 mr-4 border border-gray-300 rounded-lg hover:bg-gray-100">
        your page
      </div>
      </Link>
     
      <img
        className="w-5 h-5 ml-2 cursor-pointer hover:opacity-75"
        src="/svg/logout.svg"
        alt="Logout"
        // onClick={handleLogout}
      />
      </div>

</header>

    </>
  )
}

export default UserHeader
