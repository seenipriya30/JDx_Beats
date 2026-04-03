import React from 'react'
import NavbarContainer from '../NavbarComponents/NavbarContainer'
import { Outlet } from 'react-router-dom'
import UserSideBar from './UserSideBar'

const UserMainContainer = () => {
  return (
    <section className='bg-gradient-to-br from-slate-900 via-[#0f172a] to-slate-950 min-h-screen w-full'>
        <header className='sticky top-0 shadow-2xl z-50 backdrop-blur-md bg-transparent'>
            <NavbarContainer/>
        </header>
        <main className='flex relative'>
            <aside className='h-[calc(100vh-71px)] w-[20%] lg:w-[16%] sticky top-[71px] bg-white/5 backdrop-blur-lg border-r border-white/10 shadow-2xl'>
                <UserSideBar />
            </aside>
            <aside className='w-[80%] lg:w-[84%] min-h-[calc(100vh-71px)] p-6'>
                <Outlet></Outlet>
            </aside>
        </main>
    </section>
  )
}

export default UserMainContainer