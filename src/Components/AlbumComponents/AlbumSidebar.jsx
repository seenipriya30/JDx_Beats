import React from 'react'
import { NavLink } from 'react-router-dom'
import { RxDashboard } from "react-icons/rx";
import { FaHeart, FaFire, FaGuitar, FaLayerGroup } from "react-icons/fa";
import { RiPlayListFill } from "react-icons/ri";
import { motion } from 'framer-motion';

const AlbumSidebar = () => {
  return (
    <section className='p-4 lg:p-6'>
        <article>
            <ul className='flex flex-col gap-2'>
                <motion.li whileHover={{ x: 5 }} whileTap={{ scale: 0.98 }}>
                  <NavLink end to={"/"} className={({isActive})=>`${isActive ? "bg-primary/20 text-primary border-r-4 border-primary" : "text-slate-400 hover:bg-white/5 hover:text-slate-200 border-r-4 border-transparent"} transition-all duration-300 flex items-center gap-3 px-3 py-3 rounded-l-lg font-medium`}>
                    <span className="text-xl"><RxDashboard /></span>
                    <span>Home</span>
                  </NavLink>
                </motion.li>

                <motion.li whileHover={{ x: 5 }} whileTap={{ scale: 0.98 }}>
                  <NavLink to={"/favourites"} className={({isActive})=>`${isActive ? "bg-primary/20 text-primary border-r-4 border-primary" : "text-slate-400 hover:bg-white/5 hover:text-slate-200 border-r-4 border-transparent"} transition-all duration-300 flex items-center gap-3 px-3 py-3 rounded-l-lg font-medium`}>
                    <span className="text-xl"><FaHeart /></span>
                    <span>Favorites</span>
                  </NavLink>
                </motion.li>

                <div className="h-px bg-white/10 my-2 mx-2"></div>

                <motion.li whileHover={{ x: 5 }} whileTap={{ scale: 0.98 }}>
                  <NavLink to={"/trending"} className={({isActive})=>`${isActive ? "bg-primary/20 text-primary border-r-4 border-primary" : "text-slate-400 hover:bg-white/5 hover:text-slate-200 border-r-4 border-transparent"} transition-all duration-300 flex items-center gap-3 px-3 py-3 rounded-l-lg font-medium`}>
                    <span className="text-xl"><FaFire /></span>
                    <span>Trending</span>
                  </NavLink>
                </motion.li>

                <motion.li whileHover={{ x: 5 }} whileTap={{ scale: 0.98 }}>
                  <NavLink to={"/playlists"} className={({isActive})=>`${isActive ? "bg-primary/20 text-primary border-r-4 border-primary" : "text-slate-400 hover:bg-white/5 hover:text-slate-200 border-r-4 border-transparent"} transition-all duration-300 flex items-center gap-3 px-3 py-3 rounded-l-lg font-medium`}>
                    <span className="text-xl"><RiPlayListFill /></span>
                    <span>Playlists</span>
                  </NavLink>
                </motion.li>

                <motion.li whileHover={{ x: 5 }} whileTap={{ scale: 0.98 }}>
                  <NavLink to={"/artists"} className={({isActive})=>`${isActive ? "bg-primary/20 text-primary border-r-4 border-primary" : "text-slate-400 hover:bg-white/5 hover:text-slate-200 border-r-4 border-transparent"} transition-all duration-300 flex items-center gap-3 px-3 py-3 rounded-l-lg font-medium`}>
                    <span className="text-xl"><FaGuitar /></span>
                    <span>Artists</span>
                  </NavLink>
                </motion.li>
            </ul>
        </article>
    </section>
  )
}

export default AlbumSidebar