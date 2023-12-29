// import UserHeader from "@/components/UserHeader"
// import React, { useState, useEffect, useContext } from "react"
// import axios from "axios"
// import { toast } from "react-toastify"
// import AddLinkModal from "@/components/AddLinkModal"
// import { AccountContext } from "@/context/Account"

// const links = () => {

//   const [receivedLinks, setReceivedLinks] = useState(null)
//   const [handle, setHandle] = useState(null)
//   const { getSession, user , updateUser, getAuthenticatedUser, isAuthenticated} = useContext(AccountContext)

//   useEffect(() => {
//     if(isAuthenticated()){
//        getSession()
//       .then((cognitoUserSession) => {
//     if(cognitoUserSession.isValid()){
//        const handle = cognitoUserSession.idToken.payload["cognito:username"]
//        setHandle(handle)
//        axios
//        .get(
//          `https://lm9vl60dre.execute-api.eu-north-1.amazonaws.com/dev/compare-yourself/${handle}`,
//          {
//            headers: {
//              "Content-Type": "application/json",
//            },
//          }
//        )
//        .then((res) => {
//          const response = res.data
//          console.log("received this response from dynamodb: ", response)
//          setReceivedLinks(response[0].links)
//          const socials = response[0].socials
//          const socialObj = {
//            'facebook': socials?.facebook.S,
//            'twitter': socials?.twitter.S,
//            'instagram': socials?.instagram.S,
//            'youtube': socials?.youtube.S,
//            'linkedin': socials?.linkedin.S,
//            'github': socials?.github.S,
//          }

//          console.log("This is the social obj", socialObj)
//          setData(response[0])

//          updateUser({
//            ...response[0],
//            socials: socialObj,
//          })
//        })
//        .catch((err) =>{
//          console.log(err)
//        })
//       }
//       else{
//         router.push("/login")
//       }

//       })
//       .catch((err) => {
//         router.push("/login")
//       })} else{
//         router.push('/login')
//       }
//   }, [])

//   const [title, setTitle] = useState("")
//   const [isModalOpen, setModalOpen] = useState(false);

//   const openModal = () => {
//     setModalOpen(true);
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//   };

//   function handleAddLink(){

//   }

//   function saveLinks(e) {
//     e.preventDefault()
//     toast.success("Links Saved!!")
//     const linksArray = Object.values(links)
//     const titlesArray = Object.values(title)
//     const linksData = linksArray.map((link, index) => ({
//       link,
//       title: titlesArray[index],
//     }))

//     axios
//       .post(
//         "https://socialverseserver-z24w.onrender.com/save/links",
//         {
//           tokenMail: localStorage.getItem("LinkTreeToken"),
//           links: linksData,
//         },
//         {
//           headers: {
//             "Content-type": "application/json",
//           },
//         }
//       )
//       .then((res) => {
//         const data = res.data
//         if ((data.status = "error")) {
//           return toast.error(data.error)
//         }
//         toast.success("Links saved Successfully")
//       })
//   }

//   function handleLinkChange(index, field, value) {
//     const updatedLinks = [...links]
//     const linkToUpdate = { ...updatedLinks[index], [field]: value }
//     updatedLinks[index] = linkToUpdate
//     setLinks(updatedLinks)
//   }

//   function handleAddLink() {
//     setLinks([...links, { url: "", title: "" }])
//   }
//   function handleRemoveLinks(index) {
//     const updatedLinks = [...links]
//     updatedLinks.splice(index, 1)
//     setLinks(updatedLinks)
//   }

//   return (
//     <>
//     {isModalOpen &&
//            <AddLinkModal isOpen={isModalOpen} onClose={closeModal}  setReceivedLinks={setReceivedLinks} />}
//       <div>
//         <UserHeader />
//         <main className="max-w-5xl mx-auto mt-4">
//           <button
//             className="float-right px-2 py-2 bg-gray-200 cursor-pointer"
//             onClick={openModal}         alt="icon to add link "
//           >
//             Add Link
//           </button>
//           <section>
//             <h1 className="text-xl font-bold text-center text-gray-800">
//               Customize links
//             </h1>

//           </section>
//         </main>
//       </div>
//     </>
//   )
// }

// export default links

// import UserHeader from "@/components/UserHeader";
// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import AddLinkModal from "@/components/AddLinkModal";
// import { AccountContext } from "@/context/Account";

// const Links = () => {
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [receivedLinks, setReceivedLinks] = useState([]);
//   const [links, setLinks] = useState([]);
//   const [handle, setHandle] = useState(null);
//   const { getSession, user, updateUser, isAuthenticated } = useContext(AccountContext);

//   useEffect(() => {
//         if(isAuthenticated()){
//            getSession()
//           .then((cognitoUserSession) => {
//         if(cognitoUserSession.isValid()){
//            const handle = cognitoUserSession.idToken.payload["cognito:username"]
//            setHandle(handle)
//            axios
//            .get(
//              `https://lm9vl60dre.execute-api.eu-north-1.amazonaws.com/dev/compare-yourself/${handle}`,
//              {
//                headers: {
//                  "Content-Type": "application/json",
//                },
//              }
//            )
//            .then((res) => {
//              const response = res.data
//              console.log("received this response from dynamodb: ", response)
//              setReceivedLinks(response[0].links)
//              const socials = response[0].socials
//              const socialObj = {
//                'facebook': socials?.facebook.S,
//                'twitter': socials?.twitter.S,
//                'instagram': socials?.instagram.S,
//                'youtube': socials?.youtube.S,
//                'linkedin': socials?.linkedin.S,
//                'github': socials?.github.S,
//              }

//              console.log("This is the social obj", socialObj)
//              setData(response[0])

//              updateUser({
//                ...response[0],
//                socials: socialObj,
//              })
//            })
//            .catch((err) =>{
//              console.log(err)
//            })
//           }
//           else{
//             router.push("/login")
//           }

//           })
//           .catch((err) => {
//             router.push("/login")
//           })} else{
//             router.push('/login')
//           }
//       }, [])

//   const openModal = () => {
//     setModalOpen(true);
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//   };

//   return (
//     <>
//       {isModalOpen &&(
//         <AddLinkModal isOpen={isModalOpen} onClose={closeModal}  serverLinks={receivedLinks}  setReceivedLinks={setReceivedLinks} />
//       )}
//       <div>
//         <UserHeader />
//         <main className="max-w-5xl mx-auto mt-4">
//         <button
//             className="float-right px-2 py-2 bg-gray-200 cursor-pointer"
//             onClick={openModal}
//           >
//             Add Link
//           </button>
//           <section>
//             <h1 className="text-xl font-bold text-center text-gray-800">
//               Customize links
//             </h1>

//           </section>
//         </main>
//       </div>
//     </>
//   );
// };

// export default Links;

import UserHeader from "@/components/UserHeader"
import React, { useState, useEffect, useContext } from "react"
import axios from "axios"
import { AccountContext } from "@/context/Account"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import AddLinkModal from "@/components/AddLinkModal"

const links = () => {
  const router = useRouter()
  const {
    getSession,
    user,
    updateUser,
    getAuthenticatedUser,
    isAuthenticated,
  } = useContext(AccountContext)

  const [links, setLinks] = useState([{ title: "", url: "" }])
  const [loading, setLoading] = useState(true)

  const [handle, setHandle] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)

  const [isModalOpen, setModalOpen] = useState(false)

  const [receivedLinksArray, setReceivedLinksArray] = useState([])
  const [receivedTitlesArray, setReceivedTitlesArray] = useState([])
  const [socials, setSocials] = useState({
    facebook: "",
    twitter: "",
    instagram: "",
    youtube: "",
    linkedin: "",
    github: "",
  })

  const openModal = () => {
    setModalOpen(true)
   
  }

  const closeModal = () => {
    setModalOpen(false)
 
  }

  function convertToArray(inputString) {
    try {
      // Remove square brackets and spaces, then split by commas
      const array = inputString.replace(/\[|\]|\s/g, "").split(",")

      // Filter out empty strings and trim whitespace
      const resultArray = array.filter((item) => item.trim() !== "")

      console.log("The converted array is", resultArray)
      return resultArray
    } catch (error) {
      console.error("Error converting string to array:", error)
      return []
    }
  }

  useEffect(() => {
    if (isAuthenticated()) {
      getSession()
        .then((cognitoUserSession) => {
          if (cognitoUserSession.isValid()) {
            const handle =
              cognitoUserSession.idToken.payload["cognito:username"]
            setHandle(handle)
            axios
              .get(
                `https://lm9vl60dre.execute-api.eu-north-1.amazonaws.com/dev/compare-yourself/${handle}`,
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              )
              .then((res) => {
                const data = res.data
                console.log("received this response from dynamodb: ", data)
                let lengthOfSocialObject = Object.keys(data[0].socials).length
                if (data[0].titles.S && data[0].links.S) {
                  setReceivedLinksArray(convertToArray(data[0].links.S))
                  setReceivedTitlesArray(convertToArray(data[0].titles.S))
                }

                //socials edit start

                let socialObj
                if (data[0].socials) {
                  let lengthOfSocialObject = Object.keys(
                    data[0].socials
                  ).length
                  if (lengthOfSocialObject > 0) {
                    const socials = data[0]?.socials
                    socialObj = {
                      facebook: socials?.facebook.S,
                      twitter: socials?.twitter.S,
                      instagram: socials?.instagram.S,
                      youtube: socials?.youtube.S,
                      linkedin: socials?.linkedin.S,
                      github: socials?.github.S,
                    }
                    setSocials(socialObj)
                  }
                }

                //socials edit end

                updateUser({
                  ...data,
                  socials: socials,
                  titles: data[0].titles ? data[0].titles.S : "",
                  links: data[0].links ? data[0].links.S : "",
                })

                setLoading(false)
              })
              .catch((err) => {
                console.log(err)
                setLoading(false)
              })
          } else {
            router.push("/login")
            setLoading(false)
          }
        })
        .catch((err) => {
          router.push("/login")
          setLoading(false)
        })
    } else {
      router.push("/login")
      setLoading(false)
    }
  }, [])

  // don't modify the below function all the below function are of no use currently, I will later remove them or make them functional

  function saveLinks(e) {
    e.preventDefault()

    getSession()
      .then((cognitoUserSession) => {
        const linksArray = Object.values(links)
        console.log("the links array", linksArray)

        function convertToJsonString(data) {
          // Convert the array to a JSON string with removed double quotes
          const jsonString = JSON.stringify(data)
            .replace(/\"([^(\")"]+)\":/g, "$1:")
            .replace(/"/g, "")

          return jsonString
        }

        const payload = {
          name: user?.name,
          bio: user?.bio ? user.bio : "",
          image: user?.image ? user.image : "",
          handle: user?.handle,
          userId: user?.userId ? user.userId : "",
          email: user?.email,
          socials: user?.socials ? user.socials : {},
          links: convertToJsonString(linksArray),
        }

        console.log(payload, "in links.js")

        updateUser({ ...payload, links: linksArray })
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


  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
      <h1 className="font-semibold text-2xl"> Dude Hang On, let Me load</h1>
      </div>
    )
  }

  return (
    <>
    {
      console.log("the current user is", user)
    }
      {isModalOpen && user && (
        <AddLinkModal
          isOpen={isModalOpen}
          onClose={closeModal}
          currentUser={user}
          serverLinks={receivedLinksArray}
          serverTitles={receivedTitlesArray}
        />
      )}
      {console.log("the links converted is ", receivedLinksArray)}
      <button
        className="float-right px-2 py-2 bg-gray-200 cursor-pointer"
        onClick={openModal}
      >
        Add Link
      </button>
      <div>
        <UserHeader handle={handle} />
        <main className="mt-4">
          <section>
            <h1 className="text-xl font-bold text-center text-gray-800">
              Customize links 🔗
            </h1>
            <div>
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
          </section>
        </main>
      </div>
    </>
  )
}

export default links
