import { NavLink, useNavigate } from "react-router-dom"
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { __AUTH } from "../../backend/firebase";
import toast from "react-hot-toast";
import Spinner from "../../utilities/Spinner";

let Register = () => {

  let [isloading, setisloading]= useState(false);
  let navigate = useNavigate();

  let[passwordEye, setPasswordEye]= useState(false);
  let[confirmPasswordEye, setconfirmPasswordEye]= useState(false);

  let initalUserData= {
    username:"",
    email:"",
    password:"",
    confirmPassword:""
  }
  let [userData, setUserData]=useState(initalUserData);

  let {username, email, password, confirmPassword}= userData;

  let handleInputChange=(e)=>{
    let {name , value}=e.target;
    // console.log(name , value);
    setUserData({
      ...userData , [name]:value
    })

  }

  let handleSubmit= async (e)=>{
    e.preventDefault();
    console.log(userData);

    //? npm install react-hot-toast

    if(password==confirmPassword){
      setisloading(true);

      try {
        let registerData = await createUserWithEmailAndPassword(__AUTH, email, password)
        toast.success("User Registered Successfully")

        await sendEmailVerification(registerData.user)
        toast.success(`Email Verification Link has Been Sent to ${email}`)

        updateProfile(registerData.user ,{
          displayName:username,
          photoURL:"https://i.ibb.co/fdjdkDLz/user-white.png"
        })

        navigate("/login")

        setUserData(initalUserData)

        console.log(registerData);
        
      } catch (error) {
        toast.error(error.message)        
      }finally{
        setisloading(false);
      }
  }else{
    toast.error("Password Is MisMatched")
  }

    
    
  }


  return <section className="min-h-[calc(100vh-70px)] w-full flex justify-center items-center py-10 px-4">
    <article className="w-full max-w-md bg-slate-800/40 backdrop-blur-xl border border-white/10 shadow-2xl py-8 px-8 sm:px-10 rounded-2xl relative overflow-hidden">
      {/* Decorative blurs */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>

      <header className="mb-8 relative z-10">
        <h1 className="text-center text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Create Account</h1>
        <p className="text-center text-slate-400 mt-2 text-sm">Join JDX Beats and discover new music</p>
      </header>
      
      <main className="relative z-10">
        <form onSubmit={handleSubmit} action="" className="flex flex-col gap-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Name</label>
            <input type="text" name="username" value={username} placeholder="Enter your Name" onChange={handleInputChange} 
             className="w-full bg-slate-900/50 border border-white/10 text-white rounded-xl pl-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300" required/>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Email</label>
            <input type="email" name="email" value={email} placeholder="Enter your Email" onChange={handleInputChange} 
             className="w-full bg-slate-900/50 border border-white/10 text-white rounded-xl pl-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300" required/>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Password</label>
            <div className="relative">
              <input type={passwordEye?"text":"password"} name="password" value={password} placeholder="Enter your password" onChange={handleInputChange}
                className="w-full bg-slate-900/50 border border-white/10 text-white rounded-xl pl-4 pr-12 py-3 outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300" required/>
              <button type="button" onClick={()=>setPasswordEye(!passwordEye)} className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-slate-400 hover:text-white transition-colors cursor-pointer">
                  {passwordEye ? <IoMdEye /> : <IoMdEyeOff/>}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Confirm Password</label>
            <div className="relative">
              <input type={confirmPasswordEye?"text":"password"} name="confirmPassword" value={confirmPassword} placeholder="Confirm your password" onChange={handleInputChange} 
               className="w-full bg-slate-900/50 border border-white/10 text-white rounded-xl pl-4 pr-12 py-3 outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300" required/>
              <button type="button" onClick={()=>setconfirmPasswordEye(!confirmPasswordEye)} className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-slate-400 hover:text-white transition-colors cursor-pointer">
                  {confirmPasswordEye ? <IoMdEye /> : <IoMdEyeOff/>}
              </button>
            </div>
          </div>

          <div className="mt-4">
            <button className="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary hover:to-primary text-white font-semibold py-3.5 rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] active:scale-[0.98] cursor-pointer">
              Register
            </button>
          </div>
          
          <div className="mt-2 text-center text-sm text-slate-400">
            Already have an account? <NavLink to={"/login"} className="text-primary hover:text-secondary font-semibold transition-colors ml-1">Login</NavLink>
          </div>
        </form>
      </main>
    </article>
    {isloading && <Spinner/>}
  </section>
}

export default Register