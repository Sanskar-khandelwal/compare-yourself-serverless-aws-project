import React, { useEffect,useState, useContext} from "react"
import axios from 'axios'
import {toast} from 'react-toastify'

import LinkBox from "@/components/LinkBox"
import UserHeader from "@/components/UserHeader"
import UserContext from "@/context/userContext"
import { AccountContext } from "@/context/Account"
import { CognitoUserSession } from "amazon-cognito-identity-js"
import { useRouter } from "next/router"
import { calcLength } from "framer-motion"


const dashboard = () => {
  const [data, setData] = useState({})
  const router = useRouter
  const {getSession, user, updateUser} = useContext(AccountContext)
  const {networkError, setNetworkError} = useState("")
  useEffect(() => {
    getSession().then((cognitoUserSession) => {
        const handle = cognitoUserSession.idToken.payload['cognito:username'];
        if(!handle){
          router.push('/login')
          return
        }
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
            facebook: socials.instagram.S,
            twitter: socials.twitter.S,
            instagram: socials.instagram.S,
            youtube: socials.youtube.S,
            linkedin: socials.linkedin.S,
            github: socials.github.S,
          }
          console.log("This is the social obj", socialObj)  
          setData(response[0])
          
          updateUser({
            ...response[0],
            socials: socialObj,
          })
        })
        .catch((err) => {
          if(err.message = 'Network Error'){
                setNetworkError("There might be issue with the you Network Connection ")
          }
          console.log(err)
        })
    }).catch(err => {
      router.push("/login")
    })
}, [router.events]);

console.log("user recevied in dashboard", user)

  return (
    <>
      <div>
      
          <h1 className="text-xl text-center text-red-500"> {networkError}</h1>
        
       { user && <UserHeader user = {user}/>}
        <main>
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <LinkBox lbTitle="Links" lbNumber={data.links} lbSvg="url" lbTheme="white" />
            <LinkBox
              lbTitle="Growth"
              lbNumber="5%"
              lbSvg="growth"
              lbTheme="blue"
            />
            <LinkBox
              lbTitle="bubble"
              lbNumber="5"
              lbSvg="bubble"
              lbTheme="white"
            />
            <LinkBox lbTitle="Look" lbNumber="5%" lbSvg="ig" lbTheme="blue" />
          </section>
        </main>
      </div>
    </>
  )
}

export default dashboard
