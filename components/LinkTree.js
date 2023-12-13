import React from "react"
import LinkTreeCard from "../components/LinkTreeCard"
import { AnimatePresence, motion } from "framer-motion"


const LinkTree = ({ data }) => {
   const { name, avatar, bio, links } = data
  return (
    <>
      <section>
        <div className="flex flex-col items-center mt-5">
          <img
            className="w-20 rounded-full left-1/2 -tranlate-x-1/2 mt-2"
            src={avatar}
            alt=""
          />
          <h2 className="text-center text-lg font-bold pt-3">
            {name ? name : "No Username"}
          </h2>
        </div>
  
        <p className="text-center pb-5">{bio}</p>
        
    
        <div className="flex flex-col justify-center max-w-7xl m-auto md:my-5 w-full  mx-auto">
          {/* <AnimatePresence> */}
          {links.map((link, index) => {
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
          })}
          {/* </AnimatePresence> */}
        </div>
      </section>
    </>
  )
}

export default LinkTree
