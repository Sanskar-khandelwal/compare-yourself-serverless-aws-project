import React, { useContext } from "react"
import LinkTreeCard from "../components/LinkTreeCard"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"

import { AccountContext } from "@/context/Account"

const LinkTree = (props) => {
  console.log(props.data, "the dat in linktree")
  const { name, image, handle, bio } = props.data
  // console.log("console statement from LinkTree.js", user.name, user.handle, user.userId)
  return (
    <>
      <section className="mx-auto">
        <div className="flex flex-col items-center">
          <Image
            className="object-cover w-32 h-32 mt-2 rounded-full left-1/2 -tranlate-x-1/2"
            src={image ? image : ""}
            width={100}
            height={100}
            alt=""
          />
          <h2 className="w-9/12 px-16 mx-auto mt-4 text-lg font-semibold text-center font-poppins">
            {name ? name : "No Username"}
          </h2>
        </div>

        <p className="mt-1 text-center ">{bio}</p>
      </section>
    </>
  )
}

export default LinkTree
