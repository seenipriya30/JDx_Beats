import React, { useContext } from 'react'
import { AuthContextAPI } from '../../context/AuthContext'
import { NavLink } from 'react-router-dom'
import { UserContextAPI } from '../../context/UserContext'
import { FaUserEdit } from "react-icons/fa";

const MyAccount = () => {

let{authUser}=useContext(AuthContextAPI);
let {userDataFromDB}= useContext(UserContextAPI);

  return (
    <section className='h-full w-full flex justify-center items-center'>
        <article className='w-[80%] lg:w-[60%] min-h-[450px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl relative mt-12 pb-6'>

        <header className='h-[160px] w-full bg-gradient-to-br from-white/10 to-transparent rounded-t-2xl relative border-b border-white/5'>
          <picture className='absolute -bottom-16 left-1/2 -translate-x-1/2 rounded-full p-2 bg-slate-900/50 backdrop-blur-md shadow-[0_0_30px_rgba(139,92,246,0.3)]'>
            <img src={authUser?.photoURL || "https://i.ibb.co/0j5wgtMv/person.png"} alt='Avatar' className='h-[120px] w-[120px] rounded-full border-4 border-primary/40 object-cover'/>
          </picture>
        </header>

        <main className='mt-20 px-8'>
          <div className='flex flex-col items-center gap-1 mb-8'>
            <h1 className='text-2xl font-bold tracking-wide text-white'>{authUser?.displayName || "User"}</h1>
            <h2 className='text-sm text-slate-400'>{authUser?.email}</h2>
          </div>

        {userDataFromDB == null ? (
          <div className='w-full flex flex-col items-center gap-4 mt-8'>
            <p className='text-slate-400'>You haven't completed your profile yet.</p>
            <NavLink to={"/user-profile/add-profile"}>
              <button className='bg-gradient-to-r from-primary to-primary-dark hover:-translate-y-1 transition-transform shadow-lg shadow-primary/30 py-2 px-10 rounded-xl text-white font-semibold active:scale-95'>
                Add Profile Details
              </button>
            </NavLink>
          </div>
        ) : (
          <section className='w-full'>
            <header className='flex items-center justify-between mb-6 pb-2 border-b border-white/10'>
              <h2 className='text-xl font-semibold text-white'>Personal Details</h2>
              <NavLink to={"/user-profile/update-profile"} state={userDataFromDB} className="text-secondary hover:text-white transition-colors hover:scale-110 active:scale-95">
                <span className='text-2xl'><FaUserEdit /></span>
              </NavLink>
            </header>

            <article className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='flex flex-col bg-white/5 border border-white/10 py-3 px-4 rounded-xl hover:bg-white/10 transition-colors'>
                <span className='text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1'>Date of Birth</span>
                <span className='text-base text-white font-medium'>{userDataFromDB?.dob || "N/A"}</span>
              </div>

              <div className='flex flex-col bg-white/5 border border-white/10 py-3 px-4 rounded-xl hover:bg-white/10 transition-colors'>
                <span className='text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1'>Contact</span>
                <span className='text-base text-white font-medium'>{userDataFromDB?.contact || "N/A"}</span>
              </div>

              <div className='flex flex-col bg-white/5 border border-white/10 py-3 px-4 rounded-xl hover:bg-white/10 transition-colors'>
                <span className='text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1'>Gender</span>
                <span className='text-base text-white font-medium'>{userDataFromDB?.gender || "N/A"}</span>
              </div>

              <div className='flex flex-col bg-white/5 border border-white/10 py-3 px-4 rounded-xl hover:bg-white/10 transition-colors'>
                <span className='text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1'>Languages</span>
                <span className='text-base text-white font-medium'>{userDataFromDB?.languages || "N/A"}</span>
              </div>

              <div className='flex flex-col md:col-span-2 bg-white/5 border border-white/10 py-3 px-4 rounded-xl hover:bg-white/10 transition-colors'>
                <span className='text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1'>Address</span>
                <span className='text-base text-white font-medium'>{userDataFromDB?.address || "N/A"}</span>
              </div>
            </article>
          </section>
        )}
        </main>
        </article>
    </section>
  )
}

export default MyAccount