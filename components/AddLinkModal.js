import React from 'react'
import UserHeader from "@/components/UserHeader"
import  { useState, useEffect } from "react"
import axios from "axios"
import { toast } from "react-toastify"

const AddLinkModal = ({isOpen, onClose, serverLinks, setReceivedLinks}) => {

  const router = useRouter()
  const {
    getSession,
    user,
    updateUser,
    getAuthenticatedUser,
    isAuthenticated,
  } = useContext(AccountContext)

  const [links, setLinks] = useState([{ title: "", url: "" }])
  const [receivedLinks, setReceivedLinks] = useState(null)
  const [handle, setHandle] = useState(null)
  const [title, setTitle] = useState("")

  // useEffect(() => {
  //   if (isAuthenticated()) {
  //     getSession()
  //       .then((cognitoUserSession) => {
  //         if (cognitoUserSession.isValid()) {
  //           const handle =
  //             cognitoUserSession.idToken.payload["cognito:username"]
  //           setHandle(handle)
  //           axios
  //             .get(
  //               `https://lm9vl60dre.execute-api.eu-north-1.amazonaws.com/dev/compare-yourself/${handle}`,
  //               {
  //                 headers: {
  //                   "Content-Type": "application/json",
  //                 },
  //               }
  //             )
  //             .then((res) => {
  //               const response = res.data
  //               console.log("received this response from dynamodb: ", response)
  //               const socials = response[0].socials
  //               setReceivedLinks([response[0].links?.slice(-1, 1)])
  //               const socialObj = {
  //                 facebook: socials?.facebook.S,
  //                 twitter: socials?.twitter.S,
  //                 instagram: socials?.instagram.S,
  //                 youtube: socials?.youtube.S,
  //                 linkedin: socials?.linkedin.S,
  //                 github: socials?.github.S,
  //               }
  //               console.log("This is the social obj", socialObj)

  //               updateUser({
  //                 ...response[0],
  //                 socials: socialObj,
  //               })
  //             })
  //             .catch((err) => {
  //               console.log(err)
  //             })
  //         } else {
  //           router.push("/login")
  //         }
  //       })
  //       .catch((err) => {
  //         router.push("/login")
  //       })
  //   } else {
  //     router.push("/login")
  //   }
  // }, [])

  function saveLinks(e) {
    e.preventDefault()

    getSession()
      .then((cognitoUserSession) => {
        const linksArray = Object.values(links)
         console.log("the links array", linksArray)

        function convertToJsonString(data) {
          // Convert the array to a JSON string with removed double quotes
          const jsonString = JSON.stringify(data)
            .replace(/\"([^(\")"]+)\":/g, '$1:')
            .replace(/"/g, '');
        
          return jsonString;
        }
          
        const payload = {
          name: user?.name,
          bio: user?.bio,
          image: user?.image,
          handle: user?.handle,
          userId: user?.userId,
          email: user?.email,
          socials: user?.socials,
          links: convertToJsonString(linksArray),
        }

        console.log(payload, "in links.js")

        updateUser({...payload, links: linksArray})
        axios
          .post(
            "https://lm9vl60dre.execute-api.eu-north-1.amazonaws.com/dev/compare-yourself",
            payload,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: cognitoUserSession.getIdToken().getJwtToken(),
              },
            }
          )
          .then((res) => {
            const data = res
            console.log("console statement from links.js", data)

            if (data.status == "error") return toast.error(data.error)
            toast.success("Links saved Successfully")
          })
          .catch((e) => {
            console.log(e)
            toast.error(e.message)
          })
      })
      .catch((error) => {
        // Handle any errors that occurred during the getSession method
        console.error("Error:", error)
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


  console.log(isOpen)
  console.log(serverLinks)
     
    const [link, setLink] = useState([{ url: "", title: "" }])
    const [payloadLinks, setPayloadLinks] = useState()
    
    setPayloadLinks([...serverLinks, link])

    function saveLinks(e) {
      e.preventDefault()
      getSession()
      .then((cognitoUserSession) => { 
        const payload = {
          'name': user.name,
          'bio': user.bio,
          'image': user.image,
          'handle': user.handle,
          'userId': user.userId,
          'email': user.email,
          'socials': user.socials,
          'links': links

     }
     updateUser(payload)
        axios
          .post(
            "https://lm9vl60dre.execute-api.eu-north-1.amazonaws.com/dev/compare-yourself",
           payload,
            {
              headers: {
                "Content-Type": "application/json",
                "Authorization": cognitoUserSession.getIdToken().getJwtToken()
              },
            }
          )
          .then((res) => {
            const data = res
            console.log("console statement from profile.js", data)
            if (data.status == "error") return toast.error(data.error)
            toast.success("Profile saved Successfully")
          })
          .catch((e) => {
            console.log(e)
            toast.error(e.message)
          })
      })
      .catch((error) => {
        // Handle any errors that occurred during the getSession method
        console.error("Error:", error)
      })
    }


    const handleLinkChange = function(field, value){
    setLink((prevLinks) => ({
      ...prevLinks,
      [field]: value,
    }));
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center w-full h-screen p-2 overflow-x-hidden overflow-y-auto border outline-none backdrop-blur-lg focus:outline-none'>
        
       
    <form onSubmit={saveLinks} className='relative p-10 bg-gray-100 rounded-xl'>
    <div className='absolute cursor-pointer top-5 right-5' onClick={onClose}> x</div>
        <div
          
          className="flex flex-col items-center max-w-5xl mx-auto mt-4 "
        >
          <div className="flex flex-col">
          <label>
            <input
              className="p-1 px-2 text-xl text-gray-600 border shadow outline-none "
              type="text"
              placeholder="Enter Title"
              value={link.title}
              onChange={(e) =>
                handleLinkChange("title", e.target.value)
              }
            />
          </label>

          <label className='mt-5'>
            <input
              className="p-1 px-2 text-xl text-gray-600 align-baseline border shadow outline-none"
              type="text"
              placeholder="Enter URL"
              value={link.url}
              onChange={(e) =>
                handleLinkChange("url", e.target.value)
              }
            />

           
          </label>
            </div>
        </div>
 

      <button
        className="bg-[#19c37d] text-white px-4 py-2 rounded-md block  mx-auto mt-4"
        type="submit"
      >
        {" "}
        Save links
      </button>
    </form>

    <form onSubmit={saveLinks}>
                {links.map((link, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between max-w-5xl mx-auto mt-4 "
                  >
                    <label>
                      <input
                        className="p-1 px-2 text-xl text-gray-600 align-baseline border-2 rounded-md shadow outline-none font"
                        type="text"
                        placeholder="Enter Title"
                        value={link.title}
                        onChange={(e) =>
                          handleLinkChange(index, "title", e.target.value)
                        }
                      />
                    </label>
                    <label>
                      <input
                        className="p-1 px-2 text-xl text-gray-600 border-2 rounded-md shadow outline-none font"
                        type="text"
                        placeholder="Enter Url"
                        value={link.url}
                        onChange={(e) =>
                          handleLinkChange(index, "url", e.target.value)
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
  )
}

export default AddLinkModal