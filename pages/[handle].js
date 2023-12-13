import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import LinkTree from "@/components/LinkTree"
import SocialTree from "@/components/SocialTree"
import ShareButton from "@/components/ShareButton"

import axios from "axios"
import Link from "next/link"

const handle = () => {
  const router = useRouter()
  const [data, setData] = useState({})
  const [userFound, setUserFound] = useState(false)

  const [social, setSocials] = useState({
    facebook: "",
    twitter: "",
    instagram: "",
    youtube: "",
    linkedin: "",
    github: "",
  })
  useEffect(() => {
    if (router.query?.handle) {
      axios
        .get(`https://socialverseserver-z24w.onrender.com/get/${router.query.handle}`)
        .then((res) => {
          const data = res.data
          {
            console.log(data)
          }
          if (data.status == "error") {
            return toast.error(data.error)
          }
          if (data.status == "success") {
            setData(data.userData)
            setSocials(data.socials)
            setUserFound(true)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [router.query])
  if (!userFound) {
    return (
      <div className="flex  flex-col justify-center items-center h-screen">
        <div className="not-found px-2 ">
          <h1 className="font-bold text-lg">User Not Found 😞</h1>

          <p>
            If you're looking for a page, double check the spelling and try
            again.
          </p>
        </div>
        Create your Own{" "}
        <Link
          className="bg-indigo-500 px-3 ml-2 text-white hover:bg-indigo-400 transition-all duration-500 text-left"
          href="apply"
        >
          LinkTree
        </Link>
      </div>
    )
  }
  return (
    <>
    <div className="max-w-3xl mx-auto relative">
      <ShareButton />
      <LinkTree data={data} />
      <SocialTree social={social} />
      </div>
    </>
  )
}

export default handle
