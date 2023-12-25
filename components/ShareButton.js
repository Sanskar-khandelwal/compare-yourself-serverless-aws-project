import React from "react"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import Image from "next/image"

const ShareButton = () => {
  const router = useRouter()
  const copyLink = () => {
    navigator.clipboard.writeText(
      `http://linkupworld.netlify.app/${router.query.handle}`
    )
    toast("Successfully Copied on Clipboard")
  }
  return (
    <>
      <div 
        className="absolute cursor-pointer top-2 left-2"
        onClick={copyLink}
      >
        <Image
          className="bg-white w-12 h-12 rounded-full p-2 hover:bg-zinc-100 transition-all duration-500 hover:scale-105 hover:border hover:border-gray-30 mx-1 select-none"
          src="/svg/share.svg"
          width={20}
          height={20}
          alt=""
        />
      </div>
    </>
  )
}

export default ShareButton
