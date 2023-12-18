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
  const { getSession } = useContext(AccountContext)
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
  const [name, setName] = useState("")
  const [bio, setBio] = useState("")
  const [avatar, setAvatar] = useState(
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
        "age": parseInt(name),
        "height": parseInt(bio),
        "income": parseInt(avatar)
      
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
                      onChange={(e) => setAvatar(e.target.value)}
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

            <div>
              <h4 className="mt-5 mb-5 text-lg font-bold text-center">
                Edit Socials
              </h4>
              <div>
                <form
                  className="flex flex-col items-center justify-center"
                  onSubmit={saveSocials}
                >
                  <span className="flex flex-row items-center w-11/12 m-auto mb-3 bg-white border-2 shadow-md">
                    <Image
                      src="/svg/facebook.svg"
                      width={20}
                      height={20}
                      alt="facebook logo"
                      className="mx-2 text-center text-white bg-white"
                    />
                    <input
                      id="facebook"
                      className="w-full px-3 py-2 border-2 focus:outline-none"
                      type="text"
                      placeholder="Enter facebook profile"
                      value={socials.facebook}
                      onChange={handleSocials}
                    />
                  </span>
                  <span className="flex flex-row items-center w-11/12 m-auto mb-3 bg-white border-2 shadow-md">
                    <Image
                      src="/svg/twitter.svg"
                      width={20}
                      height={20}
                      alt="twitter logo"
                      className="mx-2 text-white bg-white"
                    ></Image>
                    <input
                      id="twitter"
                      className="w-full px-3 py-2 border-2 focus:outline-none"
                      type="text"
                      placeholder="Enter twitter profile"
                      value={socials.twitter}
                      onChange={handleSocials}
                    />
                  </span>
                  <span className="flex flex-row items-center w-11/12 m-auto mb-3 bg-white border-2 shadow-md">
                    <Image
                      src="/svg/linkedin.svg"
                      width={20}
                      height={20}
                      alt="enter linkedin logo"
                      className="mx-2 text-white bg-white"
                    ></Image>
                    <input
                      id="linkedin"
                      className="w-full px-3 py-2 border-2 focus:outline-none"
                      type="text"
                      placeholder="Enter Linkedin profile link"
                      value={socials.linkedin}
                      onChange={handleSocials}
                    />
                  </span>
                  <span className="flex flex-row items-center w-11/12 m-auto mb-3 bg-white border-2 shadow-md">
                    <Image
                      src="/svg/instagram.svg"
                      width={20}
                      height={20}
                      alt="enter instagram logo"
                      className="mx-2 text-white bg-white"
                    ></Image>
                    <input
                      id="instagram"
                      className="w-full px-3 py-2 border-2 focus:outline-none"
                      type="text"
                      placeholder="Enter instagram profile Link"
                      value={socials.instagram}
                      onChange={handleSocials}
                    />
                  </span>
                  <span className="flex flex-row items-center w-11/12 m-auto mb-3 bg-white border-2 shadow-md">
                    <Image
                      src="/svg/github.svg"
                      width={20}
                      height={20}
                      alt="enter github logo"
                      className="mx-2 text-white bg-white"
                    ></Image>
                    <input
                      id="github"
                      className="w-full px-3 py-2 border-2 focus:outline-none"
                      type="text"
                      placeholder="Enter github profile Link"
                      value={socials.github}
                      onChange={handleSocials}
                    />
                  </span>
                  <span className="flex flex-row items-center w-11/12 m-auto mb-3 bg-white border-2 shadow-md">
                    <Image
                      src="/svg/youtube.svg"
                      width={20}
                      height={20}
                      alt="enter youtube logo"
                      className="mx-2 text-white bg-white"
                    ></Image>
                    <input
                      id="youtube"
                      className="w-full px-3 py-2 border-2 focus:outline-none"
                      type="text"
                      placeholder="Enter Youtube channel Link"
                      value={socials.youtube}
                      onChange={handleSocials}
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
