import React, { useState } from "react"
import styles from "../styles/apply.module.css"
import { toast } from "react-toastify"
import Link from "next/link"
import axios from 'axios'
import {useRouter} from 'next/router'
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from "amazon-cognito-identity-js"

const Login = () => {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState('')

  const POOL_DATA = {
    UserPoolId: "eu-north-1_H99nvkneh",
    ClientId: "7ndrke6s5ibtlks21d65u2mpdb"
  }

  const userPool = new CognitoUserPool(POOL_DATA)


  const handleLogin = (e) => {
    e.preventDefault()
    const authData = {
      Username: email,  
      Password: password

    }
    const authDetails = new AuthenticationDetails(authData)
    const userData = {
      Username: email, 
      Pool: userPool
    }

     const cognitoUser = new CognitoUser(userData)
     cognitoUser.authenticateUser(authDetails, {
      onSuccess(result){
  console.log(result)

      }, 
      onFailure(err){
      console.log(err)    
      }
     })
  }
  return (
    <>
      <section
       className="flex flex-row h-screen overflow-hidden"
      >
        <div className="flex items-center w-2/5 h-full px-10 main">
          <div className="w-full px-4 bg-white content">
            <h1 className="text-2xl font-bold text-left">
              Enter Your Verse
            </h1>
            <p className="mt-2 text-left">Stay Connected, Stay Inspired</p>
            <form
              onSubmit={handleLogin}
              className="flex flex-col w-full gap-3 mt-6 text-lg"
            >
              <input
                className="w-full px-3 py-2 bg-gray-100 border rounded-md focus:outline-none"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Mail"
              />
              {error && <p> try different username </p>}
              <input
                className="w-full px-3 py-2 bg-gray-100 border rounded-md focus:outline-none"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Set a Password"
              />

              <input
                type="submit"
                value="Login"
                className="py-2 text-white bg-indigo-600 rounded-md cursor-pointer "
              />
            </form>
            <h4 className="pt-3 text-left text-black ">
            New here ?{" "}
            <Link className="font-bold text-indigo-500 " href="/apply">
              Apply Now
            </Link>
          </h4>
          </div>    
        </div>
        <div className="flex-1 w-3/5 h-full ">
         <img src="/images/bulb-light.jpg " alt="" className="object-cover w-full h-full rounded-lg" />
        </div>

      </section>
    </>
  )
}

export default Login
