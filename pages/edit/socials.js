import React, { useContext, useState } from "react"
import { useEffect } from "react"
import UserContext from "@/context/userContext"
import UserHeader from "@/components/UserHeader"
import Image from "next/image"
import { toast } from "react-toastify"
import axios from "axios"

import { AccountContext } from "@/context/Account"
import { useRouter } from "next/router"

const socials = () => {
  const router = useRouter()
  const { getSession, updateUser, user, isAuthenticated } =
    useContext(AccountContext)
  const [handle, setHandle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [socials, setSocials] = useState({
    facebook: "",
    twitter: "",
    instagram: "",
    youtube: "",
    linkedin: "",
    github: "",
  })

  useEffect(() => {
    if (isAuthenticated()) {
      getSession()
        .then((cognitoUserSession) => {
          if (cognitoUserSession.isValid()) {
            const handle =
              cognitoUserSession.idToken.payload["cognito:username"]
            setHandle(handle)
            axios
              .get(
                `https://lm9vl60dre.execute-api.eu-north-1.amazonaws.com/dev/compare-yourself/${handle}`,
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              )
              .then((res) => {
                const response = res.data
                console.log("received this response from dynamodb: ", response)
                let socialObj = {}
                if (response[0].socials) {
                  let lengthOfSocialObject = Object.keys(
                    response[0].socials
                  ).length
                  if (lengthOfSocialObject > 0) {
                    const socials = response[0]?.socials
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
                  updateUser({
                    ...response,
                    socials: socialObj,
                  })
                }
                
                console.log("This is the social obj", socialObj)
                setHandle(response[0].handle)

                updateUser({
                  ...response[0],
                  socials: socialObj,
                })
                setLoading(false)
              })
              .catch((err) => {
                console.log(err)
                setLoading(false)
              })
          } else {
            router.push("/login")
            setLoading(false)
          }
        })
        .catch((err) => {
          router.push("/login")
        })
    } else {
      router.push("/login")
    }
  }, [])

  function handleSocials(e) {
    setSocials({
      ...socials,
      [e.target.id]: e.target.value + "",
    })
  }

  function saveSocials(e) {
    e.preventDefault()
    getSession()
      .then((cognitoUserSession) => {
        console.log(user, "user in edit socials")
        const payload = {
          name: user.name,
          bio: user.bio ? user.bio : "",
          image: user.image ? user.image : "",
          handle: user.handle ? user.handle : "",
          userId: user.userId ? user.userId : "",
          email: user.email,
          links: user.links ? user.links.S : "",
          titles: user.titles ? user.titles.S : "",
          socials: socials,
        }
        console.log(" the payload is", payload)
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
            console.log("console statement from socials.js", data)
            updateUser(payload)
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

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <h1 className="font-semibold text-2xl"> Dude Hang On, let Me load</h1>
      </div>
    )
  }

  return (
    <>
      <div>
        <UserHeader handle={handle} />
        <main>
          <section>
            <div>
              <h4 className="mt-5 mb-5 text-lg font-semibold text-center ">
                Edit Socials 🕸️
              </h4>
              <div>
                <form
                  className="flex flex-col items-center justify-center max-w-5xl mx-auto"
                  onSubmit={saveSocials}
                >
                  <span className="flex flex-row items-center w-11/12 m-auto mt-2 mb-3 bg-white shadow">
                    <Image
                      src="/svg/facebook.svg"
                      width={20}
                      height={20}
                      alt="facebook logo"
                      className="mx-2 text-center text-white bg-white"
                    />
                    <input
                      id="facebook"
                      className="w-full px-3 py-2 focus:outline-none"
                      type="text"
                      placeholder="Enter facebook UserName"
                      value={socials.facebook}
                      onChange={handleSocials}
                    />
                  </span>
                  <span className="flex flex-row items-center w-11/12 m-auto mt-2 mb-3 bg-white shadow">
                    <Image
                      src="/svg/twitter.svg"
                      width={20}
                      height={20}
                      alt="twitter logo"
                      className="mx-2 text-white bg-white"
                    ></Image>
                    <input
                      id="twitter"
                      className="w-full px-3 py-2 focus:outline-none"
                      type="text"
                      placeholder="Enter twitter UserName"
                      value={socials.twitter}
                      onChange={handleSocials}
                    />
                  </span>
                  <span className="flex flex-row items-center w-11/12 m-auto mt-2 mb-3 bg-white shadow">
                    <Image
                      src="/svg/linkedin.svg"
                      width={20}
                      height={20}
                      alt="enter linkedin logo"
                      className="mx-2 text-white bg-white"
                    ></Image>
                    <input
                      id="linkedin"
                      className="w-full px-3 py-2 focus:outline-none"
                      type="text"
                      placeholder="Enter Linkedin UserName"
                      value={socials.linkedin}
                      onChange={handleSocials}
                    />
                  </span>
                  <span className="flex flex-row items-center w-11/12 m-auto mt-2 mb-3 bg-white shadow">
                    <Image
                      src="/svg/instagram.svg"
                      width={20}
                      height={20}
                      alt="enter instagram logo"
                      className="mx-2 text-white bg-white"
                    ></Image>
                    <input
                      id="instagram"
                      className="w-full px-3 py-2 focus:outline-none"
                      type="text"
                      placeholder="Enter instagram UserName"
                      value={socials.instagram}
                      onChange={handleSocials}
                    />
                  </span>
                  <span className="flex flex-row items-center w-11/12 m-auto mt-2 mb-3 bg-white shadow">
                    <Image
                      src="/svg/github.svg"
                      width={20}
                      height={20}
                      alt="enter github logo"
                      className="mx-2 text-white bg-white"
                    ></Image>
                    <input
                      id="github"
                      className="w-full px-3 py-2 focus:outline-none"
                      type="text"
                      placeholder="Enter github UserName"
                      value={socials.github}
                      onChange={handleSocials}
                    />
                  </span>
                  <span className="flex flex-row items-center w-11/12 m-auto mt-2 mb-3 bg-white shadow">
                    <Image
                      src="/svg/youtube.svg"
                      width={20}
                      height={20}
                      alt="enter youtube logo"
                      className="mx-2 text-white bg-white"
                    ></Image>
                    <input
                      id="youtube"
                      className="w-full px-3 py-2 focus:outline-none"
                      type="text"
                      placeholder="Enter Youtube UserName"
                      value={socials.youtube}
                      onChange={handleSocials}
                    />
                  </span>
                  <input
                    type="submit"
                    value="Save Socials"
                    className="w-32 px-4 py-2 mt-4 text-white bg-blue-600 border shadow-md cursor-pointer rouned-md"
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

export default socials
