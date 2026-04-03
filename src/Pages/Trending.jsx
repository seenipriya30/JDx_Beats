import React, { useContext, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AudioPlayerContextAPI } from '../context/AudioPlayerContext';
import { FaPlay, FaFire, FaCrown, FaHeadphones } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";
import Spinner from '../utilities/Spinner';
import Skeleton from '../utilities/Skeleton';
import { FaPlus } from "react-icons/fa";
import AddToPlaylistModal from '../Components/AddToPlaylistModal';

const Trending = () => {
  const { songs, setSongs, currentSongIndex, setIsPlaying, isPlaying, setCurrentSongIndex } = useContext(AudioPlayerContextAPI);
  
  const [globalTrending, setGlobalTrending] = useState([]);
  const [indiaTrending, setIndiaTrending] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("global"); // 'global' or 'india'
  const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);
  const [selectedSongForPlaylist, setSelectedSongForPlaylist] = useState(null);

  useEffect(() => {
    const fetchTrendingMusic = async () => {
      try {
        setIsLoading(true);

        const usResponse = await fetch("https://itunes.apple.com/us/rss/topsongs/limit=20/json");
        const usData = await usResponse.json();
        
        const inResponse = await fetch("https://itunes.apple.com/in/rss/topsongs/limit=20/json");
        const inData = await inResponse.json();

        const formatSongs = (entries) => {
            if (!entries) return [];
            return entries.map(entry => {
                let audioUrl = "";
                const links = entry.link;
                if (Array.isArray(links)) {
                    const audioLink = links.find(l => l?.attributes?.type?.includes("audio"));
                    if (audioLink) audioUrl = audioLink.attributes.href;
                }
                const images = entry["im:image"];
                // Get the absolute highest resolution image by replacing the string format
                let largestImage = images ? images[images.length - 1].label : "https://via.placeholder.com/170";
                largestImage = largestImage.replace("170x170", "600x600"); // Hack to get massive HD artwork from iTunes

                return {
                    songName: entry["im:name"]?.label || "Unknown Track",
                    songSingers: entry["im:artist"]?.label || "Unknown Artist",
                    songThumbnail: largestImage,
                    SongUrl: audioUrl,
                    songDuration: "0:30",
                    songMusicDirector: entry.category?.attributes?.label || "Trending Top Chart",
                    id: entry.id?.attributes?.["im:id"]
                };
            }).filter(song => song.SongUrl !== ""); 
        };

        setGlobalTrending(formatSongs(usData?.feed?.entry));
        setIndiaTrending(formatSongs(inData?.feed?.entry));

      } catch (error) {
        console.error("Failed to fetch trending music:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingMusic();
  }, []);

  const handlePlayTrending = (trackList, index) => {
      setSongs(trackList);
      setCurrentSongIndex(index);
      setIsPlaying(true);
  };

  if (isLoading) {
      return (
          <div className="w-full h-[80vh] flex flex-col justify-center items-center">
              <div className="relative">
                  <Spinner />
                  <div className="absolute inset-0 bg-primary blur-3xl opacity-20 animate-pulse"></div>
              </div>
              <p className="mt-6 text-slate-300 font-medium tracking-widest uppercase text-sm animate-pulse">Syncing Worldwide Charts</p>
          </div>
      );
  }

  const activeList = activeTab === "global" ? globalTrending : indiaTrending;
  const topSong = activeList[0];
  const listItems = activeList.slice(1);

  return (
    <>
    <section className='w-full pb-32 pt-4 px-4 md:px-6 relative min-h-screen'>
        
        {/* Page Header & Toggles */}
        <header className='mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-6'>
            <div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-rose-500 to-amber-500 flex items-center gap-3">
                    <FaFire className="text-orange-500" /> Trending Now
                </h1>
                <p className="text-slate-400 mt-2 font-medium">The most played tracks on the internet right now, updated automatically.</p>
            </div>

            {/* Futuristic Tab Switcher */}
            <div className="flex bg-slate-900/80 p-1.5 rounded-2xl border border-white/10 backdrop-blur-xl shadow-2xl relative z-10 w-max">
                <button 
                  onClick={() => setActiveTab("global")}
                  className={`relative px-8 py-3 rounded-xl font-bold text-sm tracking-wider uppercase transition-all duration-300 z-10 flex items-center gap-2 ${activeTab === 'global' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  {activeTab === 'global' && <motion.div layoutId="activeTab" className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.4)] -z-10" />}
                  <BiWorld className="text-lg" /> Global
                </button>
                <button 
                  onClick={() => setActiveTab("india")}
                  className={`relative px-8 py-3 rounded-xl font-bold text-sm tracking-wider uppercase transition-all duration-300 z-10 flex items-center gap-2 ${activeTab === 'india' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  {activeTab === 'india' && <motion.div layoutId="activeTab" className="absolute inset-0 bg-gradient-to-r from-orange-600 to-rose-600 rounded-xl shadow-[0_0_20px_rgba(234,88,12,0.4)] -z-10" />}
                  <span className="font-extrabold text-lg leading-none">I</span> India
                </button>
            </div>
        </header>

        <AnimatePresence mode='wait'>
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col gap-10"
          >
              
              {/* Massive Hero #1 Track */}
              {topSong && (
                <article className="relative w-full rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group h-[400px] md:h-[500px] flex items-end">
                    <img src={topSong.songThumbnail} alt={topSong.songName} className="absolute inset-0 w-full h-full object-cover blur-md scale-110 opacity-40 group-hover:scale-105 transition-transform duration-[2s]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050510] via-[#050510]/80 to-transparent"></div>
                    
                    <div className="relative z-10 p-8 md:p-12 w-full flex flex-col md:flex-row items-center md:items-end gap-10">
                        <div className="relative group-hover:-translate-y-2 transition-transform duration-500">
                            <img src={topSong.songThumbnail} alt={topSong.songName} className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-white/20" />
                            <div className="absolute -top-4 -left-4 bg-gradient-to-br from-amber-400 to-orange-600 w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-2 border-[#050510]">
                                <span className="font-black text-white text-xl">#1</span>
                            </div>
                        </div>

                        <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start">
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 mb-4 w-max">
                                <FaCrown className="text-amber-400" />
                                <span className="text-xs font-bold uppercase tracking-widest text-amber-50">Currently #1</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight mb-2 max-w-2xl line-clamp-2">{topSong.songName}</h2>
                            <p className="text-xl md:text-2xl text-slate-300 font-medium mb-8">{topSong.songSingers}</p>
                            
                            <button 
                                onClick={() => handlePlayTrending(activeList, 0)}
                                className="group/btn flex items-center gap-4 bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-105"
                            >
                                <span className="bg-black/10 group-hover/btn:bg-white/20 text-black group-hover/btn:text-white p-2 rounded-full transition-colors">
                                    <FaPlay className="text-sm ml-1" />
                                </span>
                                Play Trending
                            </button>

                            <button 
                                onClick={() => {
                                    setSelectedSongForPlaylist(topSong);
                                    setIsPlaylistModalOpen(true);
                                }}
                                className="mt-4 flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-bold text-sm tracking-widest uppercase"
                            >
                                <FaPlus className="text-xs" /> Save to Playlist
                            </button>
                        </div>
                    </div>
                </article>
              )}

              {/* Advanced Glassmorphic List #2 through #20 */}
              <article className="w-full">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                     <FaHeadphones className="text-primary" /> The Rest of the Top 20
                  </h3>
                  
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                      {listItems.map((song, idx) => {
                          const realRank = idx + 2; 
                          const isCurrentSong = currentSongIndex === realRank - 1 && songs === activeList;

                          return (
                              <motion.div 
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.05 }}
                                  key={realRank} 
                                  onClick={() => handlePlayTrending(activeList, realRank - 1)}
                                  className={`flex items-center gap-6 p-4 rounded-2xl transition-all duration-300 cursor-pointer group hover:-translate-y-1 ${isCurrentSong ? 'bg-primary/20 border-primary/50 shadow-[0_10px_30px_rgba(139,92,246,0.2)]' : 'bg-slate-800/40 hover:bg-slate-800/80 border-white/5 shadow-xl'} border backdrop-blur-md`}
                              >
                                  <div className="w-12 text-center shrink-0">
                                      <span className={`text-4xl font-black ${realRank <= 3 ? 'text-transparent bg-clip-text bg-gradient-to-br from-slate-200 to-slate-500 drop-shadow-lg' : 'text-slate-500/50'}`}>
                                          {realRank}
                                      </span>
                                  </div>

                                  <div className="relative shrink-0 overflow-hidden rounded-xl h-20 w-20">
                                      <img src={song.songThumbnail} alt={song.songName} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                      <div className={`absolute inset-0 flex items-center justify-center transition-all ${isCurrentSong ? 'bg-black/40 backdrop-blur-sm' : 'bg-black/60 opacity-0 group-hover:opacity-100 backdrop-blur-sm'}`}>
                                          {isCurrentSong && isPlaying ? (
                                              <div className="flex items-end justify-center w-6 h-6 gap-1">
                                                  <div className="w-1.5 bg-white animate-[bounce_0.8s_infinite] h-full shadow-[0_0_10px_white]"></div>
                                                  <div className="w-1.5 bg-white animate-[bounce_0.8s_infinite_0.2s] h-2/3 shadow-[0_0_10px_white]"></div>
                                                  <div className="w-1.5 bg-white animate-[bounce_0.8s_infinite_0.4s] h-4/5 shadow-[0_0_10px_white]"></div>
                                              </div>
                                          ) : (
                                              <FaPlay className="text-white text-xl ml-1 drop-shadow-lg" />
                                          )}
                                      </div>
                                  </div>

                                  <div className="flex-1 min-w-0 pr-4">
                                      <h4 className={`text-lg font-bold truncate tracking-wide ${isCurrentSong ? 'text-primary-light' : 'text-white'}`}>{song.songName}</h4>
                                      <p className="text-sm text-slate-400 truncate mt-1">{song.songSingers}</p>
                                      <div className="mt-2 flex items-center gap-2">
                                          <span className="text-[10px] uppercase tracking-widest border border-white/10 px-2 py-0.5 rounded text-slate-500 bg-white/5">{song.songMusicDirector}</span>
                                      </div>
                                  </div>

                                  <div className="hidden sm:block shrink-0 px-4">
                                      <span className="text-slate-500 font-medium font-mono text-sm">{song.songDuration}</span>
                                  </div>

                                  <button 
                                      onClick={(e) => {
                                          e.stopPropagation();
                                          setSelectedSongForPlaylist(song);
                                          setIsPlaylistModalOpen(true);
                                      }}
                                      className="p-3 text-slate-500 hover:text-primary transition-all hover:scale-125"
                                      title="Add to Playlist"
                                  >
                                      <FaPlus />
                                  </button>
                              </motion.div>
                          );
                      })}
                  </div>
              </article>
              
          </motion.div>
        </AnimatePresence>

    </section>

    <AddToPlaylistModal 
        isOpen={isPlaylistModalOpen} 
        onClose={() => setIsPlaylistModalOpen(false)} 
        song={selectedSongForPlaylist} 
    />
    </>
  )
}

export default Trending;
