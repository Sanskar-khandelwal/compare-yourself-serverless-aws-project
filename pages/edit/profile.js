import React, { useContext, useState } from "react"
import { useEffect } from "react"
import UserContext from "@/context/userContext"
import UserHeader from "@/components/UserHeader"
import Image from "next/image"
import { toast } from "react-toastify"
import axios from "axios"

import { AccountContext } from "@/context/Account"
import { useRouter } from "next/router"

const profile = () => {
  const router = useRouter()
  const { getSession, user , updateUser} = useContext(AccountContext)
  console.log(user)
  const session = getSession()
  const { userData, setUserData } = useContext(UserContext)
  const [socials, setSocials] = useState({
    facebook: "",
    twitter: "",
    instagram: "",
    youtube: "",
    linkedin: "",
    github: "",
  })
  const [name, setName] = useState(user.name)
  const [bio, setBio] = useState("")
  const [image, setImage] = useState(
    "https://cdn-icons-png.flaticon.com/128/4140/4140048.png"
  )

  function handleSocials(e) {
    setSocials({
      ...socials,
      [e.target.id]: e.target.value,
    })
  }

 

  function saveProfile(e) {
    e.preventDefault()
    getSession()
    .then((cognitoUserSession) => { 
      const payload = {
        "name": name,
        "bio": bio,
        "image": image
      
   }
      axios
        .post(
          "https://lm9vl60dre.execute-api.eu-north-1.amazonaws.com/dev/compare-yourself",
         payload,
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": cognitoUserSession.getIdToken().getJwtToken()
            },
          }
        )
        .then((res) => {
          const data = res.data
          if (data.status == "error") return toast.error(data.error)
          toast.success("Profile saved Successfully")
        })
        .catch((e) => {
          console.log(e)
          toast.error(e.message)
        })
    })
    .catch((error) => {
      // Handle any errors that occurred during the getSession method
      console.error("Error:", error)
    })
  }

  function saveSocials(e) {
    e.preventDefault()
    axios
      .post(
        "https://socialverseserver-z24w.onrender.com/save/socials",
        {
          tokenMail: localStorage.getItem("LinkTreeToken"),
          socials,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      )
      .then((res) => {
        const data = res.data
        if (data.status == "error") return toast.error(data.error)
        toast.success("Socials saved Successfully")
      })
      .catch((e) => {
        console.log(e.message)
        toast.error(e.message)
      })
  }

  return (
    <>
      <div>
        <UserHeader />
        <main>
          <section>
            <div>
              <h4 className="mb-5 text-lg font-bold text-center">
                Edit Profile
              </h4>
              <div>
                <form
                  onSubmit={saveProfile}
                  className="flex flex-col items-center justify-center"
                >
                  <span className="flex flex-row items-center w-11/12 m-auto mb-3 bg-white border-2 shadow-md">
                    <Image
                      src="/svg/user.svg"
                      width={20}
                      height={20}
                      alt="user logo"
                      className="mx-2 text-center text-white bg-white"
                    />
                    <input
                      className="w-full px-3 py-2 border-2 focus:outline-none"
                      type="text"
                      placeholder="Set a Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </span>
                  <span className="flex flex-row items-center w-11/12 m-auto mb-3 bg-white border-2 shadow-md">
                    <Image
                      src="/svg/bio.svg"
                      width={20}
                      height={20}
                      alt="bio logo"
                      className="mx-2 text-white bg-white"
                    ></Image>
                    <input
                      className="w-full px-3 py-2 border-2 focus:outline-none"
                      type="text"
                      placeholder="Enter a bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    />
                  </span>

                  <span className="flex flex-row items-center w-11/12 m-auto mb-3 bg-white border-2 shadow-md">
                    <Image
                      src="/svg/avatar.svg"
                      width={20}
                      height={20}
                      alt="enter image logo"
                      className="mx-2 text-white bg-white"
                    ></Image>
                    <input
                      className="w-full px-3 py-2 border-2 focus:outline-none"
                      type="text"
                      placeholder="Enter Image Link"
                      value={avatar}
                      onChange={(e) => setImage(e.target.value)}
                    />
                  </span>

                  <input
                    type="submit"
                    value="Save Profile"
                    className="w-32 px-4 py-2 text-white bg-blue-600 border shadow-md cursor-pointer rouned-md"
                  />
                </form>
              </div>
            </div>

          </section>
        </main>
      </div>
    </>
  )
}

export default profile