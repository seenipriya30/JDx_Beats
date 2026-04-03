import { NavLink, useNavigate } from "react-router-dom"
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useState } from "react";
import { sendPasswordResetEmail} from "firebase/auth";
import { __AUTH } from "../../backend/firebase";
import toast from "react-hot-toast";
import Spinner from "../../utilities/Spinner";

let ResetPassword = () => {

  let [isloading, setIsloading]= useState(false);
  let navigate = useNavigate();

  let [email,setEmail] = useState("")

  let handleInputChange =(e)=>{
    setEmail(e.target.value)
  }

  let handleSubmit= async(e)=>{
    e.preventDefault();

    try {
        setIsloading(true);

       await sendPasswordResetEmail(__AUTH , email);

       toast.success(`Reset Link Has Been Sent To ${email}`)
       setEmail("");

       setIsloading(false);

       navigate("/login")

    } catch (error) {
        console.log(error.message);
        
        
    }
    
  }

  return <section className="h-[calc(100vh-70px)] w-[100%] flex justify-center items-center ">
    <article className=" w-[27%] bg-slate-700 py-4 px-6 rounded-md">
      <header><h1 className="text-center text-[24px] font-semibold">Reset Password</h1></header>
      <main>
        <form onSubmit={handleSubmit} action="" className="flex flex-col gap-2">

          <div>
            <label htmlFor="email" 
            className="block py-1">Email</label>
            <input type="email" name="email" value={email} placeholder="Enter your Email"
             onChange={handleInputChange} 
             className="outline-none border-1 w-[100%] rounded-md pl-2 py-1"  required/>
          </div>


          <div className="mt-3">
            <button className="bg-blue-600 w-[100%] py-2 
            rounded-md cursor-pointer hover:bg-blue-800">
              Reset Password
            </button>
          </div>

          <div className="mt-3">
            <NavLink to={"/login"}>
            <button className="bg-red-600 w-[100%] py-2 
            rounded-md cursor-pointer hover:bg-red-800">
              Cancel
            </button>
            </NavLink>
          </div>
        </form>
      </main>
    </article>
    {isloading && <Spinner/>}
    </section>
}

export default ResetPassword