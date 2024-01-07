import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { IoMdArrowRoundForward } from "react-icons/io"
const LinkTreeCard = ({ url, title }) => {
  const router = useRouter()
  return (
    <>
      <div className="relative flex items-center justify-center p-2 mt-4 text-white transition-all ease-linear rounded-[10px] border border-[#f9f6f6] border-solid bg-opacity-5 backdrop-filter backdrop-blur-[400px] hover:bg-white/5 hover:border-white hover:-translate-y-1 group">
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

        <Link href={url} target="_black" className="bg-">
          <h4 className="mx-auto">{title}</h4>
        </Link>
      </div>
    </>
  )
}

export default LinkTreeCard
