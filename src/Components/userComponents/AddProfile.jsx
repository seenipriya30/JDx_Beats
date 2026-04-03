import React, { useContext, useEffect, useState } from 'react'
import { AuthContextAPI } from '../../context/AuthContext';
import Spinner from '../../utilities/Spinner';
import { doc, setDoc } from 'firebase/firestore';
import { __DB } from '../../backend/firebase';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';


const AddProfile = () => {
  let {authUser} = useContext(AuthContextAPI);

  let data = useLocation();


  let dataFromNavlink = data?.state;
  
  
  let [isLoading, setIsLoading]= useState(false);

  let {uid, email, displayName, photoURL}= authUser || {};

  let initialUserdata = {
    dob: dataFromNavlink?.dob ||"",
    contact: dataFromNavlink?.contact ||"",
    gender: dataFromNavlink?.gender ||"",
    address: dataFromNavlink?.address ||"",
    languages: dataFromNavlink?.languages ||"",
    role:"user"
  }

  let [userData, setUserData] = useState(initialUserdata);

  let {dob, contact,gender, address, languages}= userData;

  let handleInputChange=(e)=>{

    let {name, value}= e.target;

    setUserData({
      ...userData, [name]:value
    })
  }


  useEffect(()=>{
    console.log(authUser);
    
  },[])

  let handleSubmit=  async (e)=>{
    e.preventDefault();

    try {

      setIsLoading(true);

      if(authUser != null){

        let payLoad = {...userData, uid, email, photoURL, displayName};

        let user_data_collection= doc(__DB,"user_profile",uid);

        let storingDataAtDB= await setDoc(user_data_collection, payLoad);

        toast.success("Data Stored Successfully!")
        
        setUserData(initialUserdata);

      }
    } catch (error) {
      toast.error(error.message)
    }finally{
      setIsLoading(false);
    }

  }

  return (
    <section className='h-full w-full flex flex-col items-center justify-center py-10'>
      <article className='w-[90%] lg:w-[55%] bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl py-8 px-8'>
        <header className='mb-6 border-b border-white/10 pb-4'>
          <h1 className='text-3xl font-bold text-center text-white'>Profile Details</h1>
          <p className='text-slate-400 text-center mt-2 text-sm'>Add or override your personal information</p>
        </header>
      
      <main>
        <form action="" onSubmit={handleSubmit} className='flex flex-col gap-6'>

          {/* first row div */}
          <div className='w-full flex flex-col md:flex-row gap-6'>
            <aside className='flex flex-col gap-2 w-full md:w-[48%]'>
              <label htmlFor='dob' className='text-sm text-slate-400 font-medium'>Date Of Birth</label>
              <input type='date' name='dob' value={dob} onChange={handleInputChange} placeholder='Enter Your Dob' className='bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 focus:bg-white/10 transition-colors text-white cursor-text focus:shadow-[0_0_15px_rgba(139,92,246,0.1)]' />
            </aside>

            <aside className='flex flex-col gap-2 w-full md:w-[48%]'>
              <label htmlFor='contact' className='text-sm text-slate-400 font-medium'>Contact Number</label>
              <input type='text' name='contact' value={contact} onChange={handleInputChange} placeholder='Enter Your Contact' className='bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 focus:bg-white/10 transition-colors text-white placeholder-slate-500 focus:shadow-[0_0_15px_rgba(139,92,246,0.1)]' />
            </aside>
          </div>

          {/* second row div */}
          <div className='w-full flex flex-col md:flex-row gap-6'>
            <aside className='flex flex-col gap-2 w-full md:w-[48%]'>
              <label className='text-sm text-slate-400 font-medium'>Gender</label>
              <div className='bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-center justify-between text-white'>
                <label className='cursor-pointer flex items-center gap-2'>
                  <input checked={gender=="Male"} type='radio' name='gender' value="Male" onChange={handleInputChange} className='accent-primary' /> Male
                </label>
                <label className='cursor-pointer flex items-center gap-2'>
                  <input checked={gender=="Female"} type='radio' name='gender' value="Female" onChange={handleInputChange} className='accent-primary' /> Female
                </label>
                <label className='cursor-pointer flex items-center gap-2'>
                  <input checked={gender=="others"} type='radio' name='gender' value="others" onChange={handleInputChange} className='accent-primary' /> Others
                </label>
              </div>
            </aside>

            <aside className='flex flex-col gap-2 w-full md:w-[48%]'>
              <label htmlFor='languages' className='text-sm text-slate-400 font-medium'>Languages Known</label>
              <input type='text' name='languages' value={languages} onChange={handleInputChange} placeholder='e.g., English, Spanish' className='bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 focus:bg-white/10 transition-colors text-white placeholder-slate-500 focus:shadow-[0_0_15px_rgba(139,92,246,0.1)]' />
            </aside>
          </div>

          {/* address row */}
          <div className='flex flex-col gap-2'>
            <label htmlFor='address' className='text-sm text-slate-400 font-medium'>Full Address</label>
            <textarea name="address" id="address" onChange={handleInputChange} value={address} placeholder='Enter your complete address...' className='min-h-[100px] bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 focus:bg-white/10 transition-colors text-white placeholder-slate-500 focus:shadow-[0_0_15px_rgba(139,92,246,0.1)]'></textarea>
          </div>

          <div className='mt-4'>
            <button className='w-full bg-gradient-to-r from-primary to-primary-dark hover:-translate-y-1 transition-transform shadow-lg shadow-primary/30 py-3 rounded-xl text-white font-semibold active:scale-95'>
              Save Profile Details
            </button>
          </div>

        </form>
      </main>

      </article>
      {isLoading && <Spinner/> }
    </section>
  )
}

export default AddProfile