import React from 'react'
import UserHeader from "@/components/UserHeader"
import  { useState, useEffect , useContext} from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { useRouter } from 'next/router'
import { AccountContext } from '@/context/Account'
import Link from 'next/link'

const AddLinkModal = ({isOpen, onClose, currentUser,serverLinks,  serverTitles}) => {
  console.log("the current user is", currentUser)
  console.log("console speaking from dashborad", serverLinks, serverTitles)
  console.log(currentUser[0].name, "<- name saying hello")
  console.log(currentUser.name, currentUser.handle, currentUser.email)
  // console.log("this is the serverlinks", serverLinks)

  const router = useRouter()
  const {
    getSession,
    user,
    updateUser,
    getAuthenticatedUser,
    isAuthenticated,
  } = useContext(AccountContext)

  const [url, setUrl] = useState("")
  const [title, setTitle] = useState("")
  // const [receivedLinks, setReceivedLinks] = useState(null)
  const [handle, setHandle] = useState(null)

  
  // function convertToJsonString(data) {
  //   // Convert the array to a JSON string with removed double quotes
  //   const jsonString = JSON.stringify(data)
  //     .replace(/\"([^(\")"]+)\":/g, '$1:')
  //     .replace(/"/g, '');
  
  //   return jsonString;
  // }

  // function convertToObjects(input1, input2) {
  //   const parseInput = (input) => {
  //     const keyValuePairs = input
  //       .slice(1, -1) // Remove surrounding square brackets
  //       .split(',')
  //       .map((pair) => pair.split(':').map((item) => item.trim()));
  
  //     const object = {};
  //     keyValuePairs.forEach(([key, value]) => {
  //       object[key.slice(1, -1)] = value.slice(1, -1); // Remove surrounding quotes
  //     });
  
  //     return object;
  //   };
  
  //   const extractUrlTitle = (input) => {
  //     const obj = parseInput(input);
  //     return { url: obj.url, title: obj.title };
  //   };
  
  //   const array1 = input1.split('},{').map(extractUrlTitle);
  //   const array2 = input2.split('},{').map(extractUrlTitle);
  
  //   const combinedArray = array1.concat(array2);
  //   return combinedArray;
  // }


  // function convertToStringPayload(oldLinks, newLink){
  //   console.log("logging")
  //   console.log(oldLinks, newLink)
  //    if(oldLinks.length > 0){
  //     const first = oldLinks.slice(0, -1);
  //     const second = newLink.substring(1);
  //     const converted = first + ',' + second;
  //     return converted;
  //    }
  //     return newLink        
               
  // }

  function arrayToStringFormat(arr) {
    // Use JSON.stringify to convert the array to a JSON-formatted string
    // Replace double quotes with an empty string
    return "[" + JSON.stringify(arr).slice(1, -1).replace(/"/g, '') + "]";
  }

  function isValidURL(url) {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }
  function saveLinks(e) {
    e.preventDefault()
   if(!isValidURL(url)){
    return toast.error("Please Enter a Valid Url")
   } 
    
    serverTitles.push(title)
    serverLinks.push(url)

    console.log(arrayToStringFormat(serverLinks), arrayToStringFormat(serverTitles) )

    getSession()
      .then((cognitoUserSession) => {
       
          
        const payload = {
          name: currentUser[0].name,
          bio: currentUser[0]?.bio,
          image: currentUser[0]?.image,
          handle: currentUser[0].handle,
          userId: currentUser[0]?.userId,
          email: currentUser[0].email,
          socials: currentUser[0].name,
          links: arrayToStringFormat(serverLinks),
          titles: arrayToStringFormat(serverTitles)
        }
        console.log(cognitoUserSession.getIdToken().getJwtToken())

        console.log("the payload is:", payload)
      
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



  console.log(isOpen)
  
     
    const [link, setLink] = useState([{ url: "", title: "" }])
    const [payloadLinks, setPayloadLinks] = useState()
  



  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center w-full h-screen p-2 overflow-x-hidden overflow-y-auto border outline-none backdrop-blur-lg focus:outline-none'>
        

    <form onSubmit={saveLinks} className='relative border border-red-800 w-[400px]'>
    <div className='absolute cursor-pointer right-1' onClick={onClose}> x</div>
              
                  <div
                  
                    className="flex flex-col items-center w-full py-10 mx-auto bg-gray-200 rounded-xl "
                  >
                    <label>
                      <input
                        className="p-1 px-2 text-xl text-gray-600 align-baseline border-2 rounded-md shadow outline-none font"
                        type="text"
                        placeholder="Enter Title"
                        value={link.title}
                        onChange={(e) =>
                           setTitle(e.target.value)
                        }
                      />
                    </label>
                    <label>
                      <input
                        className="p-1 px-2 mt-5 text-xl text-gray-600 border-2 rounded-md shadow outline-none font"
                        type="text"
                        placeholder="Enter Url"
                        value={link.url}
                        onChange={(e) =>
                          setUrl(e.target.value)
                       }
                      />
                    </label>
                    <button
                  className="bg-[#19c37d] mt-5 text-white px-4 py-2 rounded-md block  mx-auto "
                  type="submit"
                >
                  {" "}
                  Save links
                </button>
                    
                  </div>
              
                </form>
  </div>
  )
}

export default AddLinkModal