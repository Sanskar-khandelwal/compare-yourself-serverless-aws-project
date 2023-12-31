import React from "react"
import UserHeader from "@/components/UserHeader"
import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { useRouter } from "next/router"
import { AccountContext } from "@/context/Account"
import { RxCross2 } from "react-icons/rx"

const AddLinkModal = ({
  isOpen,
  onClose,
  currentUser,
  serverLinks,
  serverSocialsLinks,
}) => {
  if (serverLinks == "undefined" || !serverLinks) {
    serverLinks = new Array()
  }
  console.log("the current user is addlinkModal", currentUser)
  console.log("console speaking from ", serverLinks)
  console.log("social in addlinkModal", serverSocialsLinks)

  const router = useRouter()
  const {
    getSession,
    user,
    updateUser,
    getAuthenticatedUser,
    isAuthenticated,
  } = useContext(AccountContext)

  const [link, setLink] = useState({ url: "", title: "" })
  const [handle, setHandle] = useState(null)
  const [socials, setSocials] = useState({})

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
        //links
        serverLinks.push(link)

        const payload = {
          name: currentUser.name,
          bio: currentUser?.bio ? currentUser.bio : "",
          image: currentUser?.image ? currentUser.image : "",
          handle: currentUser.handle,
          userId: currentUser?.userId ? currentUser.userId : "",
          email: currentUser.email,
          socials: serverSocialsLinks,
          links: serverLinks ? serverLinks : [],
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
    <div className="fixed inset-0 z-50 flex items-center justify-center h-screen overflow-x-hidden overflow-y-auto border outline-none backdrop-blur-lg focus:outline-none bg-black/20">
      <form onSubmit={saveLinks} className="border  bg-white w-[40%]">
        <div className="w-full px-10 ">
          <div className="flex justify-between w-full py-5">
            <div className="text-xl font-poppins"> Add</div>
            <span className="text-xl cursor-pointer " onClick={onClose}>
              {" "}
              <RxCross2 />
            </span>
          </div>
          <span className="w-full border border-gray-100"></span>
          <label className="mt-10">
            <input
              className="w-full px-2 py-2 text-xl text-gray-600 align-baseline border rounded-md shadow outline-none  font-poppins"
              type="text"
              placeholder="Enter Title"
              name="title"
              value={link.title}
              onChange={HandleLink}
              required
            />
          </label>
          <label>
            <input
              className="w-full px-2 py-2 text-xl text-gray-600 rounded-md shadow outline-none  font-poppins mt-7"
              type="text"
              name="url"
              placeholder="Enter Url"
              value={link.url}
              onChange={HandleLink}
              required
            />
          </label>
        </div>

        <button
          className="bg-[#19c37d]  w-full text-white px-4 py-2 mt-10 block  mx-auto "
          type="submit"
        >
          {" "}
          Save links
        </button>
      </form>
    </div>
  )
}

export default AddLinkModal
