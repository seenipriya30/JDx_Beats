import { deleteUser } from 'firebase/auth';
import React, { useState } from 'react'

const DeleteAccount = () => {
  let[inputText,setInputText ]=useState("");

  let handleInputChange=(e)=>{
    let inputText =e.target.value;
    setInputText(inputText);
  }
  let handleSubmit=(e)=>{
    e.preventDefault();
    console.log(inputText);
    

    toast.success("user deleted successfully")
  }
  return (
   <section className='h-full w-full flex justify-center items-center '>
    <article className="w-[60%] h-[300px] bg-slate-700 rounded-md p-6 flex flex-col gap-6">
      <header><h1 className='text-[32px] font-semibold'>Deleting account </h1></header>
      <main>
      <p className='w-[80%]'>Deleting account will remove all the information from the database and <b> it cant't be reversed</b></p>
    </main>
    <footer>
      <form action="" onSubmit={handleSubmit}className='flex justify-between items-end'>
        <div className='flex flex-col gap-2'>
          <label htmlFor="">To delete this account type <b>DELETE</b></label>
          <input type="text" className='outline-none border py-1 px-2 rounded-md bg-white text-red-600  font-semibold w-[255px]'onChange={handleInputChange} />
        </div>
        <div>
          <button disabled ={inputText!="DELETE"}className={` py-2 px-16 rounded-md  ${inputText!="DELETE"?"bg-slate-500 cursor-not-allowed":"bg-red-600 cursor-pointer"}`}>Delete Account</button> 
        </div>
      </form>
    </footer>
    </article>
    
   </section>
  )
}

export default DeleteAccount