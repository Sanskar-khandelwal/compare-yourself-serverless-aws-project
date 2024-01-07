import React from "react"
import Link from "next/link"

const SocialTree = (props) => {
  console.log(props.socials, "i am props.socials")
  if (props.socials == null) {
    return
  }
  const network = props.socials
  let { facebook, instagram, twitter, github, linkedin, youtube } =
    props.socials

  return (
    <>
      <div className="flex flex-row justify-center mx-auto ">
        <Link
          className="p-2 mx-3 transition-all duration-500 rounded-full select-none hover:scale-110"
          target="_blank"
          href={`https://facebook.com/${facebook}`}
        >
          <img className="w-8 h-8" src="/svg/facebook.svg" alt="" />
        </Link>
        <Link
          className="p-2 mx-3 transition-all duration-500 rounded-full select-none hover:scale-110"
          target="_blank"
          href={`https://twitter.com/${twitter}`}
        >
          <img className="w-8 h-8" src="/svg/twitter.svg" alt="" />
        </Link>
        <Link
          className="p-2 mx-3 transition-all duration-500 rounded-full select-none hover:scale-110"
          target="_blank"
          href={`https://instagram.com/${instagram}`}
        >
          <img className="w-8 h-8" src="/svg/instagram.svg" alt="" />
        </Link>
        <Link
          className="p-2 mx-3 transition-all duration-500 rounded-full select-none hover:scale-110"
          target="_blank"
          href={`https://github.com/${github}`}
        >
          <img className="w-8 h-8" src="/svg/github.svg" alt="" />
        </Link>
        <Link
          className="p-2 mx-3 transition-all duration-500 rounded-full select-none hover:scale-110"
          target="_blank"
          href={`https://linkedin.com/in/${linkedin}`}
        >
          <img className="w-8 h-8" src="/svg/linkedin.svg" alt="" />
        </Link>
        <Link
          className="p-2 mx-3 transition-all duration-500 rounded-full select-none hover:scale-110"
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
