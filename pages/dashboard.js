import React, { useEffect, useState, useContext } from "react"
import axios from "axios"
import { toast } from "react-toastify"

import LinkBox from "@/components/LinkBox"
import UserHeader from "@/components/UserHeader"
import UserContext from "@/context/userContext"
import { AccountContext } from "@/context/Account"
import { CognitoUserSession } from "amazon-cognito-identity-js"
import { useRouter } from "next/router"
import useSWR from "swr"

const dashboard = () => {
  const [data, setData] = useState(null)
  const router = useRouter()
  const { getSession, user, updateUser, isAuthenticated, getAuthenticatedUser } = useContext(AccountContext)
  const [handle, setHandle]  = useState(null)
  const [loading, setLoading] = useState(true)
 


 
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
         const socials = response[0].socials
         const socialObj = {
           facebook: socials?.facebook.S,
           twitter: socials?.twitter.S,
           instagram: socials?.instagram.S,
           youtube: socials?.youtube.S,
           linkedin: socials?.linkedin.S,
           github: socials?.github.S,
         }
         console.log("This is the social obj", socialObj)
         setData(response[0])
         updateUser({
           ...response[0],
           socials: socialObj,
         })
         setLoading(false)
       })
       .catch((err) => {
         if ((err.message = "Network Error")) {
                console.log("Message from social Verse: Network Issue detected")
         }
         setLoading(false)
         console.log(err)
       })
      }
      else{
        router.push("/login")
        setLoading(false)
      }
       
      })
      .catch((err) => {
        router.push("/login")
        setLoading(false)
      })} else{
        router.push('/login')
        setLoading(false)
      }
  }, [])



  console.log("user recevied in dashboard", user)
  

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
        
        {handle && <UserHeader handle={handle} />}
        <main className="flex justify-between max-w-5xl mx-auto mt-12 rounded-md text-poppins">
         { console.log(data, "this is the data")}
          {
            data &&   <section className="flex-1 w-full px-4 border border-gray-100">
            <div className="flex justify-between w-full py-1 mt-1 border-b border-gray-200">
              <p className="font-medium "> Name </p>
              {user.name ? (
                <button className="w-20 py-1 text-sm text-center text-green-800 rounded-md bg-green-300/50">
                  {" "}
                  Added{" "}
                </button>
              ) : (
                <button className="w-20 py-1 text-sm text-center text-red-800 rounded-md bg-red-200/50">
                  {" "}
                  Add now{" "}
                </button>
              )}
            </div>
            <div className="flex justify-between w-full py-1 mt-1 border-b border-gray-200">
              <p className="font-medium">Bio </p>
              {user?.bio ? (
                <button className="w-20 py-1 text-sm text-center text-green-800 rounded-md bg-green-300/50">
                  {" "}
                  Added{" "}
                </button>
              ) : (
                <button className="w-20 py-1 text-sm text-center text-red-800 rounded-md bg-red-200/50">
                  {" "}
                  Add now{" "}
                </button>
              )}
            </div>
            <div className="flex justify-between w-full py-1 mt-1 border-b border-gray-200">
              <p className="font-medium">Profile Photo </p>
              {user?.image ? (
                <button className="w-20 py-1 text-sm text-center text-green-800 rounded-md bg-green-300/50">
                  {" "}
                  Added{" "}
                </button>
              ) : (
                <button className="w-20 py-1 text-sm text-center text-red-800 rounded-md bg-red-200/50">
                  {" "}
                  Add now{" "}
                </button>
              )}
            </div>
            <div className="flex justify-between w-full py-1 mt-1 border-b border-gray-200">
              <p className="font-medium">Socials </p>
              {user?.socials ? (
                <button className="w-20 py-1 text-sm text-center text-green-800 rounded-md bg-green-300/50">
                  {" "}
                  Added{" "}
                </button>
              ) : (
                <button className="w-20 py-1 text-sm text-center text-red-800 rounded-md bg-red-200/50">
                  {" "}
                  Add now{" "}
                </button>
              )}
            </div>
          </section>
          }
        
          <section className="grid flex-1 gap-4 px-4 sm:grid-cols-2 xl:grid-cols-2">
            <LinkBox
              helperText="Number of Impression"
              lbTitle="Links"
              lbNumber={"5"}
              lbSvg="url"
              lbTheme="white"
            />
            <LinkBox
              helperText="Number of Impression"
              lbTitle="Growth"
              lbNumber="5%"
              lbSvg="growth"
              lbTheme="blue"
            />
            <LinkBox
              helperText="Number of Impression"
              lbTitle="bubble"
              lbNumber="5"
              lbSvg="bubble"
              lbTheme="white"
            />
            <LinkBox
              helperText="Number of Impression"
              lbTitle="Look"
              lbNumber="5%"
              lbSvg="ig"
              lbTheme="blue"
            />
          </section>
        </main>
      </div>
    </>
  )
}

export default dashboard
