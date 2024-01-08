import React, { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import UserContext from "@/context/userContext"
import axios from "axios"
import { toast } from "react-toastify"
import { AccountContext } from "@/context/Account"
import Image from "next/image"

const UserHeader = (props) => {
  const router = useRouter()
  const { getSession, user, updateUser, logout } = useContext(AccountContext)
  const [isloading, setIsLoading] = useState(true)
  const [visible, setVisible] = useState(false)
  const [currentUser, setCurrentUser] = useState("")
  const [socials, setSocials] = useState(null)

  return (
    <div className="relative max-w-5xl mx-auto mt-5">
      <div className="bg-[#f3f4f6] flex justify-between text-left mt-5 py-2 px-4 border border-gray-100 text-base">
        <div>
          your socialverse link is live at:{" "}
          <Link
            href={`http://localhost:3000/${props?.handle}`}
            className="text-blue-400"
            target="_blank"
          >
            {" "}
            {`http://localhost:3000/${props?.handle}`}{" "}
          </Link>{" "}
        </div>
        <div
          className="flex gap-2 px-2 py-1 rounded-lg cursor-pointer hover:bg-gray-200"
          onClick={() => setVisible((prev) => !prev)}
        >
          <p>{props?.handle}</p>
          <Image
            src={"/svg/downarrow.svg"}
            width={10}
            height={10}
            alt="a downarrow in socialverse website"
          />
        </div>
      </div>
      <header className="flex flex-row items-center justify-between max-w-5xl mx-auto mt-3">
        <div className="flex flex-col md:flex-row">
          <Link href="/dashboard">
            <button className="inline-flex w-40 px-5 py-3 mb-3 mr-3 font-bold text-gray-600 border rounded-md md:w-auto hover:text-gray-900 hover:bg-gray-100">
              <img src="/svg/dashboard.svg" alt="" className="w-4 h-4 mr-2" />
              <span className="text-sm">Visit Dashboard</span>
            </button>
          </Link>
          <Link href="/edit/links">
            <button className="inline-flex w-40 px-5 py-3 mb-3 mr-3 font-bold text-gray-600 border rounded-md md:w-auto hover:text-gray-900 hover:bg-gray-100">
              <img src="/svg/url.svg" alt="" className="w-4 h-4 mr-2" />
              <span className="text-sm">Edit Link</span>
            </button>
          </Link>

          <Link href="/edit/profile">
            <button className="inline-flex w-40 px-5 py-3 mb-3 mr-3 font-bold text-gray-600 border rounded md:w-auto hover:text-gray-900 hover:bg-gray-100">
              <img src="/svg/profile.svg" alt="" className="w-4 h-4 mr-2" />
              <span className="text-sm">Edit Profile</span>
            </button>
          </Link>

          <Link href="/edit/socials">
            <button className="inline-flex w-40 px-5 py-3 mb-3 mr-3 font-bold text-gray-600 border rounded md:w-auto hover:text-gray-900 hover:bg-gray-100">
              <img src="/svg/socials.svg" alt="" className="w-4 h-4 mr-2" />
              <span className="text-sm">Edit Socials</span>
            </button>
          </Link>
        </div>
        {visible && (
          <div className="absolute flex items-center border shadow top-14 right-3">
            <div className="flex flex-col gap-1 px-3 my-2 cursor-pointer">
              <Link href={`http://localhost:3000/${user?.handle}`}>
                <div className="px-2 py-2 rounded-lg hover:bg-gray-100">
                  your Profile
                </div>
              </Link>
              <div
                className="flex justify-between px-2 py-2 rounded-lg hover:bg-gray-100"
                onClick={() => logout()}
              >
                <p>logout</p>
                <Image
                  className="w-5 h-5 cursor-pointer hover:opacity-75 "
                  src="/svg/logout.svg"
                  alt="Logout"
                  width={10}
                  height={10}
                />
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  )
}

export default UserHeader
