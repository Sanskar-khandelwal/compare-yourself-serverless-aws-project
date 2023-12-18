import UserHeader from "@/components/UserHeader"
import React, { useState, useEffect } from "react"
import axios from "axios"
import { toast } from "react-toastify"

const links = () => {
  const [links, setLinks] = useState([{ url: "", title: "" }])

  const [title, setTitle] = useState("")

  function saveLinks(e) {
    e.preventDefault()
    toast.success("Links Saved!!")
    const linksArray = Object.values(links)
    const titlesArray = Object.values(title)
    const linksData = linksArray.map((link, index) => ({
      link,
      title: titlesArray[index],
    }))



    axios
      .post(
        "https://socialverseserver-z24w.onrender.com/save/links",
        {
          tokenMail: localStorage.getItem("LinkTreeToken"),
          links: linksData,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      )
      .then((res) => {
        const data = res.data
        if ((data.status = "error")) {
          return toast.error(data.error)
        }
        toast.success("Links saved Successfully")
      })
  }

  function handleLinkChange(index, field, value) {
    const updatedLinks = [...links]
    const linkToUpdate = { ...updatedLinks[index], [field]: value }
    updatedLinks[index] = linkToUpdate
    setLinks(updatedLinks)
  }

  function handleAddLink() {
    setLinks([...links, { url: "", title: "" }])
  }
  function handleRemoveLinks(index) {
    const updatedLinks = [...links]
    updatedLinks.splice(index, 1)
    setLinks(updatedLinks)
  }



  return (
    <>
      <div>
        <UserHeader />
        <main className="mt-4">
          <section>
            <h1 className="text-xl font-bold text-center text-gray-800">
                             Customize links
            </h1>
            <div>
              <form onSubmit={saveLinks}>
                {links.map((link, index) => (
                  <div key={index} className="flex items-center justify-between max-w-5xl mx-auto mt-4 ">
                    <label>
            
                      <input
                        className="p-1 px-2 text-xl text-gray-600 align-baseline border-2 rounded-md shadow outline-none font"
                        type="text"
                        placeholder="Enter URL"
                        value={link.url}
                        onChange={(e) =>
                          handleLinkChange(index, "url", e.target.value)
                        }
                      />
                    </label>
                    <label>
                
                      <input
                        className="p-1 px-2 text-xl text-gray-600 border-2 rounded-md shadow outline-none font"
                        type="text"
                        placeholder="Enter Name"
                        value={link.title}
                        onChange={(e) =>
                          handleLinkChange(index, "title", e.target.value)
                        }
                      />
                    </label>
                   <img
                      src="/svg/addition.svg"
                      className="cursor-pointer w-7 h-7"
                      type="button"
                      onClick={(e) => handleAddLink(index)}
                      alt="icon to delete link"
                    />
                    <img
                      src="/svg/delete.svg"
                      className="cursor-pointer w-9 h-9"
                      type="button"
                      onClick={(e) => handleRemoveLinks(index)}
                      alt="icon to delete link"
                    />
                  </div>
                ))}
               
                 
                  <button
                    className="bg-[#19c37d] text-white px-4 py-2 rounded-md block  mx-auto mt-4"
                    type="submit"
                    
                  >
                    {" "}
                    Save links
                  </button>
         
              </form>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}

export default links
