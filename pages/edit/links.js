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
import LinkTreeCard from "@/components/LinkTreeCard"
import LinkTreeCardDelete from "@/components/LinkTreeCardDelete"
import Link from "next/link"
import { IoMdArrowRoundForward } from "react-icons/io"

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
  const [receivedLinks, setReceivedLinks] = useState([])
  const [loading, setLoading] = useState(true)
  const [handle, setHandle] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [isModalOpen, setModalOpen] = useState(false)
  const [selectedLinks, setSelectedLinks] = useState([])
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

  function dbResponseToArray(links) {
    if (!links || links.length == 0) {
      return []
    }
    const normalizedArray = links.map((link) => {
      return {
        title: link.M.title.S,
        url: link.M.url.S,
      }
    })
    return normalizedArray
  }

  useEffect(() => {
    if (isAuthenticated()) {
      getSession()
        .then((cognitoUserSession) => {
          if (!cognitoUserSession.isValid()) {
            throw new Error("Session is Not Valid")
          }
          const handle = cognitoUserSession.idToken.payload["cognito:username"]
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
              let normalizedArray
              if (data[0].links.L) {
                normalizedArray = dbResponseToArray(data[0].links.L)
                setReceivedLinks(normalizedArray)
              }
              console.log(data[0].socials, "socials in links.js")

              let socialObj
              if (data[0].socials) {
                let lengthOfSocialObject = Object.keys(data[0].socials).length
                console.log(lengthOfSocialObject)
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
                ...data[0],
                socials: socialObj,
                links: normalizedArray,
              })

              setLoading(false)
            })
        })
        .catch((err) => {
          router.push("/login")
          setLoading(false)
        })
    } else {
      router.push("/login")
      setLoading(false)
    }
  }, [handle])

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <h1 className="text-2xl font-semibold"> Dude Hang On, let Me load</h1>
      </div>
    )
  }

  function handleRemoveLinks(index) {
    // Check if the link is already in the selectedLinks array
    const isSelected = selectedLinks.includes(index)

    // If it's not selected, add it to the selectedLinks array
    if (!isSelected) {
      setSelectedLinks((prev) => [...prev, index])
    } else {
      // If it's already selected, remove it from the selectedLinks array
      setSelectedLinks((prev) => prev.filter((i) => i !== index))
    }
  }

  function handleDeleteSelectedLinks(e) {
    e.preventDefault()
    if (selectedLinks.length == 0) {
      toast.error("No Links Selected to Delete! ")
      return
    }
    const newLinksArray = receivedLinks.filter((el, index) => {
      if (!selectedLinks.includes(index)) {
        return receivedLinks[index]
      }
      setReceivedLinks(newLinksArray)
    })
    console.log(newLinksArray)

    getSession()
      .then((cognitoUserSession) => {
        const payload = {
          name: user.name,
          bio: user.bio ? user.bio : "",
          image: user.image ? user.image : "",
          handle: user.handle ? user.handle : "",
          userId: user.userId ? user.userId : "",
          email: user.email,
          links: newLinksArray,
          socials: socials,
        }
        console.log(" the payload is", payload)
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
            console.log("console statement from socials.js", data)
            updateUser(payload)
            if (data.status == "error") return toast.error(data.error)
            toast.success("Profile saved Successfully")
            router.reload()
          })
      })
      .catch((error) => {
        // Handle any errors that occurred during the getSession method
        console.error("Error:", error)
      })
  }

  return (
    <div className="max-w-5xl mx-auto">
      <UserHeader handle={handle} />
      {console.log("the current user is", user)}
      {isModalOpen && user && (
        <AddLinkModal
          isOpen={isModalOpen}
          onClose={closeModal}
          currentUser={user}
          serverLinks={receivedLinks}
          serverSocialsLinks={user.socials}
        />
      )}
      <div>
        <button
          className="float-right px-2 py-2 mr-5 bg-gray-200 cursor-pointer"
          onClick={openModal}
        >
          Add New Link
        </button>
        {receivedLinks && (
          <div className="w-4/5 px-5 mt-10 md:px-0 ">
            <h1 className="text-2xl font-poppins">
              {" "}
              Select Box to Delete Links
            </h1>
            {receivedLinks.map((linkObj, index) => (
              <div
                key={index}
                className="flex items-center justify-between w-full mt-5"
              >
                <div className="col-span-2 w-[80%]">
                  <Link href={linkObj.url} target="_black">
                    <div className="relative  flex items-center justify-center p-2  bg-white/5 transition-all ease-linear rounded-[10px] border border-[#f9f6f6] border-solid  backdrop-filter backdrop-blur-[400px]  hover:border-white hover:-translate-y-1 group bg-white shadow-md  text-black">
                      <div
                        className="absolute p-1 bg-black rounded-full hover:bg-gray-700 w-11 left-2"
                        alt=""
                      />
                      <div
                        className="absolute transition-all duration-200 ease-linear right-5 group-hover:-rotate-45"
                        alt=""
                      >
                        <IoMdArrowRoundForward />
                      </div>

                      <h4 className="mx-auto">{linkObj.title}</h4>
                    </div>
                  </Link>
                </div>
                <div
                  className="flex items-center justify-center w-5 h-5 mx-auto transition-all duration-300 ease-linear border-2 border-black rounded-full fill-none hover:scale-105 group"
                  onClick={() => handleRemoveLinks(index)}
                >
                  <div
                    className={`w-3 h-3 rounded-full hover:scale-105  transition-all duration-300 ease-linear ${
                      selectedLinks.includes(index)
                        ? "bg-red-500"
                        : "bg-white/5"
                    }`}
                  ></div>
                </div>
              </div>
            ))}
            <div className="flex justify-center w-full mx-auto mt-10">
              <button
                className={`bg-red-500 px-2 py-2 cursor-pointer mx-auto border-2 text-white`}
                onClick={handleDeleteSelectedLinks}
              >
                Delete {selectedLinks.length > 0 ? selectedLinks.length : ""}{" "}
                Selected Links
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default links
