import React from "react"
import UserHeader from "@/components/UserHeader"
import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { useRouter } from "next/router"
import { AccountContext } from "@/context/Account"
import Link from "next/link"

const AddLinkModal = ({ isOpen, onClose, currentUser, serverLinks }) => {
  if (serverLinks == "undefined" || !serverLinks) {
    serverLinks = new Array()
  }
  console.log("the current user is Modal Component", currentUser)
  console.log("console speaking from dashborad", serverLinks)

  const router = useRouter()
  const {
    getSession,
    user,
    updateUser,
    getAuthenticatedUser,
    isAuthenticated,
  } = useContext(AccountContext)

  const [link, setLink] = useState({ url: "", title: "" })
  const [payloadLinks, setPayloadLinks] = useState()
  const [handle, setHandle] = useState(null)
  const [socials, setSocials] = useState({
    facebook: "",
    twitter: "",
    instagram: "",
    youtube: "",
    linkedin: "",
    github: "",
  })

  function isValidURL(url) {
    try {
      new URL(url)
      return true
    } catch (error) {
      return false
    }
  }
  function saveLinks(e) {
    e.preventDefault()
    if (!isValidURL(link.url)) {
      return toast.error("Please Enter a Valid Url")
    }

    getSession()
      .then((cognitoUserSession) => {
        //social changes
        let socialObj
        if (currentUser.socials) {
          let lengthOfSocialObject = Object.keys(currentUser.socials).length
          if (lengthOfSocialObject > 0) {
            const socials = currentUser?.socials
            socialObj = {
              facebook: socials?.facebook.S,
              twitter: socials?.twitter.S,
              instagram: socials?.instagram.S,
              youtube: socials?.youtube.S,
              linkedin: socials?.linkedin.S,
              github: socials?.github.S,
            }
            setSocials(socialObj)
          }
        }

        //links

        serverLinks.push(link)
        // social changes end

        const payload = {
          name: currentUser.name,
          bio: currentUser?.bio ? currentUser.bio : "",
          image: currentUser?.image ? currentUser.image : "",
          handle: currentUser.handle,
          userId: currentUser?.userId ? currentUser.userId : "",
          email: currentUser.email,
          socials: socials,
          links: serverLinks ? serverLinks : "",
        }

        console.log("the payload is:", payload)

        axios
          .post(
            "https://lm9vl60dre.execute-api.eu-north-1.amazonaws.com/dev/compare-yourself",
            payload,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: cognitoUserSession.getIdToken().getJwtToken(),
              },
            }
          )
          .then((res) => {
            const data = res
            console.log("console statement from Modal.js", data)
            if (data.status == "error") return toast.error(data.error)
            toast.success("Links saved Successfully")
            setLink({
              url: "",
              title: "",
            })
          })
      })
      .catch((error) => {
        // Handle any errors that occurred during the getSession method
        console.error("Error:", error)
      })
  }

  function HandleLink(e) {
    setLink({
      ...link,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-screen p-2 overflow-x-hidden overflow-y-auto border outline-none backdrop-blur-lg focus:outline-none">
      <form
        onSubmit={saveLinks}
        className="relative border border-red-800 w-[400px]"
      >
        <div className="absolute cursor-pointer right-1" onClick={onClose}>
          {" "}
          x
        </div>

        <div className="flex flex-col items-center w-full py-10 mx-auto bg-gray-200 rounded-xl ">
          <label>
            <input
              className="p-1 px-2 text-xl text-gray-600 align-baseline border-2 rounded-md shadow outline-none font"
              type="text"
              placeholder="Enter Title"
              name="title"
              value={link.title}
              onChange={HandleLink}
            />
          </label>
          <label>
            <input
              className="p-1 px-2 mt-5 text-xl text-gray-600 border-2 rounded-md shadow outline-none font"
              type="text"
              name="url"
              placeholder="Enter Url"
              value={link.url}
              onChange={HandleLink}
            />
          </label>
          <button
            className="bg-[#19c37d] mt-5 text-white px-4 py-2 rounded-md block  mx-auto "
            type="submit"
          >
            {" "}
            Save links
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddLinkModal
