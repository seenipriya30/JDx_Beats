// import React, { useContext } from 'react'
// import { useLocation } from 'react-router-dom'
// import { AudioPlayerContextAPI } from '../../context/AudioPlayerContext';
// import CustomAudioPlayer from 'react-pro-audio-player';

// const AlbumDetails = () => {

//     let {songs, setSongs, isPlaying ,setIsPlaying, currentSongIndex, setCurrentSongIndex}= useContext(AudioPlayerContextAPI);

//     let data = useLocation();
//     console.log("data from album", data);

//     let AlbumDetails= data?.state;


    
//   return (
//     <section className='h-full w-full'>

//       <article className='h-full w-full'>

//         <header>

//         <header className='h-[370px] w-full bg-slate-800 rounded-md flex p-6 gap-10'>
//             <aside className='w-[50%]'>
//                 <picture>
//                     <img src={AlbumDetails?.albumPoster} alt='' className='h-[280px] w-[280px] rounded-sm' />
//                     </picture>
//                     </aside>
//                     <aside className='flex flex-col gap-2'>
//                         <h1 className='text-[24px] font-thin '>{AlbumDetails?.albumTitle}</h1>
//                         <p className='flex gap-2'>
//                             <span>No of Tracks</span>
//                             <span className='bg-blue-600 px-4 rounded-md'>{AlbumDetails?.AllSongs?.length}</span>
//                         </p>

//                         <p className='flex gap-2'>
//                             <span>Languages</span>
//                             <span>{AlbumDetails?.albumLanguages}</span>
//                         </p>

//                         <p className='flex gap-2 items-center'>
//                             <span>Release Date</span>
//                             <span>{AlbumDetails?.albumReleaseDate}</span>
//                         </p>

//                         <div className='flex gap-2 items-center'>
//                             <span>Description :</span>
//                             <p className='w-[60%]'>{AlbumDetails?.albumDescription}</p>
//                         </div>
//                     </aside>
//         </header>
//         </header>

//         <main className='mt-20'>
//             <table className='w-full bg-red-700'>
//                 <thead className='bg-slate-700'>
//                     <tr>

//                     <th className='px-2 '></th>
//                     <th className='px-1 py-3'></th>
//                     <th className='px-1 py-3'>Song Name</th>
//                     <th className='px-1 py-3'>Singers</th>
//                     <th className='px-1 py-3'>Music Director</th>
//                     <th className='px-1 py-3'>Mood </th>
//                     <th className='px-1 py-3'>Duration</th>

//                     </tr>
//                 </thead>

//                 <tbody>
//                     {AlbumDetails?.AllSongs?.map((song, index)=>{

//                         return(
//                             <tr key={index} className='bg-slate-800' onClick={()=>{
//                                 setSongs(AlbumDetails?.AllSongs); setCurrentSongIndex(index);
//                                 setIsPlaying(!isPlaying)
//                             }}>

//                                 <td className='py-1 text-center'>{index+1}</td>

//                                 <td className='py-2 pl-6 w-[100px]'><img src={song?.songThumbnail} className='h-[60px] rounded-sm'/></td>

//                                 <td className='py-1 px-4 pl-4'>{song?.songName}</td>

//                                 <td className='py-1'>{song?.songSingers}</td>

//                                 <td className='py-1'>{song?.songMusicDirector}</td>

//                                 <td className='py-1'>{song?.songMood}</td>
//                                 <td className='py-1'>{song?.songDuration/60}</td>
//                             </tr>
//                         )
//                     })}
//                 </tbody>

//             </table>

//         </main>

//         </article>

//         {currentSongIndex !== null && (
//         <CustomAudioPlayer
//           songs={songs}
//           isPlaying={isPlaying}
//           currentSongIndex={currentSongIndex}
//           onPlayPauseChange={setIsPlaying}
//           onSongChange={setCurrentSongIndex}
//           songUrlKey="songUrl"
//           songNameKey="songName"
//           songThumbnailKey="songThumbnail" 
//           songSingerKey="songSingers"
//         />
//       )}

//     </section>
//   )
// }

// export default AlbumDetails




// import React, { useContext } from 'react'
// import { useLocation } from 'react-router-dom'
// import { AudioPlayerContextAPI } from '../../context/AudioPlayerContext';
// import CustomAudioPlayer from 'react-pro-audio-player';

// const AlbumDetails = () => {

//    let {songs,setSongs,currentSongIndex,setIsPlaying,isPlaying,setCurrentSongIndex} =useContext(AudioPlayerContextAPI);

//     let data= useLocation();
//     let AlbumDetails = data?.state;
//     // console.log("data from album",data);
//     console.log(AlbumDetails);
    
    
//   return <>
// <section className='h-full w-full'>
//     <article className='h-full w-full'>
//        <header>
//        <header className='h-[370px] w-full bg-slate-800 rounded-md flex p-6 gap-10'>
//          <aside className='w-[400px]' ><picture>
//             <img src={AlbumDetails?.albumPoster} className='h-[280px] rounded-sm'></img>
//             </picture></aside>
//          <aside className='flex  flex-col gap-2 '><h1 className='text-[24px] font-thin'>
//             {AlbumDetails?.albumTitle}</h1>
//             <p className='flex gap-2 items-center'><span>
//               No of Tracks :
//             </span>
//             <span className='bg-blue-600 py-1 px-4 rounded-md'>
//                 {AlbumDetails?.AllSongs?.length}
//             </span>
//                 </p>
//                 <p className='flex gap-2 items-center'><span>
//              Languages :
//             </span>
//             <span className=' py-1 px-4 rounded-md'>
//                 {AlbumDetails?.albumLanguages}
//             </span>
//                 </p>

//                 <p className='flex gap-2 items-center'><span>
//              Release Date :
//             </span>
//             <span className=' py-1 px-4 rounded-md'>
//                 {AlbumDetails?.albumReleaseDate}
//             </span>
//                 </p>

//                 <div className='flex gap-2  '><span>
//              Description:
//             </span>
//            <p className='w-[60%]'>
//             {AlbumDetails?.albumDescription}
//            </p>
//                 </div>
                
                
                
//                 </aside>
//         </header>
//        </header>
//        <main className='mt-20'>
//         <table className='w-full bg-slate-700'>
//             <thead>
//             <tr>
//          <th className='px-2'></th>
//           <th className='px-1 py-3'></th>
//           <th className='px-1 py-3'>Song name</th>
//           <th className='px-1 py-3'>Singers</th>
//           <th className='px-1 py-3'>Music director</th>
//           <th className='px-1 py-3'>Mood</th>
//           <th className='px-1 py-3'>Duration</th>
//           </tr>
//             </thead>

//             <tbody>
//                 {AlbumDetails?.AllSongs?.map((song , index)=>{

//                     return(
//                         <tr key={index} className='bg-slate-800' onClick={()=>{
//                             setSongs(AlbumDetails?.AllSongs); setCurrentSongIndex(index);
//                             setIsPlaying(!isPlaying)
//                         }}>
//                             <td className='py-1 text-center'>{index+1}</td>
//                             <td className='w-[100px] py-2 pl-6'><img src={song?.songThumbnail} alt="" className='h-[60px] rounded-sm'/></td>
//                             <td className='py-1 pl-4 text-center'>{song?.songName}</td>
//                             <td className='py-1 text-center'>{song?.songSingers}</td>
//                             <td className='py-1 text-center'>{song?.songMusicDirector}</td>
//                             <td className='py-1 text-center'>{song?.songMood}</td>
//                             <td className='py-1 text-center'>{song?.songDuration}</td>
//                         </tr>
//                     )

//                 })}
//             </tbody>
//         </table>
//        </main>
//     </article>

//     <section className='w-full fixed bottom-0'>

//     {currentSongIndex !== null && (
//         <CustomAudioPlayer
//           songs={songs}
//           isPlaying={isPlaying}
//           currentSongIndex={currentSongIndex}
//           onPlayPauseChange={setIsPlaying}
//           onSongChange={setCurrentSongIndex}
//           songUrlKey="SongUrl"
//           songNameKey="songName"
//           songThumbnailKey="songThumbnail" 
//           songSingerKey="songSingers"
//         />
//       )}
//     </section>
// </section>
//   </>
// }

// export default AlbumDetails


import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AudioPlayerContextAPI } from '../../context/AudioPlayerContext';
import { AuthContextAPI } from '../../context/AuthContext';
import { UserContextAPI } from '../../context/UserContext';
import { __DB } from '../../backend/firebase';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import CustomAudioPlayer from 'react-pro-audio-player';
import { FaPlay, FaHeart, FaRegHeart, FaPlus } from "react-icons/fa";
import AddToPlaylistModal from '../AddToPlaylistModal';

const AlbumDetails = () => {
    let {songs, setSongs, currentSongIndex, setIsPlaying, isPlaying, setCurrentSongIndex} = useContext(AudioPlayerContextAPI);
    let {authUser} = useContext(AuthContextAPI);
    let {userDataFromDB} = useContext(UserContextAPI);
    
    const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);
    const [selectedSongForPlaylist, setSelectedSongForPlaylist] = useState(null);
    
    let data = useLocation();
    let AlbumDetails = data?.state;
    
    // Fallback if no album data is available
    if (!AlbumDetails) return <div className="text-center mt-20 text-slate-400">Loading Album Details...</div>;

    const toggleFavorite = async (e, song, isFavorited) => {
        e.stopPropagation(); // Prevents row click from playing the song
        if (!authUser) return;
        
        try {
            const userRef = doc(__DB, "user_profile", authUser.uid);
            // Append album poster as well so we can display it nicely in Favorites
            const songToSave = { ...song, albumPoster: AlbumDetails.albumPoster };
            if (isFavorited) {
                // Must exact match the object. To safely remove, filter by songName instead later or ensure exact fields.
                // Note: arrayRemove requires exact object match or use custom logic. Let's filter manually.
                const newFavorites = (userDataFromDB?.favorites || []).filter(f => f.songName !== song.songName);
                await updateDoc(userRef, { favorites: newFavorites });
            } else {
                await updateDoc(userRef, { favorites: arrayUnion(songToSave) });
            }
        } catch (error) {
            console.error("Error toggling favorite:", error);
        }
    };
    
  return (
    <section className='w-full pb-32'>
        <article className='w-full'>
            
           {/* Glassmorphic Header */}
           <header className='w-full bg-slate-800/40 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-8 relative overflow-hidden'>
               {/* Background blur using album poster */}
               <div className="absolute inset-0 w-full h-full opacity-20 blur-3xl z-0" style={{ backgroundImage: `url(${AlbumDetails?.albumPoster})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
               
               {/* Album Poster */}
               <aside className='w-full md:w-[280px] shrink-0 z-10'>
                 <picture className="block shadow-2xl rounded-xl overflow-hidden group relative">
                    <img src={AlbumDetails?.albumPoster} alt={AlbumDetails?.albumTitle} className='w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-105' />
                 </picture>
               </aside>
               
               {/* Album Info */}
               <aside className='flex flex-col gap-4 z-10 text-white flex-1 justify-center'>
                    <p className="text-sm font-bold tracking-widest text-primary uppercase">Album</p>
                    <h1 className='text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400'>
                        {AlbumDetails?.albumTitle}
                    </h1>
                    
                    <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-slate-300 font-medium">
                        <span className='bg-primary/20 text-primary-light border border-primary/30 py-1.5 px-4 rounded-full shadow-lg backdrop-blur-md'>
                            {AlbumDetails?.AllSongs?.length} Tracks
                        </span>
                        <span className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                            {AlbumDetails?.albumLanguages}
                        </span>
                        <span className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                            {AlbumDetails?.albumReleaseDate}
                        </span>
                    </div>

                    <div className='mt-2'>
                       <p className='text-slate-300 leading-relaxed text-sm md:text-base max-w-3xl'>
                        {AlbumDetails?.albumDescription}
                       </p>
                    </div>
                </aside>
            </header>

           {/* Tracklist Section */}
           <main className='mt-10'>
            <div className="border-b border-white/5 pb-2 mb-4">
                <h2 className="text-2xl font-bold">Tracklist</h2>
            </div>
            
            <div className="overflow-x-auto">
                <table className='w-full text-left border-collapse'>
                    <thead>
                        <tr className="text-slate-400 text-sm font-medium border-b border-white/5">
                            <th className='px-4 py-4 w-12 text-center'>#</th>
                            <th className='px-4 py-4'>Title</th>
                            <th className='px-4 py-4 hidden md:table-cell'>Singers</th>
                            <th className='px-4 py-4 hidden lg:table-cell'>Director</th>
                            <th className='px-4 py-4 text-center'>Time</th>
                            <th className='px-4 py-4 text-center w-12'>Add</th>
                            <th className='px-4 py-4 text-center w-12'>Fav</th>
                        </tr>
                    </thead>

                    <tbody>
                        {AlbumDetails?.AllSongs?.map((song, index) => {
                            const isCurrentSong = currentSongIndex === index && songs === AlbumDetails?.AllSongs;
                            const isFavorited = userDataFromDB?.favorites?.some(f => f.songName === song.songName);
                            
                            return(
                                <tr key={index} 
                                    className={`group border-b border-white/5 transition-colors cursor-pointer hover:bg-white/5 ${isCurrentSong ? 'bg-primary/10 active-track-glow' : ''}`}
                                    onClick={() => {
                                        setSongs(AlbumDetails?.AllSongs); 
                                        setCurrentSongIndex(index);
                                        setIsPlaying(currentSongIndex === index ? !isPlaying : true);
                                    }}>
                                    
                                    <td className='px-4 py-3 text-center'>
                                        <div className="relative flex items-center justify-center w-6 h-6 mx-auto">
                                            <span className={`text-slate-400 group-hover:opacity-0 ${isCurrentSong ? 'text-primary opacity-0' : ''}`}>{index + 1}</span>
                                            <span className={`absolute text-white opacity-0 group-hover:opacity-100 ${isCurrentSong ? 'text-primary opacity-100' : ''}`}>
                                                {isCurrentSong && isPlaying ? (
                                                  <div className="flex items-end justify-center w-4 h-4 gap-[2px]">
                                                    <div className="w-1 bg-primary animate-[bounce_0.8s_infinite] h-full"></div>
                                                    <div className="w-1 bg-primary animate-[bounce_0.8s_infinite_0.2s] h-2/3"></div>
                                                    <div className="w-1 bg-primary animate-[bounce_0.8s_infinite_0.4s] h-4/5"></div>
                                                  </div>
                                                ) : (
                                                  <FaPlay className="text-sm" />
                                                )}
                                            </span>
                                        </div>
                                    </td>
                                    
                                    <td className='px-4 py-3'>
                                        <div className="flex items-center gap-4">
                                            <img src={song?.songThumbnail} alt={song?.songName} className='h-12 w-12 rounded object-cover shadow-md' />
                                            <div>
                                                <div className={`font-semibold ${isCurrentSong ? 'text-primary' : 'text-white'}`}>{song?.songName}</div>
                                                <div className="text-xs text-slate-400 md:hidden mt-0.5">{song?.songSingers}</div>
                                            </div>
                                        </div>
                                    </td>
                                    
                                    <td className='px-4 py-3 text-slate-300 text-sm hidden md:table-cell'>{song?.songSingers}</td>
                                    <td className='px-4 py-3 text-slate-400 text-sm hidden lg:table-cell'>{song?.songMusicDirector}</td>
                                    <td className='px-4 py-3 text-slate-400 text-sm text-center'>{song?.songDuration}</td>
                                    
                                    <td className='px-4 py-3 text-center'>
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedSongForPlaylist(song);
                                                setIsPlaylistModalOpen(true);
                                            }}
                                            className='text-slate-400 hover:text-primary hover:scale-110 transition-all duration-200'
                                            title="Add to Playlist"
                                        >
                                            <FaPlus className="text-lg" />
                                        </button>
                                    </td>

                                    <td className='px-4 py-3 text-center'>
                                        <button 
                                            onClick={(e) => toggleFavorite(e, song, isFavorited)}
                                            className='text-slate-400 hover:text-rose-500 hover:scale-110 transition-all duration-200'
                                        >
                                            {isFavorited ? <FaHeart className="text-rose-500 text-lg shadow-rose-500" /> : <FaRegHeart className="text-lg" />}
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
           </main>
        </article>

        <AddToPlaylistModal 
            isOpen={isPlaylistModalOpen} 
            onClose={() => setIsPlaylistModalOpen(false)} 
            song={selectedSongForPlaylist} 
        />
    </section>
  )
}

export default AlbumDetails