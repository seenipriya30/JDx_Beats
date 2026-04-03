// import NavbarContainer from "../Components/NavbarComponents/NavbarContainer"
// import AlbumSidebar from "../Components/AlbumComponents/AlbumSidebar"
// import { Outlet } from "react-router-dom"

// let Layout = () => {
//     return <section className="w-[100%] min-h-[100vh] bg-slate-900">
//       <header>
//       <NavbarContainer/>
//       </header>
//       <main className="flex min-h-[calc(100vh-71px)]">
//         <aside className="w-[16%] h-[calc(100vh-71px)] bg-slate-700"><AlbumSidebar/></aside>
//         <aside className="w-[84%] min-h-[clac(100vh-71px)]  p-6"><Outlet/></aside>
//       </main>
//     </section>
//   }
  
//   export default Layout


import NavbarContainer from '../Components/NavbarComponents/NavbarContainer'
import { Outlet, useLocation } from 'react-router-dom'
import AlbumSidebar from '../Components/AlbumComponents/AlbumSidebar'
import { useContext } from 'react'
import { AudioPlayerContextAPI } from '../context/AudioPlayerContext'
import CustomAudioPlayer from 'react-pro-audio-player';
import { motion, AnimatePresence } from 'framer-motion';
import SimulatedWaveform from '../Components/SimulatedWaveform';

const Layout = () => {

  let {songs, setSongs, currentSongIndex, setIsPlaying, isPlaying, setCurrentSongIndex} = useContext(AudioPlayerContextAPI);
  const location = useLocation();

  // Get currently playing song thumbnail for ambient background
  const currentThumbnail = songs && currentSongIndex !== null ? songs[currentSongIndex]?.songThumbnail : null;

  return (
  <section className={`w-[100%] min-h-[100vh] text-slate-100 flex flex-col relative overflow-hidden transition-colors duration-1000 ${currentThumbnail ? 'bg-[#050510]' : 'bg-gradient-to-br from-slate-900 via-[#0f172a] to-slate-950'}`}>

    {/* Ambient Living Background */}
    <AnimatePresence>
      {currentThumbnail && (
        <motion.div 
          key={currentThumbnail}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
        >
          <motion.div
            animate={{
              scale: [1.2, 1.4, 1.2],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="w-full h-full"
          >
             <img src={currentThumbnail} alt="Ambient Background" className="w-[150vw] h-[150vh] object-cover -ml-[25vw] -mt-[25vh] blur-[120px] saturate-200 opacity-60" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

    {/* Global Dark Overlay to ensure readability regardless of background */}
    {currentThumbnail && <div className="absolute inset-0 bg-black/40 pointer-events-none z-0"></div>}

    <header className='sticky top-0 shadow-[0_4px_30px_rgba(0,0,0,0.5)] z-50 bg-[#0f172a]/70 backdrop-blur-md border-b border-white/10'>
      <NavbarContainer/>
    </header> 

    <main className='flex flex-1 z-10'> 
      <aside className='sticky top-[71px] w-[200px] lg:w-[240px] h-[calc(100vh-71px)] bg-slate-800/30 backdrop-blur-xl border-r border-white/5 transition-all duration-300'>
        <AlbumSidebar/>
      </aside>
      <aside className={`flex-1 w-full min-h-[calc(100vh-71px)] p-6 md:p-8 lg:p-10 relative ${currentSongIndex !== null ? 'pb-32' : ''}`}>
        <AnimatePresence mode='wait'>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full relative z-20"
          >
            <Outlet/>
          </motion.div>
        </AnimatePresence>
      </aside>
    </main>    

    {/* Persistent Global Player */}
    {currentSongIndex !== null && (
        <section className='fixed bottom-0 left-0 right-0 z-[100] border-t border-white/10 bg-slate-900/80 backdrop-blur-2xl shadow-[0_-15px_40px_rgba(0,0,0,0.5)] transition-all duration-500 hover:bg-slate-900/90'>
            <SimulatedWaveform isPlaying={isPlaying} />
            <div className="relative z-10 block pb-1">
              <CustomAudioPlayer
                songs={songs}
                isPlaying={isPlaying}
                currentSongIndex={currentSongIndex}
                onPlayPauseChange={setIsPlaying}
                onSongChange={setCurrentSongIndex}
                songUrlKey="SongUrl"
                songNameKey="songName"
                songThumbnailKey="songThumbnail" 
                songSingerKey="songSingers"
              />
            </div>
        </section>
    )}

  </section>
  )
}

export default Layout