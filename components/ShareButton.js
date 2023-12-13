import React from "react"
import { useRouter } from "next/router"
import { toast } from "react-toastify"

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
        <img
          className="bg-white w-14 h-14 rounded-full p-2 hover:bg-zinc-100 transition-all duration-500 hover:scale-110 border border-gray-30 mx-1 select-none"
          src="/svg/share.svg"
          alt=""
        />
      </div>
    </>
  )
}

export default ShareButton
