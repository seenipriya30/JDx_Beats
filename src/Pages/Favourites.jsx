import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import { AudioPlayerContextAPI } from '../context/AudioPlayerContext';
import { AuthContextAPI } from '../context/AuthContext';
import { UserContextAPI } from '../context/UserContext';
import { __DB } from '../backend/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { FaPlay, FaHeart } from "react-icons/fa";

const Favourites = () => {
  let {songs, setSongs, currentSongIndex, setIsPlaying, isPlaying, setCurrentSongIndex} = useContext(AudioPlayerContextAPI);
  let {authUser} = useContext(AuthContextAPI);
  let {userDataFromDB} = useContext(UserContextAPI);

  const favorites = userDataFromDB?.favorites || [];

  const unFavorite = async (e, song) => {
    e.stopPropagation();
    if (!authUser) return;
    try {
        const userRef = doc(__DB, "user_profile", authUser.uid);
        const newFavorites = favorites.filter(f => f.songName !== song.songName);
        await updateDoc(userRef, { favorites: newFavorites });
    } catch (error) {
        console.error("Error removing favorite:", error);
    }
  };

  if (favorites.length === 0) {
      return (
        <section className='w-full h-[80vh] flex flex-col items-center justify-center p-10'>
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className='text-center space-y-6 max-w-lg bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 shadow-[0_20px_50px_rgba(0,0,0,0.3)]'
            >
                <div className='w-24 h-24 mx-auto bg-gradient-to-tr from-rose-500 to-pink-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(244,63,94,0.4)]'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-white">
                      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                    </svg>
                </div>
                
                <h1 className='text-4xl font-extrabold text-white tracking-tight'>Your Favorites</h1>
                
                <p className='text-slate-300 leading-relaxed'>
                    You haven't added any songs to your favorites yet. Go explore some albums and hit the heart icon!
                </p>
            </motion.div>
        </section>
      );
  }

  return (
    <section className='w-full pb-32 pt-4 px-4 md:px-0'>
        <header className='mb-8 border-b border-white/5 pb-4'>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500">
                Your Favorites
            </h1>
            <p className="text-slate-400 mt-2 font-medium">{favorites.length} {favorites.length === 1 ? 'Track' : 'Tracks'} Loved</p>
        </header>

        <main className='w-full bg-slate-800/20 backdrop-blur-md rounded-2xl border border-white/5 shadow-2xl overflow-hidden'>
            <div className="overflow-x-auto">
                <table className='w-full text-left border-collapse'>
                    <thead>
                        <tr className="text-slate-400 text-sm font-medium border-b border-white/5 bg-black/20">
                            <th className='px-4 py-4 w-12 text-center'>#</th>
                            <th className='px-4 py-4'>Title</th>
                            <th className='px-4 py-4 hidden md:table-cell'>Singers</th>
                            <th className='px-4 py-4 hidden lg:table-cell'>Director</th>
                            <th className='px-4 py-4 text-center'>Time</th>
                            <th className='px-4 py-4 text-center w-16'>Fav</th>
                        </tr>
                    </thead>

                    <tbody>
                        {favorites.map((song, index) => {
                            const isCurrentSong = currentSongIndex === index && songs === favorites;
                            
                            return(
                                <tr key={index} 
                                    className={`group border-b border-white/5 transition-colors cursor-pointer hover:bg-white/5 ${isCurrentSong ? 'bg-primary/10' : ''}`}
                                    onClick={() => {
                                        setSongs(favorites); 
                                        setCurrentSongIndex(index);
                                        setIsPlaying(currentSongIndex === index ? !isPlaying : true);
                                    }}>
                                    
                                    <td className='px-4 py-3 text-center'>
                                        <div className="relative flex items-center justify-center w-6 h-6 mx-auto">
                                            <span className={`text-slate-400 font-medium group-hover:opacity-0 ${isCurrentSong ? 'text-primary opacity-0' : ''}`}>{index + 1}</span>
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
                                            <img src={song?.songThumbnail} alt={song?.songName} className='h-12 w-12 rounded object-cover shadow-md border border-white/10' />
                                            <div>
                                                <div className={`font-bold ${isCurrentSong ? 'text-primary' : 'text-white'}`}>{song?.songName}</div>
                                                <div className="text-xs text-slate-400 md:hidden mt-0.5">{song?.songSingers}</div>
                                            </div>
                                        </div>
                                    </td>
                                    
                                    <td className='px-4 py-3 text-slate-300 text-sm hidden md:table-cell font-medium'>{song?.songSingers}</td>
                                    <td className='px-4 py-3 text-slate-400 text-sm hidden lg:table-cell font-medium'>{song?.songMusicDirector}</td>
                                    <td className='px-4 py-3 text-slate-400 text-sm text-center font-medium'>{song?.songDuration}</td>
                                    
                                    <td className='px-4 py-3 text-center'>
                                        <button 
                                            onClick={(e) => unFavorite(e, song)}
                                            className='text-rose-500 hover:scale-110 transition-all duration-200 drop-shadow-[0_0_10px_rgba(244,63,94,0.5)]'
                                            title='Remove from Favorites'
                                        >
                                            <FaHeart className="text-lg" />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </main>
    </section>
  )
}

export default Favourites
