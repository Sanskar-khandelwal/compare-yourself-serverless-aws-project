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

const profile = () => {
  const router = useRouter()
  const { getSession, user , updateUser, getAuthenticatedUser, isAuthenticated} = useContext(AccountContext)
  const [handle, setHandle] = useState(null)
  const [data, setData] = useState({})
  const [socials, setSocials] = useState({
    facebook: "",
    twitter: "",
    instagram: "",
    youtube: "",
    linkedin: "",
    github: "",
  })


  useEffect(() => {
    if(isAuthenticated()){ 
       getSession()
      .then((cognitoUserSession) => {
    if(cognitoUserSession.isValid()){
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


         //// social changes
        let socialObj;
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
         })
       })
       .catch((err) =>{
         console.log(err)
       })
      }
      else{
        router.push("/login")
      }
       
      })
      .catch((err) => {
        router.push("/login")
      })} else{
        router.push('/login')
      }
  }, [])
  
  console.log(user, "in dashboard")
  const [name, setName] = useState() 
  const [bio, setBio] = useState("")
  const [image, setImage] = useState(
    "https://cdn-icons-png.flaticon.com/128/4140/4140048.png"
  )
  

 

  function saveProfile(e) {
    e.preventDefault()
    getSession()
    .then((cognitoUserSession) => { 
      const payload = {
        "name": name,
        "bio": bio,
        "image": image,
        "handle": user?.handle,
        "userId": user?.userId,
        "email": user?.email,
        "socials": user?.socials ,
        "links": user?.links ? user.links.S : "", 
        "titles": user?.titles ? user.titles.S : ""
   }
 
   console.log(cognitoUserSession.getIdToken().getJwtToken())
   updateUser(payload)
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
 
  

  return (
    <>
      <div>
        <UserHeader handle = {handle} />
        <main>
          <section>
            <div >
              <h4 className="mb-5 text-lg font-bold text-center">
                Edit Profile
              </h4>
              <div className="max-w-5xl mx-auto ">
                <form
                  onSubmit={saveProfile}
                  className="flex flex-col items-center justify-center col-span-2"
                >
                  <span className="flex flex-row items-center w-11/12 m-auto mb-3 bg-white shadow">
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
                      onChange={(e) => setName(e.target.value)}
                    />
                  </span>
                  <span className="flex flex-row items-center w-11/12 m-auto mb-3 bg-white shadow">
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

                  <span className="flex flex-row items-center w-11/12 m-auto mb-3 bg-white shadow">
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
