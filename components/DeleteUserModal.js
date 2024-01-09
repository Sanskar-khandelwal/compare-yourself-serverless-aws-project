import React from "react"
import UserHeader from "@/components/UserHeader"
import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { useRouter } from "next/router"
import { AccountContext } from "@/context/Account"
import { RxCross2 } from "react-icons/rx"

const DeleteUserModal = ({ isOpen, onClose, name, handle }) => {
  const {
    getSession,
    logout,
    user,
    updateUser,
    getAuthenticatedUser,
    isAuthenticated,
  } = useContext(AccountContext)

  const { deleteUser } = useContext(AccountContext)
  const [confirm, setConfirm] = useState("")
  console.log(handle, "handle in delte modal")

  function handleDeleteUser(e) {
    e.preventDefault()
    if (confirm != "confirm") {
      toast.error("Enter 'confirm' to delete")
      return
    }
    e.preventDefault()
    getSession()
      .then((cognitoUserSession) => {
        const payload = {
          handle: handle,
        }
        axios
          .delete(
            "https://lm9vl60dre.execute-api.eu-north-1.amazonaws.com/dev/compare-yourself",
            payload
          )
          .then((res) => {
            const data = res
            console.log("console statement from profile.js", data)
            if (data.status == "error") return toast.error(data.error)

            toast.success("Profile Deleted Successfully")
            logout()
          })
      })
      .catch((error) => {
        // Handle any errors that occurred during the getSession method
        console.error("Error:", error)
      })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center h-screen overflow-x-hidden overflow-y-auto border outline-none backdrop-blur-lg focus:outline-none bg-black/20">
      <form onSubmit={handleDeleteUser} className="border  bg-white w-[40%]">
        <div className="w-full px-10 ">
          <div className="flex justify-between w-full py-5">
            <div className="text-xl font-poppins"> Add</div>
            <span className="text-xl cursor-pointer " onClick={onClose}>
              {" "}
              <RxCross2 />
            </span>
          </div>
          <span className="w-full border border-gray-100"></span>
          <p>Dear {name}, Your Presence is invalueable to us ❤️</p>
          <label>
            <p className="mt-3">
              Enter <strong>confirm</strong> and press{" "}
              <i> 'confirm my deletion'</i> button to delete your account
            </p>
            <input
              className="w-full px-2 py-2 text-xl text-gray-600 rounded-md shadow outline font-poppins mt-7"
              type="text"
              name="confirm"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </label>
        </div>
        <input
          className="block w-full px-4 py-2 mx-auto mt-10 text-white bg-red-600 hover:bg-red-700 "
          type="submit"
          value={"Confirm My Deletion"}
        />{" "}
      </form>
    </div>
  )
}

export default DeleteUserModal
