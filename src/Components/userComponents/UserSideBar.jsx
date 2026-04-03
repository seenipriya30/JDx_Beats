import React from 'react'
import { NavLink } from 'react-router-dom'
import { MdAccountBalanceWallet } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoPersonAddOutline } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";
import { RiDeleteBin6Line } from "react-icons/ri";

const UserSideBar = () => {
  return (
    <section className='py-6 px-4 h-full'>
        <nav>
            <ul className='flex flex-col gap-2'>
                <li>
                  <NavLink end to={"/user-profile"} className={({isActive})=>`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${isActive ? "bg-primary/20 text-primary shadow-[inset_0_0_20px_rgba(139,92,246,0.1)] border border-primary/30" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}>
                    <span className="text-xl"><MdAccountBalanceWallet /></span><span>My Account</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"update-profile"} className={({isActive})=>`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${isActive ? "bg-primary/20 text-primary shadow-[inset_0_0_20px_rgba(139,92,246,0.1)] border border-primary/30" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}>
                    <span className="text-xl"><CgProfile /></span><span>Edit Profile</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"update-password"} className={({isActive})=>`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${isActive ? "bg-primary/20 text-primary shadow-[inset_0_0_20px_rgba(139,92,246,0.1)] border border-primary/30" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}>
                    <span className="text-xl"><RiLockPasswordLine /></span><span>Update Password</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"delete-account"} className={({isActive})=>`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${isActive ? "bg-red-500/20 text-red-500 shadow-[inset_0_0_20px_rgba(239,68,68,0.1)] border border-red-500/30" : "text-slate-400 hover:bg-white/5 hover:text-red-400"}`}>
                    <span className="text-xl"><RiDeleteBin6Line /></span><span>Delete Account</span>
                  </NavLink>
                </li>
            </ul>
        </nav>
    </section>
  )
}

export default UserSideBar