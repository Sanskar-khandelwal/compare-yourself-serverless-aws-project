import React from "react"
import Link from "next/link"

const SocialTree = (props) => {
 const {facebook , linkedin, twitter, instagram, github, youtube} = props.socials
  return (
    <>
      <div className="social flex flex-row justify-center mt-5  mx-auto">
        <Link
          className=" rounded-full p-2 hover:bg-zinc-100 transition-all duration-500 hover:scale-110  mx-3 select-none"
          target="_blank"
          href={`https://facebook.com/${facebook}`}
        >
          <img className="w-8 h-8" src="/svg/facebook.svg" alt="" />
        </Link>
        <Link
          className="bg-white rounded-full p-2 hover:bg-zinc-100 transition-all duration-500 hover:scale-110  mx-3 select-none"
          target="_blank"
          href={`https://twitter.com/${twitter}`}
        >
          <img className="w-8 h-8" src="/svg/twitter.svg" alt="" />
        </Link>
        <Link
          className="bg-white rounded-full p-2 hover:bg-zinc-100 transition-all duration-500 hover:scale-110  mx-3 select-none"
          target="_blank"
          href={`https://instagram.com/${instagram}`}
        >
          <img className="w-8 h-8" src="/svg/instagram.svg" alt="" />
        </Link>
        <Link
          className="bg-white rounded-full p-2 hover:bg-zinc-100 transition-all duration-500 hover:scale-110  mx-3 select-none"
          target="_blank"
          href={`https://github.com/${github}`}
        >
          <img className="w-8 h-8" src="/svg/github.svg" alt="" />
        </Link>
        <Link
          className="bg-white rounded-full p-2 hover:bg-zinc-100 transition-all duration-500 hover:scale-110  mx-3 select-none"
          target="_blank"
          href={`https://linkedin.com/in/${linkedin}`}
        >
          <img className="w-8 h-8" src="/svg/linkedin.svg" alt="" />
        </Link>
        <Link
          className="bg-white rounded-full p-2 hover:bg-zinc-100 transition-all duration-500 hover:scale-110  mx-3 select-none"
          target="_blank"
          href={`https://youtube.com/@${youtube}`}
        >
          <img className="w-8 h-8" src="/svg/youtube.svg" alt="" />
        </Link>
      </div>
    </>
  )
}

export default SocialTree
