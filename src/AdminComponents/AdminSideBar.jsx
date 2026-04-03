import React from 'react'
import { NavLink } from 'react-router-dom'
import { RxDashboard } from "react-icons/rx";
import { BiSolidAlbum } from "react-icons/bi";
import { IoIosAlbums } from "react-icons/io";

const AdminSideBar = () => {
  return (
    <section className='p-7'>
        <article>
            <ul className='flex flex-col gap-4'>
                <li><NavLink end to={"/admin"} className={({isActive})=>`${isActive && "bg-blue-600"} flex items-center gap-2 px-2 py-1 rounded-md`}><span><RxDashboard /></span><span>DashBoard</span></NavLink></li>

                <li><NavLink to={"/admin/create-album"} className={({isActive})=>`${isActive && "bg-blue-600"} flex items-center gap-2 px-2 py-1 rounded-md`}><span><BiSolidAlbum /></span><span>Create Album</span></NavLink></li>

                <li><NavLink to={"/admin/all-albums"} className={({isActive})=>`${isActive && "bg-blue-600"} flex items-center gap-2 px-2 py-1 rounded-md`}><span><IoIosAlbums /></span><span>All Albums</span></NavLink></li>
            </ul>
        </article>
    </section>
  )
}

export default AdminSideBar