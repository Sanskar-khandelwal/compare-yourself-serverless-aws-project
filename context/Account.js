import React, { createContext, useState } from "react"
import axios from "axios"
import Pool from "../auth/UserPool"
import { useRouter } from "next/router"
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
} from "amazon-cognito-identity-js"

export const AccountContext = createContext()

export const Account = (props) => {
  const [user, setUser] = useState(null);
  const router = useRouter()

  const updateUser = (newUser) => {
    setUser(newUser);
  };
  const getSession = async()=> {
    return await new Promise((resolve, reject) => {
      const user = Pool.getCurrentUser();
      if(user){
        user.getSession((err, session)=> {
          if(err){
            reject(err)
            return;
          }

          resolve(session)
          return session;
        })
      }else{
        reject()
      }
    })
  }
  const getJwtToken = async () => {
    try {
      const session = await getSession();
      const jwtToken = session.getAccessToken().getJwtToken();
      return jwtToken;
    } catch (error) {
      console.error("Error getting JWT token:", error);
      throw error;
    }
  };
  const authenticate = async (Username, Password) => {
    console.log(Username, Password)
    return await new Promise((resolve, reject) => {
      const userData = {
        Username,
        Pool,
      }
      const cognitoUser = new CognitoUser(userData)
      const authData = {
        Username,
        Password,
      }
      const authDetails = new AuthenticationDetails(authData)

      cognitoUser.authenticateUser(authDetails, {
        onSuccess: (result) => {
          console.log("onSuccess:", result)
          resolve(result)
        },
        onFailure : (err) => {
          console.error("onFailure:", err)
          reject(err)
        },
        newPasswordRequired:(result) => {
          console.log("newPasswordRequired:", result)
          resolve(result)
        },
      })
    })
  }
  const logout = () => {
    const user = Pool.getCurrentUser();
    if (user) {
      user.signOut();
      router.push("/login")
      setUser(null);
    }
  };
  
  return (
    <AccountContext.Provider value={{ authenticate, getSession,getJwtToken, user, updateUser , logout}}>
      {props.children}
    </AccountContext.Provider>
  )
}


