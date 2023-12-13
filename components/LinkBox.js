import React from 'react'

const LinkBox = ({lbTitle, lbNumber, lbSvg, lbTheme}) => {
  return (
    <div className="flex items-center p-8 bg-whitem rounded-lg shadow border">
    <div className={ "inline-flex flex-shrink-0 items-center justify-center h-8 w-8 rounded-full mr-6"} >
      <img src={`/svg/${lbSvg}.svg`} alt="" />
    </div>
    <div>
      <span className="inline-block text-2xl font-bold">{lbNumber}</span>
      <span className="block text-gray-500">{lbTitle}</span>
    </div>
  </div>
  )
}

export default LinkBox