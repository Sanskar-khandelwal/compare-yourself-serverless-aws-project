import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { IoMdArrowRoundForward } from "react-icons/io"
const LinkTreeCardDelete = ({ url, title, from }) => {
  const router = useRouter()
  return (
    <div>
      <Link href={url} target="_black" className="bg-">
        <div className="relative flex items-center justify-center p-2 mt-4  bg-white/5 transition-all ease-linear rounded-[10px] border border-[#f9f6f6] border-solid  backdrop-filter backdrop-blur-[400px]  hover:border-white hover:-translate-y-1 group bg-white shadow-md  text-black">
          <div
            className="absolute p-1 bg-white rounded-full hover:bg-gray-700 w-11 left-2"
            alt=""
          />
          <div
            className="absolute transition-all duration-200 ease-linear right-5 group-hover:-rotate-45"
            alt=""
          >
            <IoMdArrowRoundForward />
          </div>

          <h4 className="mx-auto">{title}</h4>
        </div>
      </Link>
      <span>Delete</span>
    </div>
  )
}

export default LinkTreeCardDelete
