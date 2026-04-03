// import React, { useContext } from 'react'
// import { AlbumContextAPI } from '../../context/AlbumContext'

// const TopAlbums = () => {

//     let {allAlbums}= useContext(AlbumContextAPI);

    
//   return (
//     <section>
//         <article>
//             <header><h1 className='text-[24px] font-semibold'>Top Albums</h1></header>
//             <main className='py-4'>
//                 {allAlbums?.map((album, index)=>{
//                     return <div key={index} className='h-[260px] w-[200px] p-3 bg-slate-800 rounded-md'>
//                         <picture>
//                             <img src={album?.albumPoster} className='h-[200px] w-[180px] ' />
//                         </picture>

//                     </div>
//                 })}
//             </main>
//         </article>
//     </section>
//   )
// }

// export default TopAlbums



import React from 'react'
import { useContext } from 'react'
import { AlbumContextAPI } from '../../context/AlbumContext'
import { NavLink } from 'react-router-dom'
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';

const TopAlbums = () => {
    let {filteredAlbums} = useContext(AlbumContextAPI)
    
  return (
    <section className="w-full">
      <article>
          <motion.header 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
             <h1 className='text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400'>
                Top Albums
             </h1>
          </motion.header>
          <main className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
              {filteredAlbums?.length === 0 ? (
                  <div className="col-span-full py-20 text-center">
                      <p className="text-slate-500 text-lg font-medium">No albums found matching your search.</p>
                      <button 
                        onClick={() => setSearchTerm("")}
                        className="mt-4 text-primary hover:underline font-bold"
                      >
                        Clear search
                      </button>
                  </div>
              ) : (
                  filteredAlbums?.map((album, index) => {
                      return (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05, duration: 0.4 }}
                          className='h-full'
                        >
                          <Tilt 
                            glareEnable={true} 
                            glareMaxOpacity={0.2} 
                            glareColor="#8b5cf6" 
                            glarePosition="all" 
                            scale={1.03} 
                            transitionSpeed={2000} 
                            tiltMaxAngleX={8} 
                            tiltMaxAngleY={8} 
                            className='h-full'
                          >
                            <div className='group relative bg-slate-800/40 backdrop-blur-sm border border-white/5 rounded-xl p-4 transition-colors duration-300 hover:shadow-[0_10px_30px_rgba(139,92,246,0.2)] h-full flex flex-col'>
                               <NavLink to={"/album-details"} state={album} className="block w-full h-full flex flex-col">
                                 <picture className="block relative w-full aspect-square overflow-hidden rounded-lg shadow-lg mb-4 flex-shrink-0">
                                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                                        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 text-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ml-1">
                                              <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                    <img src={album?.albumPoster} className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110' alt={album?.albumTitle}></img>
                                 </picture>
                                 <div className='flex flex-col flex-grow justify-between'>
                                   <h3 className='text-lg font-bold text-white truncate transition-colors group-hover:text-primary-light'>
                                      {album?.albumTitle}
                                   </h3>
                                   <p className="text-sm text-slate-400 truncate mt-1">
                                      {album?.albumLanguages} • {album?.albumReleaseDate}
                                   </p>
                                 </div>
                               </NavLink>
                            </div>
                          </Tilt>
                        </motion.div>
                      )
                  })
              )}
          </main>
      </article>
    </section>
  )
}

export default TopAlbums