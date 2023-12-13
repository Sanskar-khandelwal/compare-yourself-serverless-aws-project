import React, { useState } from "react"
import Image from "next/image"
import styles from "../styles/apply.module.css"
import { toast } from "react-toastify"
import Link from "next/link"
import axios from "axios"
import {useRouter} from "next/router"
import {CognitoUserPool, CognitoUserAttribute} from "amazon-cognito-identity-js"

const Apply = () => {
  const router = useRouter()
  const [handle, setHandle] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [category, setCategory] = useState("")
  const [submitted, setSubmitted] = React.useState(false)
  const [error, setError] = useState('')
 const  [registeredUser, setRegisteredUser] = useState("")


  const POOL_DATA = {
    UserPoolId: "eu-north-1_H99nvkneh",
    ClientId: "7ndrke6s5ibtlks21d65u2mpdb"
  }
  
  const userPool = new CognitoUserPool(POOL_DATA)


  
  const handleCategoryChange = (e) => {
    setCategory(e.target.value)
  }

  const handleRegister = (e) => {
    ///
    const user  = {
      email: email,
      password: password,
      username: handle,
    }
    console.log(user)
    const attrList = []
    const emailAtribute = {
      Name: 'email',
      Value: email
    }
    attrList.push(new CognitoUserAttribute(emailAtribute))
    userPool.signUp(user.username, user.password, attrList, null, function(err, result){
      if(err){
        alert(err)
        return;
      }
      setRegisteredUser(result.user)
      
    })

    ///
    e.preventDefault()
    if (!category){
      toast.error("Please add a category")
    }

  }
  return (
    <>
    <section className="flex flex-row h-screen overflow-hidden ">
    <div className="flex items-center w-2/5 h-full px-10 main">  
          <div className="px-4 py-8 bg-white content">
            <h1 className="text-2xl font-bold text-left">
              Create your Personlised Hub, Sign Up today
            </h1>
            <p className="mt-2 text-left">Link Share Inspire</p>
            <form
              onSubmit={handleRegister}
              className="flex flex-col gap-3 mt-6 text-lg"
            >
              <span className="flex flex-row items-center bg-white border">
                <Image
                  src="/svg/userhandle.svg"
                  width={35}
                  height={30}
                  alt="instagram logo"
                  className="w-6 h-6 mx-2 text-white bg-white "
                ></Image>
                <input
                  className="w-full px-3 py-2 bg-gray-100 border rounded-md focus:outline-none"
                  type="text"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  placeholder="Social Handle"
                />
              </span>
              <input
                className="px-2 py-2 bg-gray-100 border rounded-md focus:outline-none"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Mail"
              />
              <input
                className="px-2 py-2 bg-gray-100 border rounded-md focus:outline-none"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Set a Password"
              />
            
    
              <h5 className="text-lg text-left text-indigo-500">
                Account Type:{" "}
              </h5>
              <div className="flex">
              <label className="inline">
                <input
                  type="checkbox"
                  checked={category === "Creator"}
                  onChange={handleCategoryChange}
                  value="Creator"
                  className="inline bg-gray-100 rounded-md "
                />
                <p className="inline ml-2">Creators</p>
              </label>
              <label className="inline ml-2">
                <input
                  type="checkbox"
                  checked={category === "Agency"}
                  onChange={handleCategoryChange}
                  value="Agency"
                  className="inline bg-gray-100 rounded-md"
                />
                <p className="inline ml-2">Agency</p>
              </label>
              </div>
             
              <input
                type="submit"
                value="Apply"
                className="py-2 text-white bg-indigo-600 rounded-md cursor-pointer"
              />
            </form>
            <h4 className="mt-4 text-black text-">
            Already have an account ?
            <Link className="font-bold text-indigo-500" href="/login">
              Login
            </Link>
            {error && <p className="font-mono text-red-700"> try different username or email </p>}
          </h4>
          </div>
        
          
        </div>

        <div className="flex-1 w-3/5 h-full ">
         <img src="/images/bulb.jpg " alt="" className="object-cover w-full h-full rounded-lg" />
        </div>

    </section>
     
      
    
    </>
  

  )
}

export default Apply
