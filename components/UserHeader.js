import React, { useContext, useEffect , useState} from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import UserContext from "@/context/userContext"
import axios from 'axios'
import {toast} from 'react-toastify'
import { AccountContext } from "@/context/Account"


const UserHeader = ({user}) => {
  const router = useRouter()
  
  const [currentUser, setCurrentUser] = useState('')
  useEffect(() => {
    getSession().then((cognitoUserSession) => {
        const handle = cognitoUserSession.idToken.payload['cognito:username'];
        setCurrentUser(handle)
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
          setCurrentUser(user)
        })
        .catch((err) => {
          console.log(err)
        })
    }).catch(err => {
      router.push("/login")
    })
}, [router.events]);
  

 
  const {getSession, updateUser} = useContext(AccountContext)
 

  console.log("console statement from userHeader", user)

  return (
    <>
      <header className="flex flex-row items-center justify-between max-w-5xl mx-auto mt-3">
  <div className="flex flex-col md:flex-row">
    <Link href="/edit/links">
      <button className="inline-flex w-40 px-5 py-3 mb-3 mr-3 font-bold text-gray-600 border rounded-md md:w-auto hover:text-gray-900 hover:bg-gray-100">
        <img src="/svg/url.svg" alt="" className="w-4 h-4 mr-2" />
        <span className="text-sm">Edit Link</span>
      </button>
    </Link>
    <Link href="/edit/profile">
      <button className="inline-flex w-40 px-5 py-3 mb-3 font-bold text-gray-600 border rounded md:w-auto hover:text-gray-900 hover:bg-gray-100">
        <img src="/svg/profile.svg" alt="" className="w-4 h-4 mr-2" />
        <span className="text-sm">Edit Profile</span>
      </button>
    </Link>
    <Link href="/edit/socials">
      <button className="inline-flex w-40 px-5 py-3 mb-3 font-bold text-gray-600 border rounded md:w-auto hover:text-gray-900 hover:bg-gray-100">
        <img src="/svg/profile.svg" alt="" className="w-4 h-4 mr-2" />
        <span className="text-sm">Edit Socials</span>
      </button>
    </Link>
  </div>

  
    <div className="flex flex-row items-center mb-4">
    <Link href={`http://localhost:3000/${user.handle}`}> 
      <div className="inline-flex items-center px-4 py-2 mr-4 border border-gray-300 rounded-lg hover:bg-gray-100">
        your page
      </div>
      </Link>
     
      <img
        className="w-5 h-5 ml-2 cursor-pointer hover:opacity-75"
        src="/svg/logout.svg"
        alt="Logout"
        // onClick={handleLogout}
      />
      </div>

</header>

    </>
  )
}

export default UserHeader
