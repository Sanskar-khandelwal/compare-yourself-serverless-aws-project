import React, { useEffect, useState,  useContext } from "react"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import LinkTree from "@/components/LinkTree"
import SocialTree from "@/components/SocialTree"
import ShareButton from "@/components/ShareButton"

import axios from "axios"
import Link from "next/link"
import { CognitoUserSession } from "amazon-cognito-identity-js"
import { AccountContext } from "@/context/Account"

const handle = () => {
  const router = useRouter()
  const [data, setData] = useState({
    name: "", 
    bio: "",
    image: ""
  })
  const [userFound, setUserFound] = useState(true)
  const { getSession, user } = useContext(AccountContext)

  const [social, setSocials] = useState({
    facebook: "",
    twitter: "",
    instagram: "",
    youtube: "",
    linkedin: "",
    github: "",
  })
  // useEffect(() => {
  //   console.log("use Effect")
  //     getSession().then(cognitoUserSession => {
  //       axios
  //       .get(`https://lm9vl60dre.execute-api.eu-north-1.amazonaws.com/dev/compare-yourself/single`,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           "Authorization": cognitoUserSession.getIdToken().getJwtToken()
  //         },
  //       })
  //       .then((res) => {
  //         const response = res.data
  //         console.log(typeof response)
  //           setData(response[0])
  //           setSocials(response.socials)
  //           setUserFound(true)
  //         }
  //       )
  //       .catch((err) => {
  //         console.log(err)
  //       })
  //     })

  // }, [router])
  
  console.log("console statement from handle.js", user)
  if (!userFound) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="px-2 not-found ">
          <h1 className="text-lg font-bold">User Not Found 😞</h1>

          <p>
            If you're looking for a page, double check the spelling and try
            again.
          </p>
        </div>
        Create your Own{" "}
        <Link
          className="px-3 ml-2 text-left text-white transition-all duration-500 bg-indigo-500 hover:bg-indigo-400"
          href="apply"
        >
          LinkTree
        </Link>
      </div>
    )
  }
  return (
    <>
    <div className="relative max-w-3xl mx-auto">
      <ShareButton />
      <LinkTree  data = {user}/>
      {/* <SocialTree social={social} /> */}
      </div>
    </>
  )
}

export default handle
