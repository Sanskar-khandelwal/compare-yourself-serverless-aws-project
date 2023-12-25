import React, { useContext } from "react"
import LinkTreeCard from "../components/LinkTreeCard"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"

import {  AccountContext } from "@/context/Account"


const LinkTree = (props) => {
  console.log(props)
 const {name, image, handle, bio} = props.data
  // console.log("console statement from LinkTree.js", user.name, user.handle, user.userId)
  return (
    <>
      <section className="mx-auto">
        <div className="flex flex-col items-center mt-5">
          <Image
            className="object-cover w-32 h-32 mt-2 rounded-full left-1/2 -tranlate-x-1/2"
            src={image ? image : ""}
            width={100}
            height={100}

            alt=""
          />
          <h2 className="mt-4 px-16 w-9/12 mx-auto text-lg font-semibold text-center font-Poppins">
            {name ? name : "No Username"}
          </h2>
     
        </div>
  
        <p className=" text-center mt-4">{bio}</p>
        
    
      </section>
    </>
  )
}

export default LinkTree
