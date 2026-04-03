// import React, { useState } from 'react'
// import toast from 'react-hot-toast';
// import Spinner from '../utilities/Spinner';

// const CreateAlbum = () => {

//     let initialAlbumState ={
//         albumTitle:"",
//         albumPoster:"",
//         albumReleaseDate:"",
//         albumLanguages:"",
//         albumDescription:""
//     }

//     let initialSongState={
//         songName:"",
//         SongsUrl:"",
//         songThumbnail:"",
//         songSingers:"",
//         songMood:"",
//         songMusicDirector:""
//     }

//     let [albumState , setAlbumState] = useState(initialAlbumState);

//     let[songsState , setSongsState] = useState([initialSongState]);

//     let[isLoading, setIsLoading]=useState(false);

//     let[albumThumbnailPoster , setAlbumThumbnailPoster]=useState(null);

//     let {albumTitle , albumPoster , albumReleaseDate , albumLanguages, albumDescription}=albumState;

//     //handling album {poster}

//     let handleAlbumPoster=(e)=>{
//         let file = e.target.files[0];

//         if(file){
//             setAlbumThumbnailPoster(file)
//         }
//     }

//     //Handling input changes in album form

//     let handleAlbumInputChange=(e)=>{
//         let {name, value}=e.target;

//         setAlbumState({
//             ...albumState , [name]:value
//         })
//     }


//     // Add section method for song


//     let addSongSection=(e)=>{
//         e.preventDefault();
//         setSongsState([
//             ...songsState,{
//                 songName:"",
//                 SongsUrl:"",
//                 songThumbnail:"",
//                 songSingers:"",
//                 songMood:"",
//                 songMusicDirector:""
//             }
//         ])
//     }

//     // Remove song section

//     let removeSongSection=(index, e)=>{
//         e.preventDefault();
        
//         if(index>0){
//             setSongsState(songsState.filter((el, ind)=>{
//                 return ind != index;
//         }))
//         }
//     }


//     // handling the songs input

//     let handleSongsInputChange = (index, e)=>{

//         let {name, value} = e.target;

//         let updatedState = [...songsState];

//         updatedState[index][name]= value;

//         setSongsState(updatedState);

//     }

//     // handling files of the forms section


//     let handleSongsFilesInput = (index, inpName, e)=>{
        
//         let updatedSongs = [...songsState];

//         updatedSongs[index][inpName]= e.target.files[0];

//         setSongsState(updatedSongs);


//     }

//     // form submit method

//     let handleFormSubmit= async (e)=>{

//         e.preventDefault();

//         try {
//             setIsLoading(true);

//             let AlbumPosterFormData = new FormData();

//             AlbumPosterFormData.append("file", albumThumbnailPoster);

//             AlbumPosterFormData.append("upload_preset", "JDX Beats")

//             AlbumPosterFormData.append("cloud_name", "difvmhgcr")


//             let cloudinaryResponse = fetch("https://api.cloudinary.com/v1_1/difvmhgcr/image/upload", {
//                 method:"POST",
//                 body: AlbumPosterFormData
//               })
          
//               let AlbumPosterUrlFromDB = await (await cloudinaryResponse).json()

//               console.log(AlbumPosterUrlFromDB);


//               let Payload = {...albumState, albumPoster:AlbumPosterUrlFromDB?.url};

//               console.log(Payload);

//               let SongsUrl= songsState.map(async(song, index)=>{

//                 let songThumbnailFormdata = new FormData();
                
//                 songThumbnailFormdata.append("file", song?.songThumbnail );

//                 songThumbnailFormdata.append("upload_preset", "JDX Beats")

//                 songThumbnailFormdata.append("cloud_name", "difvmhgcr")


//                 let cloudinaryResponseOfSongThumbnailData = fetch("https://api.cloudinary.com/v1_1/difvmhgcr/upload", {
//                     method:"POST",
//                     body: songThumbnailFormdata
//                   })

//                   let SongPosterUrlFromDB = await (await cloudinaryResponseOfSongThumbnailData).json();

//             //   console.log(SongPosterUrlFromDB);

//             //   *songposter url ends here


//             let SongsUrlFormData = new FormData();
                
//             SongsUrlFormData.append("file", song?.SongsUrl );

//             SongsUrlFormData.append("upload_preset", "JDX Beats")

//             SongsUrlFormData.append("cloud_name", "difvmhgcr")


//                 let cloudinaryResponseOfSongsUrlData = fetch("https://api.cloudinary.com/v1_1/difvmhgcr/upload", {
//                     method:"POST",
//                     body: SongsUrlFormData
//                   })

//                   let SongMP3UrlFromDB = await (await cloudinaryResponseOfSongsUrlData).json();
                  
//                 //   console.log(SongMP3UrlFromDB);

//                   console.log("songMP3 URL", SongMP3UrlFromDB);
//                   console.log("songPoster URL", SongPosterUrlFromDB);

                  

//             // ? songState iterating ends here

//               })


//               console.log("Album Poster ", AlbumPosterUrlFromDB?.url);
              
              
//             //   let Payload = {...albumState, albumPoster: albumThumbnailPoster,AllSongs: [...songsState]}

//             //   console.log(Payload);
              


//         } catch (error) {
//             toast.error(error.message);
//             console.log(error);
            
//         }finally{
//             setIsLoading(false);
//         }
        
        
//     }
//   return <>
//     <section className='h-full w-full flex justify-center items-center'>
//         <article className='min-h-[600px] w-[65%] bg-slate-800 rounded-md mt-12 pt-4 px-8'>
//             <header><h1 className='text-[24px] font-semibold text-center'>Create Album</h1></header>
//             <hr className='my-2'></hr>

//             {/* form starting */}
//             <main>
//                 {/* album form starting */}
//                 <header className='my-4'>
//                     <h1 className='text-[20px] font-semibold'>Album Details</h1>
//                 </header>


//                 <article>
//                     <form action="" onSubmit={handleFormSubmit}>
//                         {/* album starts */}
//                         <header className='flex flex-wrap justify-between gap-y-4'>

//                             {/* first row album */}
//                             <div className='flex flex-col gap-2 w-[48%]'>
//                                 <label htmlFor="albumTitle">Album Title</label>
//                                 <input type="text"
//                                 name='albumTitle'
//                                 value={albumTitle}
//                                 placeholder='Enter Album Title' 
//                                 onChange={handleAlbumInputChange}
//                                 className='outline-none py-2 px-2 border rounded-md'/>
//                             </div>

                            
//                             <div className='flex flex-col gap-2 w-[48%]'>
//                                 <label htmlFor="albumPoster">Album Poster</label>
//                                 <input type="file"
//                                 name='albumPoster'
//                                 onChange={handleAlbumPoster}
//                                 placeholder='Enter Album Title' 
//                                 className='outline-none py-2 px-2 border rounded-md file:bg-blue-600 file:px-1 file:rounded-sm'/>
//                             </div>

//                              {/* second row album */}
//                              <div className='flex flex-col gap-2 w-[48%]'>
//                                 <label htmlFor="albumTitle">Album Release date</label>
//                                 <input type="date"
//                                 name='albumReleaseDate'
//                                 value={albumReleaseDate}
//                                 placeholder='Enter release date' 
//                                 onChange={handleAlbumInputChange}
//                                 className='outline-none py-2 px-2 border rounded-md'/>
//                             </div>

                            
//                             <div className='flex flex-col gap-2 w-[48%]'>
//                                 <label htmlFor="albumTitle">Album Languages </label>
//                                 <input type="text"
//                                 name='albumLanguages'
//                                 value={albumLanguages}
//                                 placeholder='Enter Languages' 
//                                 onChange={handleAlbumInputChange}
//                                 className='outline-none py-2 px-2 border rounded-md'/>
//                             </div>

//                              {/* third row album */}
//                              <div className='flex flex-col gap-2 w-[100%]'>
//                                 <label htmlFor="albumTitle">Album Title</label>
//                                 <textarea className='py-2 px-2 border rounded-md' placeholder='Enter the Description' name='albumDescription' onChange={handleAlbumInputChange}>

//                                 </textarea>
//                             </div>
//                         </header>
//                         {/* album ends */}


//                         {/* songs form starts here */}

//                         <main className='py-4'>

//                             <header>
//                                 <h1 className='text-[20px] font-semibold'>Songs Section</h1>
//                             </header>

//                             {/* iterating the songsState */}

//                             {songsState?.map((song, index)=>{
//                                 return <section className='py-2 px-6 bg-slate-700 w-[100%] min-h-[250px] rounded-md my-4'>

//                                     <header><h1 className='text-[18px] text-center font-semibold'>Song {index+1}</h1></header>

//                                     {/* this is songs divs section */}

//                                     <main className='flex justify-between flex-wrap gap-y-4'>

//                                         {/* first row songs selection */}

//                                         <div className='flex flex-col gap-2 w-[32%]'>
//                                             <label htmlFor=''>Song Name</label>
//                                             <input type="text" name='songName' onChange={(e)=>handleSongsInputChange(index, e)} value={song?.songName} placeholder='Enter song Name' className='outline-none border py-2 px-2 rounded-md'/>
//                                         </div>

//                                         <div className='flex flex-col gap-2 w-[32%]'>
//                                             <label htmlFor=''>Song Url</label>
//                                             <input type="file" name='SongsUrl' onChange={(e)=>handleSongsFilesInput(index, "SongsUrl", e)} className='outline-none border py-2 px-2 rounded-md file:bg-blue-600 file:px-1 file:rounded-md'/>
//                                         </div>

//                                         <div className='flex flex-col gap-2 w-[32%]'>
//                                             <label htmlFor=''>Song Poster</label>
//                                             <input type="file" name='songThumbnail' onChange={(e)=>handleSongsFilesInput(index, "songThumbnail", e)} className='outline-none border py-2 px-2 rounded-md'/>
//                                         </div>

//                                         {/* second row songs section */}


//                                         <div className='flex flex-col gap-2 w-[32%]'>
//                                             <label htmlFor=''>Song Singers</label>
//                                             <input type="text" name='songSingers' onChange={(e)=>handleSongsInputChange(index, e)} value={song?.songSingers} placeholder='Enter singers' className='outline-none border py-2 px-2 rounded-md'/>
//                                         </div>

//                                         <div className='flex flex-col gap-2 w-[32%]'>
//                                             <label htmlFor=''>Song Mood</label>
//                                             <input type="text" name='songMood' onChange={(e)=>handleSongsInputChange(index, e)} value={song?.songMood} placeholder='enter song mood' className='outline-none border py-2 px-2 rounded-md'/>
//                                         </div>

//                                         <div className='flex flex-col gap-2 w-[32%]'>
//                                             <label htmlFor=''>Song Music Director</label>
//                                             <input type="text" placeholder='Enter Music Director' name='songMusicDirector' onChange={(e)=>handleSongsInputChange(index, e)} value={song?.songMusicDirector} className='outline-none border py-2 px-2 rounded-md'/>
//                                         </div>

//                                     </main>


//                                     <footer className='flex justify-between py-6'>

//                                         <button onClick={(e)=>removeSongSection(index, e)} className='py-2 px-4 bg-red-600 rounded-md'>Remove section</button>

//                                         {index == songsState.length-1 &&
//                                         <button onClick={addSongSection} className='py-2 px-4 bg-blue-600 rounded-md'>
//                                             Add section
//                                         </button>
//                                         }

//                                     </footer>

//                                 </section>

//                             })}

                            

//                         </main>


//                         {/* songs form ends here */}


//                         {/* submit part starts */}

//                         <footer>
//                             <button className='bg-blue-600 hover:bg-blue-800 w-[100%] py-2 rounded-md'>Submit</button>
//                         </footer>

//                         {/* submit part ends */}
//                     </form>
//                 </article>


//                 {/* album form ending */}
//             </main>
//             {/* form ending */}
//         </article>
//         {isLoading && <Spinner/>}
//     </section>
//     </>
// }

// export default CreateAlbum




import React, { useState } from 'react'
import toast from 'react-hot-toast';
import Spinner from '../utilities/Spinner';
import { addDoc, collection } from 'firebase/firestore';
import { __DB } from '../backend/firebase';

const CreateAlbum = () => {

    let initialAlbumState ={
        albumTitle:"",
        albumPoster:"",
        albumReleaseDate:"",
        albumLanguages:"",
        albumDescription:""
    }

    let initialSongState={
        songName:"",
        SongsUrl:"",
        songThumbnail:"",
        songSingers:"",
        songMood:"",
        songMusicDirector:""
    }

    let [albumState , setAlbumState] = useState(initialAlbumState);

    let[songsState , setSongsState] = useState([initialSongState]);

    let[isLoading, setIsLoading]=useState(false);

    let[albumThumbnailPoster,setAlbumThumbnailPoster]=useState(null);

    let {albumTitle , albumPoster , albumReleaseDate , albumLanguages, albumDescription}=albumState;


    let handleAlbumPoster=(e)=>{
      let file =e.target.files[0];
      if(file){
        setAlbumThumbnailPoster(file)
      }
    }
    // handling input changes in album form
    let handleAlbumInputChange=(e)=>{
      let{name,value}=e.target;
      setAlbumState({
        ...albumState,[name]:value
      })
    }
    //add section method for song 
    let addSongSection=(e)=>{
      e.preventDefault()
      setSongsState([
        ...songsState,{
          songName:"",
          SongsUrl:"",
          songThumbnail:"",
          songSingers:"",
          songMood:"",
          songMusicDirector:""
        }
      ])
    }
//remove song section
let removeSongSection=(index,e)=>{
  e.preventDefault();
  if(index>0){
    setSongsState(songsState.filter((el,ind)=>{
      return ind!=index;


  }))
}
}
//handle song input
let handleSongsInputChange =(index,e)=>{
  let {name , value }=e.target;
  let updatedState=[...songsState];

  updatedState[index][name]=value;

  setSongsState(updatedState);

}
//handle files of song selection
let handleSongsFilesInput = (index,inpName,e)=>{
  let  updatedSongs =[...songsState];
  updatedSongs[index][inpName]=e.target.files[0];
  setSongsState(updatedSongs)
}
// form submit method

let handleFormSubmit = async (e) => {
  e.preventDefault();
  try {
    setIsLoading(true);

    // Upload album poster to Cloudinary
    let albumPosterFormData = new FormData();
    albumPosterFormData.append("file", albumThumbnailPoster);
    albumPosterFormData.append("upload_preset", "JDX Beats");
    albumPosterFormData.append("cloud_name", "difvmhgcr");

    let cloudinaryResponse = await fetch(
      "https://api.cloudinary.com/v1_1/difvmhgcr/image/upload",
      {
        method: "POST",
        body: albumPosterFormData,
      }
    );
    let albumPosterData = await cloudinaryResponse.json();
    let albumPosterUrl = albumPosterData.url;

    // Upload songs (thumbnail & mp3 files)
    let uploadedSongs = await Promise.all(
      songsState.map(async (song) => {
        // Upload song thumbnail
        let songThumbnailFormData = new FormData();
        songThumbnailFormData.append("file", song?.songThumbnail);
        songThumbnailFormData.append("upload_preset", "JDX Beats");
        songThumbnailFormData.append("cloud_name", "difvmhgcr");

        let songThumbnailResponse = await fetch(
          "https://api.cloudinary.com/v1_1/difvmhgcr/image/upload",
          {
            method: "POST",
            body: songThumbnailFormData,
          }
        );
        let songThumbnailData = await songThumbnailResponse.json();
        let songThumbnailUrl = songThumbnailData.url;

        // Upload song MP3 file
        let songUrlFormData = new FormData();
        songUrlFormData.append("file", song?.SongsUrl);
        songUrlFormData.append("upload_preset", "JDX Beats");
        songUrlFormData.append("cloud_name", "difvmhgcr");

        let songUrlResponse = await fetch(
          "https://api.cloudinary.com/v1_1/difvmhgcr/upload",
          {
            method: "POST",
            body: songUrlFormData,
          }
        );
        let songUrlData = await songUrlResponse.json();
        let songMp3Url = songUrlData.url;
        let songDuration = songUrlData.duration;

        return {
          songName: song.songName,
          songThumbnail: songThumbnailUrl, // Store URL instead of file
          songSingers: song.songSingers,
          songMood: song.songMood,
          songMusicDirector: song.songMusicDirector,
          SongUrl: songMp3Url, // Store URL instead of file
          songDuration: songDuration,
        };
      })
    );

    // Prepare the final data for Firestore
    let Payload = {
      ...albumState,
      albumPoster: albumPosterUrl, // Ensure only URL is stored
      AllSongs: uploadedSongs,
    };

    // Save data to Firestore
    let album_collection_ref = collection(__DB, "album_Collections");
    await addDoc(album_collection_ref, Payload);

    toast.success("Data Stored successfully!");
  } catch (error) {
    toast.error(error.message);
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};



  return <>
    <section className='h-full w-full flex justify-center items-center'>
        <article className='min-h-[600px] w-[65%] bg-slate-800 rounded-md mt-12 pt-4 px-8'>
            <header><h1 className='text-[24px] font-semibold text-center'>Create Album</h1></header>
            <hr className='my-2'></hr>

            {/* form starting */}
            <main>
                {/* album form starting */}
                <header className='my-4'>
                    <h1 className='text-[20px] font-semibold'>Album Details</h1>
                </header>


                <article>
                    <form action="" onSubmit={handleFormSubmit}>
                        {/* album starts */}
                        <header className='flex flex-wrap justify-between gap-y-4'>

                            {/* first row album */}
                            <div className='flex flex-col gap-2 w-[48%]'>
                                <label htmlFor="albumTitle">Album Title</label>
                                <input type="text"
                                name='albumTitle'
                                value={albumTitle}
                                placeholder='Enter Album Title' 
                                onChange={handleAlbumInputChange}
                                className='outline-none py-2 px-2 border rounded-md'/>
                            </div>

                            
                            <div className='flex flex-col gap-2 w-[48%]'>
                                <label htmlFor="albumPoster">Album Poster</label>
                                <input type="file"
                                name='albumPoster'
                                placeholder='Enter Album Title'
                                onChange={handleAlbumPoster} 
                                className='outline-none py-2 px-2 border rounded-md file:bg-blue-600 file:px-1 file:rounded-sm'/>
                            </div>

                             {/* second row album */}
                             <div className='flex flex-col gap-2 w-[48%]'>
                                <label htmlFor="albumTitle">Album Release date</label>
                                <input type="date" 
                                name='albumReleaseDate'
                                onChange={handleAlbumInputChange}
                                value={albumReleaseDate}
                                placeholder='Enter Album Title' 
                                className='outline-none py-2 px-2 border rounded-md'/>
                            </div>

                            
                            <div className='flex flex-col gap-2 w-[48%]'>
                                <label htmlFor="albumTitle">Album languages </label>
                                <input type="text"
                                name='albumLanguages'
                                value={albumLanguages}
                                onChange={handleAlbumInputChange}
                                placeholder='Enter Album languages' 
                                className='outline-none py-2 px-2 border rounded-md'/>
                            </div>

                             {/* third row album */}
                             <div className='flex flex-col gap-2 w-[100%]'>
                                <label htmlFor="albumTitle">Album Title</label>
                                <textarea   onChange={handleAlbumInputChange} className='py-2 px-2 border rounded-md'value={albumDescription} name='albumDescription' placeholder='Enter the Description'>

                                </textarea>
                            </div>
                        </header>
                        {/* album ends */}

                        {/* songs form starts here */}
                        <main className='py-4'>
                          <header>
                            <h1 className='text-[20px] font-semibold'>Songs Section</h1>
                          </header>
                          {/* iterating the song state  */}
                          {songsState?.map((song,index)=>{
                            return    <section key={index} className='bg-slate-700 w-[100%] min-h-[250px] rounded-md my-4 py-2 px-6'>
                            <header>
                              <h1 className='text-[18px] font-semibold  text-center'>Song {index+1}</h1>
                            </header>
                            {/* this is songs div section */}
                            <main className='flex justify-between flex-wrap gap-y-4'>
                              {/* first row songs section */}
                              <div className='flex flex-col gap-2 w-[32%]'>
                                <label htmlFor=''>Song Name </label>
                                <input type='text' name='songName' onChange={(e)=>handleSongsInputChange(index,e)} className='outline-none px-2 py-2 border rounded-md' 
                                value={song?.songName}
                                placeholder='enter song name'></input>
                              </div>

                              <div className='flex flex-col gap-2 w-[32%]'>
                                <label htmlFor=''>Song url </label>
                                <input type='file' onChange={(e)=>handleSongsFilesInput(index, "SongsUrl" ,e)} name='SongsUrl' className='outline-none px-2 py-2 border  file:bg-blue-600 file:px-1 file:rounded-sm'></input>
                              </div>

                              <div className='flex flex-col gap-2 w-[32%]'>
                                <label htmlFor=''>Song poster</label>
                                <input type='file' name='songThumbnail' onChange={(e)=>handleSongsFilesInput(index, "songThumbnail" ,e)} className='outline-none px-2 py-2 border  file:bg-blue-600 file:px-1 file:rounded-sm' ></input>
                              </div>
                              {/* second row songs section */}
                              <div className='flex flex-col gap-2 w-[32%]'>
                                <label htmlFor=''>Song Singers </label>
                                <input type='text'  value={song?.songSingers} name='songSingers' onChange={(e)=>handleSongsInputChange(index,e)} className='outline-none px-2 py-2 border rounded-md' placeholder='enter song singer'></input>
                              </div>

                              <div className='flex flex-col gap-2 w-[32%]'>
                                <label htmlFor=''>Song Mood </label>
                                <input type='text' name='songMood'  value={song?.songMood} onChange={(e)=>handleSongsInputChange(index,e)} className='outline-none px-2 py-2 border rounded-md' placeholder='enter song mood'></input>
                              </div>

                              <div className='flex flex-col gap-2 w-[32%]'>
                                <label htmlFor=''>Music Director </label>
                                <input type='text' onChange={(e)=>handleSongsInputChange(index,e)}  value={song?.songMusicDirector} name='songMusicDirector' className='outline-none px-2 py-2 border rounded-md' placeholder='enter song name'></input>
                              </div>



                            </main>
                            <footer className='flex justify-between py-6'>
                              <button className='py-2 px-8 bg-red-600 rounded-md' onClick={(e)=>removeSongSection(index,e)}>Remove section</button>
                                  


                             
                                  {index==songsState.length-1 && <button className='py-2 px-8 bg-blue-600 rounded-md' onClick={(e)=>addSongSection(e)}> Add section</button>  }
                            </footer>
                            
                             </section>
                          })}
                       
                        </main>
                        {/* songs form ends here */}

                        {/* submit part start */}
                        <footer>
                          <button className='bg-blue-600 hover:bg-blue-800 w-[100%] py-2 px-4 rounded-md'>Submit</button>
                          
                        </footer>
                    </form>
                </article>


                {/* album form ending */}
            </main>
            {/* form ending */}
        </article>
        {isLoading && <Spinner></Spinner>}
    </section>
    </>
}

export default CreateAlbum