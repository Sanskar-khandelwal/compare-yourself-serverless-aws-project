import React, { useEffect, useState, useContext } from "react"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import LinkTree from "@/components/LinkTree"
import SocialTree from "@/components/SocialTree"
import ShareButton from "@/components/ShareButton"

import axios from "axios"
import Link from "next/link"
import { CognitoUserSession } from "amazon-cognito-identity-js"
import { AccountContext } from "@/context/Account"

// const handle = () => {
//   const router = useRouter()
//   const [data, setData] = useState({})
//   const [userFound, setUserFound] = useState(false)
//   const { getSession, user, updateUser } = useContext(AccountContext)
//   const handle = router.query.handle
//   console.log(handle)

//   const [socials, setSocials] = useState({
//     facebook: "",
//     twitter: "",
//     instagram: "",
//     youtube: "",
//     linkedin: "",
//     github: "",
//   })

//   useEffect(() => {
//     axios
//       .get(
//         `https://lm9vl60dre.execute-api.eu-north-1.amazonaws.com/dev/compare-yourself/${handle}`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       )
//       .then((res) => {
//         const response = res.data
//         console.log("received this response from dynamodb: ", response)
//         const socials = response[0].socials
//         const socialObj = {
//           facebook: socials.instagram.S,
//           twitter: socials.twitter.S,
//           instagram: socials.instagram.S,
//           youtube: socials.youtube.S,
//           linkedin: socials.linkedin.S,
//           github: socials.github.S,
//         }
//         console.log("This is the social obj", socialObj)
//         setSocials(socialObj)
//         setData(response[0])
//         setUserFound(true)
//         updateUser({
//           ...response[0],
//           socials: socialObj,
//         })
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//   }, [])

//   console.log("console statement from handle.js", user)
//   if (!userFound) {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen">
//         <div className="px-2 not-found ">
//           <h1 className="text-lg font-bold">User Not Found 😞</h1>

//           <p>
//             If you're looking for a page, double check the spelling and try
//             again.
//           </p>
//         </div>
//         Create your Own{" "}
//         <Link
//           className="px-3 ml-2 text-left text-white transition-all duration-500 bg-indigo-500 hover:bg-indigo-400"
//           href="apply"
//         >
//           LinkTree
//         </Link>
//       </div>
//     )
//   }
//   return (
//     <>
//       <div className="relative max-w-3xl mx-auto">
//         <ShareButton />
//         <LinkTree data={data} />
//         <SocialTree socials={socials} />
//       </div>
//     </>
//   )
// }

// export default handle


// ... (import statements remain unchanged)

const handle = () => {
  const router = useRouter()
  const [data, setData] = useState({})
  const [userFound, setUserFound] = useState(false)
  const [loading, setLoading] = useState(true) // New loading state
  const { getSession, user, updateUser } = useContext(AccountContext)
  const handle = router.query.handle
  console.log(handle)

  const [socials, setSocials] = useState({
    facebook: "",
    twitter: "",
    instagram: "",
    youtube: "",
    linkedin: "",
    github: "",
  })

  useEffect(() => {
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
        const response = res.data
        console.log("received this response from dynamodb: ", response)
        const socials = response[0].socials
        const socialObj = {
          facebook: socials?.instagram.S,
          twitter: socials?.twitter.S,
          instagram: socials?.instagram.S,
          youtube: socials?.youtube.S,
          linkedin: socials?.linkedin.S,
          github: socials?.github.S,
        }
        console.log("This is the social obj", socialObj)
        setSocials(socialObj)
        setData(response[0])
        setUserFound(true)
        updateUser({
          ...response[0],
          socials: socialObj,
        })
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false); // Set loading to false regardless of success or failure
      });
  }, [handle]); // Include handle in the dependency array to re-run the effect when handle changes

  console.log("console statement from handle.js", user)

  if (loading) {
    return <div> 
    <div
      class="inline-block h-8 w-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] text-primary opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
      role="status">
      <span
        class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        >Loading...</span>
    </div>
    <div
      class="inline-block h-8 w-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] text-secondary opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
      role="status">
      <span
        class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        >Loading...</span>
    </div>
    <div
      class="inline-block h-8 w-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] text-success opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
      role="status">
      <span
        class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        >Loading...</span>
    </div>
    <div
      class="inline-block h-8 w-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] text-danger opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
      role="status">
      <span
        class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        >Loading...</span>
    </div>
    <div
      class="inline-block h-8 w-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] text-warning opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
      role="status">
      <span
        class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        >Loading...</span>
    </div>
    <div
      class="inline-block h-8 w-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] text-info opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
      role="status">
      <span
        class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        >Loading...</span>
    </div>
    <div
      class="inline-block h-8 w-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] text-neutral-100 opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
      role="status">
      <span
        class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        >Loading...</span>
    </div></div>
  }

  if (!userFound) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="px-2 not-found ">
          <h1 className="text-lg font-bold">User Not Found 😞</h1>

          <p>
            If you're looking for a page, double-check the spelling and try
            again.
          </p>
        </div>
        Create your Own{" "}
        <Link
          className="px-3 ml-2 text-left text-white transition-all duration-500 bg-indigo-500 hover:bg-indigo-400"
          href="apply"
        >
          LinkTree
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="relative max-w-3xl mx-auto">
        <ShareButton />
        <LinkTree data={data} />
        <SocialTree socials={socials} />
      </div>
    </>
  );
};

export default handle;
