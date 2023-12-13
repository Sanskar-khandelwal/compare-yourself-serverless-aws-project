import React, { useEffect,useState, useContext} from "react"
import axios from 'axios'
import {toast} from 'react-toastify'

import LinkBox from "@/components/LinkBox"
import UserHeader from "@/components/UserHeader"
import UserContext from "@/context/userContext"


const dashboard = () => {
  const [data, setData] = useState({})
  const { setUserData } = useContext(UserContext)
  useEffect(() => {
    if (!localStorage.getItem("LinkTreeToken"))
      return (window.location.href = "/login")

    axios
      .post(
        "https://socialverseserver-z24w.onrender.com/data/dashboard",
        {
          tokenMail: localStorage.getItem("LinkTreeToken"),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        const data = res.data
        if (data.status == "error") {
          return toast.error("Error Happened")
        }
        setData(data.userData)
        setUserData(data.userData)
        localStorage.setItem("userHandle", data.userData.handle)
        toast.success(data.message)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <>
      <div>
        <UserHeader/>
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
