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
        className="absolute cursor-pointer top-10 left-10"
        onClick={copyLink}
      >
        <Image
          className="w-12 h-12 p-2 mx-1 transition-all duration-500 rounded-full select-none hover:scale-105 hover:border-gray-30"
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
