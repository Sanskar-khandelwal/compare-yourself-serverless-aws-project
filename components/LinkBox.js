import React from "react"
import Image from "next/image"

const LinkBox = ({ helperText, lbTitle, lbNumber, lbSvg, lbTheme }) => {
  return (
    <div className="px-3 py-3 border rounded-lg shadow">
      <p className="text-sm text-gray-600 text-poppins"> {helperText}</p>
      <div className={"flex justify-between items-center border-gray-100 mt-2"}>
        <Image
          src={`/svg/${lbSvg}.svg`}
          width={20}
          height={10}
          alt="A svg for socialverse"
          className="w-16 h-10"
        />
        <div>
          <span className="inline-block text-2xl font-bold">{lbNumber}</span>
          <span className="block text-gray-500">{lbTitle}</span>
        </div>
      </div>
    </div>
  )
}

export default LinkBox
