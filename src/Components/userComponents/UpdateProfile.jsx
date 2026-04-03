import React, { useContext, useState, useEffect } from 'react'
import { AuthContextAPI } from '../../context/AuthContext'
import toast from 'react-hot-toast';
import Spinner from '../../utilities/Spinner';
import { updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { __DB } from '../../backend/firebase';
import { useLocation, useNavigate } from 'react-router-dom';

const UpdateProfile = () => {

  let {authUser, setAuthuser} = useContext(AuthContextAPI);
  let data = useLocation();
  let navigate = useNavigate();
  let dataFromNavlink = data?.state;

  let [imageFile, setImageFile] = useState(null);
  let [imagePreview, setImagePreview] = useState(authUser?.photoURL || "https://i.ibb.co/0j5wgtMv/person.png");
  let [isLoading, setIsLoading] = useState(false);

  let [userData, setUserData] = useState({
    displayName: authUser?.displayName || "",
    dob: dataFromNavlink?.dob || "",
    contact: dataFromNavlink?.contact || "",
    gender: dataFromNavlink?.gender || "",
    address: dataFromNavlink?.address || "",
    languages: dataFromNavlink?.languages || "",
    role: "user"
  });

  let { displayName, dob, contact, gender, address, languages } = userData;

  useEffect(() => {
    if(authUser?.photoURL && !imageFile) setImagePreview(authUser.photoURL);
    if(authUser?.displayName && !userData.displayName) setUserData(prev => ({...prev, displayName: authUser.displayName}));
  }, [authUser]);

  let handleTextChange = (e) => {
    let {name, value} = e.target;
    setUserData({ ...userData, [name]: value });
  }

  let handleImageChange = (e) => {
    let file = e.target.files[0];
    if(file){
      let imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setImageFile(file);
    }
  }

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      let newPhotoUrl = authUser?.photoURL;

      // 1. Upload new image to Cloudinary if selected
      if (imageFile) {
        let imageFormData = new FormData();
        imageFormData.append("file", imageFile);
        imageFormData.append("upload_preset", "JDX Beats");
        imageFormData.append("cloud_name", "difvmhgcr");

        let cloudinaryResponse = await fetch("https://api.cloudinary.com/v1_1/difvmhgcr/image/upload", {
          method: "POST",
          body: imageFormData
        });
        let ImageResponseFromDB = await cloudinaryResponse.json();
        newPhotoUrl = ImageResponseFromDB?.url;
      }

      // 2. Update Firebase Auth (Name & Photo)
      await updateProfile(authUser, { 
        displayName: userData.displayName, 
        photoURL: newPhotoUrl 
      });
      
      setAuthuser({ ...authUser, displayName: userData.displayName, photoURL: newPhotoUrl });

      // 3. Update Firestore (Personal Details)
      let payLoad = { ...userData, uid: authUser.uid, email: authUser.email, photoURL: newPhotoUrl, displayName: userData.displayName };
      let user_data_collection = doc(__DB, "user_profile", authUser.uid);
      await setDoc(user_data_collection, payLoad);

      toast.success("Profile Updated Successfully!");
      navigate("/user-profile");
      
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className='h-full w-full flex justify-center items-center py-10'>
      <article className='w-[90%] lg:w-[60%] bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl py-8 px-6 md:px-10 flex flex-col gap-6 items-center shadow-2xl relative'>

        <header className='w-full border-b border-white/10 pb-4'>
          <h1 className='text-3xl font-bold text-center text-white tracking-wide'>Edit Profile</h1>
          <p className='text-slate-400 text-center mt-2 text-sm'>Update your picture, name, and personal details</p>
        </header>

        <main className='w-full flex justify-center mt-2'>
          <div className='flex flex-col items-center gap-4'>
            <picture className='relative inline-block p-1 bg-slate-900/50 backdrop-blur-md rounded-full shadow-[0_0_20px_rgba(139,92,246,0.2)] group'>
              <img src={imagePreview} alt="User Avatar"
              className='h-[140px] w-[140px] object-cover border-2 border-primary/40 rounded-full transition-opacity group-hover:opacity-70'/>
              
              <label htmlFor="image" className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity'>
                <span className="bg-black/80 border border-white/20 text-white text-[10px] font-bold px-3 py-1.5 rounded-full backdrop-blur-md pointer-events-none uppercase tracking-wider">Change Photo</span>
              </label>
              <input type="file" id="image" className='hidden' onChange={handleImageChange}/>
            </picture>
          </div>
        </main>

        <form action="" onSubmit={handleSubmit} className='flex flex-col gap-5 w-full mt-2'>
          
          <div className='flex flex-col gap-2'>
            <label htmlFor='displayName' className='text-sm text-slate-400 font-medium'>Display Name</label>
            <input type='text' name='displayName' value={displayName} onChange={handleTextChange} placeholder='Enter your full name' className='bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 focus:bg-white/10 transition-colors text-white cursor-text focus:shadow-[0_0_15px_rgba(139,92,246,0.1)]' required />
          </div>

          <div className='w-full flex flex-col md:flex-row gap-5'>
            <aside className='flex flex-col gap-2 w-full md:w-[48%]'>
              <label htmlFor='dob' className='text-sm text-slate-400 font-medium'>Date Of Birth</label>
              <input type='date' name='dob' value={dob} onChange={handleTextChange} className='bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 focus:bg-white/10 transition-colors text-white cursor-text min-h-[50px] focus:shadow-[0_0_15px_rgba(139,92,246,0.1)]' />
            </aside>

            <aside className='flex flex-col gap-2 w-full md:w-[48%]'>
              <label htmlFor='contact' className='text-sm text-slate-400 font-medium'>Contact Number</label>
              <input type='text' name='contact' value={contact} onChange={handleTextChange} placeholder='Enter Your Contact' className='bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 focus:bg-white/10 transition-colors text-white min-h-[50px] focus:shadow-[0_0_15px_rgba(139,92,246,0.1)]' />
            </aside>
          </div>

          <div className='w-full flex flex-col md:flex-row gap-5'>
            <aside className='flex flex-col gap-2 w-full md:w-[48%]'>
              <label className='text-sm text-slate-400 font-medium'>Gender</label>
              <div className='bg-white/5 border border-white/10 rounded-xl px-4 flex items-center justify-between text-white h-[50px]'>
                <label className='cursor-pointer flex items-center gap-2'>
                  <input checked={gender==="Male"} type='radio' name='gender' value="Male" onChange={handleTextChange} className='accent-primary' /> Male
                </label>
                <label className='cursor-pointer flex items-center gap-2'>
                  <input checked={gender==="Female"} type='radio' name='gender' value="Female" onChange={handleTextChange} className='accent-primary' /> Female
                </label>
                <label className='cursor-pointer flex items-center gap-2'>
                  <input checked={gender==="others"} type='radio' name='gender' value="others" onChange={handleTextChange} className='accent-primary' /> Others
                </label>
              </div>
            </aside>

            <aside className='flex flex-col gap-2 w-full md:w-[48%]'>
              <label htmlFor='languages' className='text-sm text-slate-400 font-medium'>Languages Known</label>
              <input type='text' name='languages' value={languages} onChange={handleTextChange} placeholder='e.g., English, Spanish' className='bg-white/5 border border-white/10 rounded-xl px-4 outline-none min-h-[50px] focus:border-primary/50 focus:bg-white/10 transition-colors text-white focus:shadow-[0_0_15px_rgba(139,92,246,0.1)]' />
            </aside>
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor='address' className='text-sm text-slate-400 font-medium'>Full Address</label>
            <textarea name="address" id="address" onChange={handleTextChange} value={address} placeholder='Enter your complete address...' className='min-h-[80px] bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 focus:bg-white/10 transition-colors text-white focus:shadow-[0_0_15px_rgba(139,92,246,0.1)]'></textarea>
          </div>

          <div className='mt-2'>
            <button className='w-full bg-gradient-to-r from-primary to-primary-dark hover:-translate-y-1 transition-transform shadow-[0_10px_20px_rgba(139,92,246,0.3)] py-4 rounded-xl text-white tracking-widest font-bold uppercase text-sm active:scale-95'>
              Save All Changes
            </button>
          </div>

        </form>
      </article>
      {isLoading && <Spinner/>}
    </section>
  )
}

export default UpdateProfile