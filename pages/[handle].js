import React, { useEffect, useState, useContext, cache } from "react"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import LinkTree from "@/components/LinkTree"
import SocialTree from "@/components/SocialTree"
import ShareButton from "@/components/ShareButton"

import axios from "axios"
import Link from "next/link"
import { CognitoUserSession } from "amazon-cognito-identity-js"
import { AccountContext } from "@/context/Account"
import LinkTreeCard from "@/components/LinkTreeCard"
import { GetServerSideProps } from "next"

const loadDataFromServer = async (handle) => {
  console.log(handle, "received in function")
  const response = await fetch(
    `https://lm9vl60dre.execute-api.eu-north-1.amazonaws.com/dev/compare-yourself/${handle}`
  )
  return response.json()
}

export default function Handle() {
  const [articles, setArticles] = useState([])
  const router = useRouter()
  const handle = router.query.handle
  const [count, setCount] = useState(0)
  const [data, setData] = useState({})
  const [userFound, setUserFound] = useState(false)
  const [loading, setLoading] = useState(true)
  const [socials, setSocials] = useState(null)
  const { getSession, user, updateUser } = useContext(AccountContext)

  console.log(handle, "handle in blog")

  useEffect(() => {
    setCount[(prev) => prev + 1]
    const fetchData = async () => {
      try {
        const handle = router.query.handle
        const data = await loadDataFromServer(handle)
        console.log(data, "data in useEffect")
        let socialObj;

        console.log(typeof data[0].socials)
        let lengthOfSocialObject = Object.keys(data[0].socials).length;
    
        if(lengthOfSocialObject > 0){
          const socials = data[0]?.socials

           socialObj = {
            facebook: socials?.facebook,
            twitter: socials?.twitter,
            instagram: socials?.instagram,
            youtube: socials?.youtube,
            linkedin: socials?.linkedin,
            github: socials?.github,
          }
        setSocials(socialObj)
         updateUser({
          ...data,
          socials: socialObj,
          titles: data[0].titles.S,
          links: data[0].links.S
        })

        }
  else {
        updateUser({
          ...data,
          titles: data[0].titles.S,
          links: data[0].links.S
        })
      }


        setData(data)
        setUserFound(true)
       

        // console.log(data, "data in the useEffect")
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [handle])

  return (
    <>
      <div className="relative max-w-3xl mx-auto mt-10 bg-white/95 rounded-2xl">
        <ShareButton />
      {user &&  <LinkTree data={data} />}
        <SocialTree socials={socials} />
        {/* <div className="mt-10">
            {
              linksArray && linksArray.map((link) => {
                return  <LinkTreeCard data = {link}/>
              })
            }
            </div> */}
      </div>
    </>
  )
}
