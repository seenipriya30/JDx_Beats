import { useContext } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { AuthContextAPI } from "../../context/AuthContext"
import { signOut } from "firebase/auth";
import { __AUTH } from "../../backend/firebase";
import toast from "react-hot-toast";

let Menu = () => {

  let { authUser , setAuthuser} = useContext(AuthContextAPI);

  let navigate= useNavigate();

  let handleLogout= async()=>{

    try {
      await signOut(__AUTH)
      setAuthuser(null)
      window.localStorage.clear()
      toast.success("Logged Out Succesfully")
      navigate("/")


    } catch (error) {
      toast.error(error.message)
    }    
  }

  return <aside>
    <ul className="flex items-center gap-2 sm:gap-4">
        <li><NavLink to={"/"} className={({isActive})=>`${isActive ? "bg-primary/20 text-primary border-primary/50" : "text-slate-300 hover:bg-white/5 border-transparent"} border transition-all duration-300 px-4 py-2 rounded-lg font-medium tracking-wide`}>Home</NavLink></li>

        {authUser == null ? <>

          <li><NavLink to={"register"} className={({isActive})=>`${isActive ? "bg-primary/20 text-primary border-primary/50" : "text-slate-300 hover:bg-white/5 border-transparent"} border transition-all duration-300 px-4 py-2 rounded-lg font-medium tracking-wide`}>Register</NavLink></li>

<li><NavLink to={"login"} className={({isActive})=>`${isActive ? "shadow-[0_0_15px_rgba(139,92,246,0.3)] scale-[0.98]" : "hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:-translate-y-0.5"} bg-gradient-to-r from-primary to-primary-dark text-white border-none transition-all duration-300 px-5 py-2 rounded-lg font-medium tracking-wide`}>Login</NavLink></li>
        </>:<>

        <li><NavLink to={"/admin/create-album"} className={({isActive})=>`${isActive ? "bg-secondary/20 text-secondary border-secondary/50" : "text-slate-300 hover:bg-white/5 border-transparent"} border transition-all duration-300 px-4 py-2 rounded-lg font-medium tracking-wide flex items-center gap-2`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>Upload Music</NavLink></li>

        <li><button onClick={handleLogout} className="text-slate-300 hover:text-red-400 hover:bg-red-400/10 transition-all duration-300 px-4 py-2 rounded-lg font-medium cursor-pointer">Logout</button></li>

<li><NavLink to={"/user-profile"} className="block rounded-full p-0.5 bg-gradient-to-br from-primary to-secondary hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all duration-300">

  <picture className="block bg-slate-900 rounded-full p-[2px]">

  <img src={authUser?.photoURL || "https://ui-avatars.com/api/?name=User&background=random"} alt="Profile" className="h-[35px] w-[35px] rounded-full object-cover" />

  </picture></NavLink></li>
        
        </>}

       
    </ul>
  </aside>
}

export default Menu