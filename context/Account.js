import React, { createContext } from "react"
import Pool from "../auth/UserPool"
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
} from "amazon-cognito-identity-js"

export const AccountContext = createContext()

export const Account = (props) => {
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
  return (
    <AccountContext.Provider value={{ authenticate, getSession }}>
      {props.children}
    </AccountContext.Provider>
  )
}


