import React, { useEffect,useState, useContext} from "react"
import axios from 'axios'
import {toast} from 'react-toastify'

import LinkBox from "@/components/LinkBox"
import UserHeader from "@/components/UserHeader"
import UserContext from "@/context/userContext"


const dashboard = () => {
  const [data, setData] = useState({})
  const { setUserData } = useContext(UserContext)

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
