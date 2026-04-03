import { NavLink, useNavigate } from "react-router-dom"
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useState } from "react";
import { signInWithEmailAndPassword} from "firebase/auth";
import { __AUTH } from "../../backend/firebase";
import toast from "react-hot-toast";
import Spinner from "../../utilities/Spinner";

let Login = () => {

  let [isloading, setIsloading]= useState(false);


  let[passwordEye, setPasswordEye]= useState(false);
  let navigate =useNavigate();

  let initalUserData= {
    email:"",
    password:"",
  }
  let [userData, setUserData]=useState(initalUserData);

  let {email, password }= userData;

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


    try {
      setIsloading(true);

     let loginData = await signInWithEmailAndPassword(__AUTH, email, password);
     console.log(loginData);

     if(loginData?.user?.emailVerified){
      toast.success("Logged In Succesfully")
      navigate("/")
     }
     else{
      toast.error("Verify your Email!")
     }
     

      setIsloading(false);
    } catch (error) {
      toast.error(error.message)
      
    }finally{
      setIsloading(false);
    }
    
  }

  return <section className="min-h-[calc(100vh-70px)] w-full flex justify-center items-center py-10 px-4">
    <article className="w-full max-w-md bg-slate-800/40 backdrop-blur-xl border border-white/10 shadow-2xl py-8 px-8 sm:px-10 rounded-2xl relative overflow-hidden">
      {/* Decorative blurs */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl"></div>

      <header className="mb-8 relative z-10">
        <h1 className="text-center text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Welcome Back</h1>
        <p className="text-center text-slate-400 mt-2 text-sm">Login to your JDX Beats account</p>
      </header>
      
      <main className="relative z-10">
        <form onSubmit={handleSubmit} action="" className="flex flex-col gap-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Email</label>
            <input type="email" name="email" value={email} placeholder="Enter your email" onChange={handleInputChange} 
             className="w-full bg-slate-900/50 border border-white/10 text-white rounded-xl pl-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300" required/>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Password</label>
            <div className="relative">
              <input type={passwordEye?"text":"password"} name="password" value={password} placeholder="Enter your password" onChange={handleInputChange}
                className="w-full bg-slate-900/50 border border-white/10 text-white rounded-xl pl-4 pr-12 py-3 outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300" required/>
              <button type="button" onClick={()=>setPasswordEye(!passwordEye)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-slate-400 hover:text-white transition-colors cursor-pointer">
                  {passwordEye ? <IoMdEye /> : <IoMdEyeOff/>}
              </button>
            </div>
          </div>

          <div className="mt-2 text-right">
              <NavLink to={"/reset-password"} className="text-sm text-primary hover:text-secondary transition-colors font-medium">Forgot Password?</NavLink>
          </div>

          <div className="mt-2">
            <button className="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary hover:to-primary text-white font-semibold py-3.5 rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] active:scale-[0.98] cursor-pointer">
              Login
            </button>
          </div>
          
          <div className="mt-4 text-center text-sm text-slate-400">
            Don't have an account? <NavLink to={"/register"} className="text-primary hover:text-secondary font-semibold transition-colors ml-1">Register</NavLink>
          </div>
        </form>
      </main>
    </article>
    {isloading && <Spinner/>}
  </section>
}

export default Login