import React, { useState, useContext } from "react"
import { AccountContext } from "@/context/Account"
import { toast } from "react-toastify"

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [reNewPassword, setReNewPassoword] = useState("")
  const { changePassword } = useContext(AccountContext)

  const handleChangePassword = async (e) => {
    e.preventDefault()
    console.log(oldPassword, newPassword)
    if (newPassword != reNewPassword) {
      toast.error("Password do not match")
      return
    }
    try {
      const success = await changePassword(oldPassword, newPassword)

      if (success) {
        toast.success("Password changed Successfully")
        console.log("Password changed successfully!")
      } else {
        toast.success("Failed to Change the Password")
        console.error("Failed to change password.")
      }
    } catch (error) {
      toast.error("Error in changing the Password")
      console.error("Error changing password:", error)
    }
  }

  return (
    <div className="max-w-5xl mx-auto">
      <form
        className="flex flex-col w-11/12 gap-4 mx-auto"
        onSubmit={handleChangePassword}
      >
        <p className="text-3xl font-poppins">Change Current Password</p>
        <label htmlFor="old_password">
          <input
            className="w-full px-3 py-2 border outline-gray-300 focus:outline-gray-200"
            type="password"
            placeholder="Enter Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </label>
        <label htmlFor="new_password">
          <input
            className="w-full px-3 py-2 border outline-gray-300 focus:outline-gray-200"
            type="password"
            placeholder="Enter New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </label>
        <label htmlFor="new_password">
          <input
            className="w-full px-3 py-2 border outline-gray-300 focus:outline-gray-200"
            type="password"
            placeholder="Re-Enter New Password"
            value={reNewPassword}
            onChange={(e) => setReNewPassoword(e.target.value)}
            required
          />
        </label>

        <input
          type="submit"
          className="px-4 py-2 text-white bg-red-600 cursor-pointer hover:bg-red-700 font-poppins"
          value={"Change Password"}
        />
      </form>
    </div>
  )
}

export default ChangePassword
