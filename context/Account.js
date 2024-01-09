import React, { createContext, useState } from "react"
import axios from "axios"
import Pool from "../auth/UserPool"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
} from "amazon-cognito-identity-js"

export const AccountContext = createContext()

export const Account = (props) => {
  const [user, setUser] = useState(null)
  const router = useRouter()

  const updateUser = (newUser) => {
    setUser(newUser)
  }

  const getAuthenticatedUser = () => {
    const user = Pool.getCurrentUser()
    return user
  }

  const isAuthenticated = async () => {
    const user = getAuthenticatedUser()

    if (!user) {
      return false
    }

    try {
      const session = await getSession()
      return session.isValid()
    } catch (error) {
      console.error("Error checking authentication:", error)
      return false
    }
  }

  const getSession = async () => {
    return await new Promise((resolve, reject) => {
      const user = Pool.getCurrentUser()
      if (user) {
        user.getSession((err, session) => {
          if (err) {
            reject(err)
            return
          }
          if (session.isValid()) {
            resolve(session)
            return session
          }

          reject(err)
          return
        })
      } else {
        reject()
      }
    })
  }

  const getJwtToken = async () => {
    try {
      const session = await getSession()
      const jwtToken = session.getAccessToken().getJwtToken()
      return jwtToken
    } catch (error) {
      console.error("Error getting JWT token:", error)
      throw error
    }
  }

  const changePassword = async (oldPassword, newPassword) => {
    const user = getAuthenticatedUser()

    if (!user) {
      console.error("User not authenticated.")
      return false
    }

    try {
      await new Promise((resolve, reject) => {
        user.getSession(async (err, session) => {
          if (err) {
            reject(err)
            return
          }

          // Change password using the current session
          user.changePassword(oldPassword, newPassword, (err, result) => {
            if (err) {
              console.error("Error changing password:", err)
              reject(err)
              return
            }

            console.log("Password changed successfully:", result)
            resolve(result)
          })
        })
      })

      return true
    } catch (error) {
      console.error("Error changing password:", error)
      return false
    }
  }

  const resendConfirmationCode = async (username) => {
    const userData = {
      Username: username,
      Pool,
    }
    const cognitoUser = new CognitoUser(userData)

    try {
      await new Promise((resolve, reject) => {
        cognitoUser.resendConfirmationCode((err, result) => {
          if (err) {
            console.error("Error resending confirmation code:", err)

            reject(err)
            return
          }

          console.log("Confirmation code resent successfully:", result)
          resolve(result)
        })
      })

      return true
    } catch (error) {
      console.error("Error resending confirmation code:", error)
      return false
    }
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
        onFailure: (err) => {
          console.error("onFailure:", err)
          reject(err)
        },
        newPasswordRequired: (result) => {
          console.log("newPasswordRequired:", result)
          resolve(result)
        },
      })
    })
  }

  const deleteUser = async () => {
    const currentUser = getAuthenticatedUser()

    if (!currentUser) {
      console.error("User not authenticated.")
      return false
    }

    try {
      await new Promise((resolve, reject) => {
        currentUser.getSession(async (err, session) => {
          if (err) {
            reject(err)
            return
          }

          // Delete the user using the current session
          currentUser.deleteUser((err, result) => {
            if (err) {
              console.error("Error deleting user:", err)
              reject(err)
              return
            }

            console.log("User deleted successfully:", result)
            resolve(result)
          })
        })
      })

      // After successfully deleting the user, sign them out
      currentUser.signOut()
      router.push("/login")
      setUser(null)
      return true
    } catch (error) {
      console.error("Error deleting user:", error)
      return false
    }
  }

  const logout = () => {
    const user = Pool.getCurrentUser()
    if (user) {
      router.push("/login")
      user.signOut()
      setUser(null)
    }
  }

  return (
    <AccountContext.Provider
      value={{
        authenticate,
        getSession,
        getJwtToken,
        user,
        updateUser,
        logout,
        getAuthenticatedUser,
        isAuthenticated,
        changePassword,
        deleteUser,
        resendConfirmationCode,
      }}
    >
      {props.children}
    </AccountContext.Provider>
  )
}
