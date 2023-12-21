import React, { useContext } from "react"
import LinkTreeCard from "../components/LinkTreeCard"
import { AnimatePresence, motion } from "framer-motion"

import {  AccountContext } from "@/context/Account"


const LinkTree = ({props}) => {

 const {user} =  useContext(AccountContext)
 const {name, image, handle, bio} = user
  // console.log("console statement from LinkTree.js", user.name, user.handle, user.userId)
  return (
    <>
      <section>
        <div className="flex flex-col items-center mt-5">
          <img
            className="w-32 h-32 mt-2 rounded-full left-1/2 -tranlate-x-1/2"
            src={user.image ? user.image : "https://yt3.ggpht.com/a/AATXAJwNj1P3JW9IvEwMrZ9saHg_7uwe-rld2lbKrWDe=s900-c-k-c0xffffffff-no-rj-mo"}
            alt=""
          />
          <h2 className="pt-3 text-lg font-bold text-center">
            {name ? name : "No Username"}
          </h2>
          <p className="text-blue-500 font-mono text-center">Add more fields in the dashboard section</p>
        </div>
  
        <p className="pb-5 text-center">{bio}</p>
        
    
        <div className="flex flex-col justify-center w-full m-auto mx-auto max-w-7xl md:my-5">
          {/* <AnimatePresence> */}
          {/* { links.length > 0 && links.map((link, index) => {
            // ;<motion.div
            //   key={index}
            //   initial={{ opacity: 0 }}
            //   animate={{ opacity: 1 }}
            // >
            return (
              
              <LinkTreeCard
                title={link.title}
                url={link.url}
                image={link.icon}
              />
            
              
            )
            // </motion.div>
          })} */}
          {/* </AnimatePresence> */}
        </div>
      </section>
    </>
  )
}

export default LinkTree
