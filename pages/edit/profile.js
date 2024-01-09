import React, { useContext, useState } from "react"
import { useEffect } from "react"
import UserContext from "@/context/userContext"
import UserHeader from "@/components/UserHeader"
import Image from "next/image"
import { toast } from "react-toastify"
import axios from "axios"

import { AccountContext } from "@/context/Account"
import { useRouter } from "next/router"
import SocialTree from "@/components/SocialTree"
import LinkTree from "@/components/LinkTree"
import ChangePassword from "@/components/ChangePassword"
import DeleteUserModal from "@/components/DeleteUserModal"

const profile = () => {
  const router = useRouter()
  const {
    getSession,
    user,
    updateUser,
    getAuthenticatedUser,
    isAuthenticated,
  } = useContext(AccountContext)

  const [loading, setLoading] = useState(true)
  const [handle, setHandle] = useState(null)
  const [data, setData] = useState({})
  const [name, setName] = useState()
  const [bio, setBio] = useState("")
  const [isModalOpen, setModalOpen] = useState(false)
  const [image, setImage] = useState("")
  const [receivedLinks, setReceivedLinks] = useState([])

  const [socials, setSocials] = useState({
    facebook: "",
    twitter: "",
    instagram: "",
    youtube: "",
    linkedin: "",
    github: "",
  })

  const openModal = () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  function dbResponseToArray(links) {
    if (!links || links.length == 0) {
      return []
    }
    const normalizedArray = links.map((link) => {
      return {
        title: link.M.title.S,
        url: link.M.url.S,
      }
    })
    return normalizedArray
  }

  useEffect(() => {
    if (isAuthenticated()) {
      getSession()
        .then((cognitoUserSession) => {
          if (!cognitoUserSession.isValid()) {
            throw new Error("Session is Not Valid")
          }
          const handle = cognitoUserSession.idToken.payload["cognito:username"]
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

              //managing links
              let normalizedArray
              if (response[0].links.L) {
                normalizedArray = dbResponseToArray(response[0].links.L)
                setReceivedLinks(normalizedArray)
              }

              //// social changes
              setName(response[0].name)
              if (response[0].bio) {
                setBio(response[0].bio)
              }
              if (response[0].image) {
                setImage(response[0].image)
              }
              let socialObj
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
              }
              setData(response[0])

              updateUser({
                ...response[0],
                socials: socials,
                links: normalizedArray,
              })

              setLoading(false)
            })
        })
        .catch((err) => {
          console.log(err)
          router.push("/login")
          setLoading(false)
        })
    } else {
      router.push("/login")
    }
  }, [])

  function saveProfile(e) {
    e.preventDefault()
    getSession()
      .then((cognitoUserSession) => {
        const payload = {
          name: name,
          bio: bio,
          image: image,
          handle: user?.handle,
          userId: user?.userId,
          email: user?.email,
          socials: socials,
          links: receivedLinks,
        }
        updateUser(payload)
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
            console.log("console statement from profile.js", data)
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
        <h1 className="text-2xl font-semibold"> Dude Hang On, let Me load</h1>
      </div>
    )
  }

  return (
    <>
      {isModalOpen && user && (
        <DeleteUserModal
          isOpen={isModalOpen}
          onClose={closeModal}
          name={user.name}
          handle={user.handle}
        />
      )}
      <div className="max-w-5xl mx-auto">
        <UserHeader handle={handle} />
        <main className="px-10 py-5 bg-white rounded-lg shadow my-14">
          <section>
            <div>
              <div className="mx-auto ">
                <form
                  onSubmit={saveProfile}
                  className="flex flex-col w-11/12 gap-4 mx-auto"
                >
                  {" "}
                  <p className="text-3xl font-poppins">Edit Profile Details</p>
                  <span className="flex flex-row items-center w-full m-auto mb-3 bg-white shadow">
                    <Image
                      src="/svg/user.svg"
                      width={20}
                      height={20}
                      alt="user logo"
                      className="mx-2 text-center text-white bg-white"
                    />
                    <input
                      className="w-full px-3 py-2 focus:outline-none"
                      type="text"
                      placeholder="Set a Name"
                      value={name}
                      required
                      onChange={(e) => setName(e.target.value)}
                    />
                  </span>
                  <span className="flex flex-row items-center w-full m-auto mb-3 bg-white shadow">
                    <Image
                      src="/svg/bio.svg"
                      width={20}
                      height={20}
                      alt="bio logo"
                      className="mx-2 text-white bg-white"
                    ></Image>
                    <input
                      className="w-full px-3 py-2 focus:outline-none"
                      type="text"
                      placeholder="Enter a bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    />
                  </span>
                  <span className="flex flex-row items-center w-full m-auto mb-3 bg-white shadow">
                    <Image
                      src="/svg/avatar.svg"
                      width={20}
                      height={20}
                      alt="enter image logo"
                      className="mx-2 text-white bg-white"
                    ></Image>
                    <input
                      className="w-full px-3 py-2 focus:outline-none"
                      type="text"
                      placeholder="Enter Image Link"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                    />
                  </span>
                  <input
                    type="submit"
                    value="Save Profile"
                    className="py-2 text-center text-white bg-blue-600 border shadow-md cursor-pointer hover:bg-blue-700 rouned-md"
                  />
                </form>
              </div>
            </div>
          </section>
        </main>
        <main className="px-10 py-5 bg-white rounded-lg shadow my-14">
          <ChangePassword />
        </main>
        <main className="px-10 py-5 bg-white rounded-lg shadow my-14">
          <section className="w-11/12 mx-auto">
            <p className="mb-5 text-3xl font-poppins">Delete Your Account</p>
            <button
              className="w-40 px-4 py-2 text-white transition-all duration-200 ease-linear bg-red-600 hover:bg-red-700 font-poppins "
              onClick={openModal}
            >
              Delete Account
            </button>
            <p className="mt-4 text-base text-gray-600 font-poppins">
              Deleting account will delete all the data saved in socialverse
              permanently, Choose Wisely!⚠️
            </p>
          </section>
        </main>
      </div>
    </>
  )
}

export default profile
