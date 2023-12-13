import React from "react"
import Link from "next/link"

const LinkTreeCard = ({ title, url, image }) => {
  return (
    <>
      <div className="w-full">
        <Link
          href={url}
          className="flex items-center p-2 rounded-xl  text-white bg-gray-100 border hover:bg-gray-100 mb-3 mx-3 hover:translate-y-1 transition-all duration-500"
        >
          <img
            className="bg-black hover:bg-gray-700 rounded-full p-1 w-11 mr-5"
            src={image}
            alt=""
          />
          <h4 className="md:text-lg text-black">{title}</h4>b
        </Link>
      </div>
    </>
  )
}

export default LinkTreeCard
