import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"

const LinkTreeCard = ({url, title}) => {
 
  const router = useRouter()
  return (
    <>
      <div className="w-full mt-5  mx-auto">
        {/* <Link
          href={data.url}
          className="flex items-center p-2 rounded-xl  text-white bg-gray-100 border hover:bg-gray-100 mb-3 mx-3 hover:-translate-y-1 transition-all duration-500"
        > */}
        
        <Link href={url}
        
          target="_black"
          className="flex items-center p-2 rounded-xl  text-white hover:bg-gray-100 mb-3 mx-3 hover:-translate-y-1 transition-all duration-500  backdrop-filter backdrop-blur-3xl bg-opacity-60 border border-gray-200"
        >
          <div
            className="bg-black hover:bg-gray-700 rounded-full p-1 w-11 mr-5"
            
            alt=""
          />
          <h4 className="md:text-lg text-black text-center mx-auto text-Poppins">{title}</h4>
        </Link>
      </div>
    </>
  )
}

export default LinkTreeCard
