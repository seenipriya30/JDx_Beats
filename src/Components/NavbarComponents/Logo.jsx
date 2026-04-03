import { NavLink } from "react-router-dom"

const Logo = () => {
  return <aside className="flex items-center gap-3 cursor-pointer">
    <NavLink to={"/"} className="flex items-center gap-3 group">
        <figure className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-md rounded-full group-hover:bg-primary/40 transition-all duration-300"></div>
            <img src="/logo.png" alt="JDX Beats Logo" className="h-[55px] w-[55px] relative z-10 drop-shadow-lg transition-transform duration-300 group-hover:scale-110 object-contain rounded-lg mix-blend-screen"/>
        </figure>
        <div className="flex flex-col">
          <h1 className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary hidden sm:block leading-none">
            JDX BEATS
          </h1>
          <span className="text-[10px] font-bold tracking-[0.3em] text-slate-500 uppercase hidden sm:block ml-1">Premium Audio</span>
        </div>
    </NavLink>
  </aside>
}

export default Logo