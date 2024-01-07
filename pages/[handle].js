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

// const loadDataFromServer = async (handle) => {
//   console.log(handle, "received in function")
//   const response = await fetch(
//     `https://lm9vl60dre.execute-api.eu-north-1.amazonaws.com/dev/compare-yourself/${handle}`
//   )
//   return response.json()
// }

export default function Handle() {
  const [articles, setArticles] = useState([])
  const router = useRouter()
  const handle = router.query.handle
  const [count, setCount] = useState(0)
  const [data, setData] = useState({})
  const [userFound, setUserFound] = useState(false)
  const [loading, setLoading] = useState(true)
  const [socials, setSocials] = useState(null)
  const [receivedLinks, setReceivedLinks] = useState([])
  // const [receivedTitlesArray, setReceivedTitlesArray] = useState([])
  const { getSession, user, updateUser } = useContext(AccountContext)

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
    const handle = router.query.handle
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
        if (response[0].links.L) {
          const normalizedArray = dbResponseToArray(response[0].links.L)
          setReceivedLinks(normalizedArray)
        }
        let socialObj = {}
        if (response[0].socials) {
          let lengthOfSocialObject = Object.keys(response[0].socials).length
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
            links: receivedLinks,
          })
        }

        console.log("This is the social obj", socialObj)

        updateUser({
          ...response[0],
          socials: socialObj,
          links: receivedLinks,
        })
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
      .catch((err) => {
        router.push("/login")
      })
  }, [handle])

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <h1> Dude Hang On, let Me load</h1>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-hero-bg">
      <div className="relative max-w-2xl pt-16 mx-auto text-white">
        <ShareButton />
        {user && <LinkTree data={user} />}
        <div className="mt-4">
          <SocialTree socials={socials} />
        </div>
        <div className="max-w-xl mx-auto mt-5">
          {receivedLinks.map((linkObj, index) => (
            <LinkTreeCard key={index} url={linkObj.url} title={linkObj.title} />
          ))}
        </div>
      </div>
      <div className="absolute px-2 py-2 mx-auto text-white bottom-5">
        Claim Your Link
      </div>
    </div>
  )
}
