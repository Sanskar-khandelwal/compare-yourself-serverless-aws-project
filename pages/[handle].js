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
  const [receivedLinksArray, setReceivedLinksArray] = useState([])
  const [receivedTitlesArray, setReceivedTitlesArray] = useState([])
  const { getSession, user, updateUser } = useContext(AccountContext)

  function convertLinksToArray(inputString) {
    try {
      // Remove square brackets and spaces, then split by commas
      const array = inputString.replace(/\[|\]|\s/g, "").split(",")

      // Filter out empty strings and trim whitespace
      const resultArray = array.filter((item) => item.trim() !== "")

      console.log("The converted links array is", resultArray)
      return resultArray
    } catch (error) {
      console.error("Error converting links string to array:", error)
      return []
    }
  }

  function convertTitlesToArray(inputString) {
    console.log("the input title string is", inputString)
    try {
      // Remove square brackets and spaces, then split by commas
      const array = inputString.slice(1, -1).split(",")

      // Filter out empty strings and trim whitespace
      const resultArray = array.map((item) => item.trim())

      console.log("The converted titles array is", resultArray)
      return resultArray
    } catch (error) {
      console.error("Error converting titles string to array:", error)
      return []
    }
  }

  useEffect(() => {
    setCount[(prev) => prev + 1]
    const fetchData = async () => {
      try {
        const handle = router.query.handle
        const data = await loadDataFromServer(handle)
        console.log(data, "data in useEffect")
        let socialObj

        console.log(typeof data[0].socials)
        if (data[0].titles.S && data[0].links.S) {
          setReceivedLinksArray(convertLinksToArray(data[0].links.S))
          setReceivedTitlesArray(convertTitlesToArray(data[0].titles.S))
        }
        if (data[0].socials) {
          let lengthOfSocialObject = Object.keys(data[0].socials).length
          if (lengthOfSocialObject > 0) {
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
              titles: data[0].titles ? data[0].titles.S : "",
              links: data[0].links ? data[0].links.S : "",
            })
          }
          setLoading(false)
        } else {
          updateUser({
            ...data,
            titles: data[0].titles ? data[0].titles.S : "",
            links: data[0].links ? data[0].titles.S : "",
          })
          setLoading(false)
        }

        setData(data)
        setUserFound(true)
        setLoading(false)

        // console.log(data, "data in the useEffect")
      } catch (error) {
        console.error("Error fetching data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [handle])

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <h1> Dude Hang On, let Me load</h1>
      </div>
    )
  }

  return (
    <>
      <div className="relative max-w-3xl mx-auto mt-10 bg-white/95 rounded-2xl">
        <ShareButton />
        {user && <LinkTree data={data} />}
        <SocialTree socials={socials} />
        <div className="mt-10">
          {receivedLinksArray.map((url, index) => (
            <LinkTreeCard
              key={index}
              url={url}
              title={receivedTitlesArray[index]}
            />
          ))}
        </div>
      </div>
    </>
  )
}
