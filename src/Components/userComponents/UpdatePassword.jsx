import { NavLink, useNavigate } from "react-router-dom"
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { useContext, useState } from "react";
import { __AUTH } from "../../backend/firebase";
import { signOut, updatePassword } from "firebase/auth";
import toast from "react-hot-toast";
import Spinner from "../../utilities/Spinner";
import { AuthContextAPI } from "../../context/AuthContext";

let UpdatePassword=()=>{
  let {authUser, setAuthuser}=useContext(AuthContextAPI);
    let[isLoading,setisLoading]=useState(false);
    let navigate = useNavigate

   

    let initialState={
      newPassword:"",
      confirmNewPassword:""
    }
    let [passwordData, setpasswordData]=useState(initialState)
    let {newPassword,confirmNewPassword}=passwordData
    let handleInputChange =(e)=>{
       let {name,value}=e.target
       setpasswordData({
        ...passwordData,[name]:value
       })
    }
       let handleSubmit= async(e) =>{
        e.preventDefault();
        try {
            setisLoading(true)
console.log(passwordData);


            if(newPassword==confirmNewPassword){
              await updatePassword(authUser,newPassword)
              toast.success("password change successful")
              signOut(__AUTH)
              setAuthuser(null);
              navigate("/login")
            }else{
              toast.error("password mismatch")
            }
          // await  updatePassword(authUser,newPassword);
          // toast.success(Reset link has been sent to ${email});
          // setEmail("");
          // setisLoading(false);
          // navigate("/login")
        } catch (error) {
            toast.error(error.message)
            console.log(error);
            
        }finally{
          setisLoading(false);
        }
        
       }
    return <section className="h-[calc(100vh-70px)] w-[100%] flex justify-center items-center">
        <article className=" w-[27%] bg-slate-700 py-4 px-6 rounded-md">
            <header><h1 className="text-center text-[24px] font-semibold">Update Password</h1></header>
            <main>
                <form action="" onSubmit={handleSubmit} className="flex flex-col gap-2">
                    
                <div>
                        <label htmlFor="new Password" className="block py-1">New Password</label>
                        <input onChange={handleInputChange} type="text" required placeholder="Enter new passord" name="newPassword" value={newPassword} className="outline-none border-1 w-[100%] rounded-md pl-2 py-1" />
                    </div><div>
                        <label htmlFor=" confirm new Password" className="block py-1">Confirm New Password</label>
                        <input onChange={handleInputChange} type="text" required placeholder="Enter confirm new passord" name="confirm newPassword" value={newPassword} className="outline-none border-1 w-[100%] rounded-md pl-2 py-1" />
                    </div>
                    
                    <div className="mt-3">
                        <button className="bg-blue-600 w-[100%] py-2 rounded-md cursor-pointer hover:bg-blue-800">Submit</button>
                    </div>
                    
                    
                    
                </form>
            </main>
        </article>
        {isLoading &&  <Spinner></Spinner>}
       
    </section>
}
export default UpdatePassword