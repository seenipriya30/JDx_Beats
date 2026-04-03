import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { FaMicrophone, FaTwitter, FaInstagram, FaGlobe, FaChevronRight } from 'react-icons/fa';
import { IoMusicalNotes } from 'react-icons/io5';

const ARTISTS = [
  {
    id: 1,
    name: "A.R. Rahman",
    nickname: "Mozart of Madras",
    bio: "A global icon and two-time Academy Award winner. Rahman revolutionized Indian music with his debut in 'Roja' (1992), blending Eastern classical music with electronic sounds and world music. He has won two Grammys, a BAFTA, and a Golden Globe, and was honored with the Padma Bhushan in 2010.",
    image: "https://i.scdn.co/image/ab6761610000e5ebb19af0ea736c6228d6eb539c",
    genre: "Sufi, Classical, Electronic",
    popular: "Jai Ho, Roja Janeman"
  },
  {
    id: 2,
    name: "Anirudh Ravichander",
    nickname: "Rockstar",
    bio: "The youngest sensation of Tamil cinema. Anirudh debuted with the global viral hit 'Why This Kolaveri Di' in 2012. Since then, he has become the most sought-after composer for 'mass' entertainers, including masterpieces like 'Master', 'Vikram', and 'Jawan'.",
    image: "https://i.scdn.co/image/ab6761610000e5eb0f0be2054fe9594026a6b843",
    genre: "EDM, Pop, Rock",
    popular: "Arabic Kuthu, Vaathi Coming"
  },
  {
    id: 3,
    name: "Ilaiyaraaja",
    nickname: "Isaignani",
    bio: "The Maestro of Indian Film Music. With a career spanning over 45 years and 7,000+ songs, he is a living legend known for his symphonic arrangements. A recipient of the Padma Vibhushan (2018), his work remains the gold standard for orchestral film scores.",
    image: "https://i.scdn.co/image/ab6761610000e5ebec891c36864eb59b28f65cf8",
    genre: "Classical, Folk, Orchestral",
    popular: "Thendral Vandhu, Sundari"
  },
  {
    id: 4,
    name: "Yuvan Shankar Raja",
    nickname: "BGM King",
    bio: "Pioneer of Hip-hop and Remix culture in South India. Known for his soul-stirring background scores and trendsetting compositions, Yuvan became the youngest composer to win a Filmfare Award for '7G Rainbow Colony'.",
    image: "https://i.scdn.co/image/ab6761610000e5ebe60d7a790ebea50d205bda93",
    genre: "Hip-Hop, Lo-fi, Melancholy",
    popular: "Loosu Penne, Rowdy Baby"
  },
  {
    id: 5,
    name: "Santhosh Narayanan",
    nickname: "SaNa",
    bio: "An experimental visionary known for bringing raw acoustic and folk sounds back to the mainstream. His soundtracks for 'Kabali' and 'Pariyerum Perumal' are iconic. He is currently composing the score for the sci-fi epic 'Kalki 2898 AD'.",
    image: "https://i.scdn.co/image/ab6761610000e5eba52538772891f66547e1ebc3",
    genre: "Experimental, Folk, Blues",
    popular: "Neruppu Da, Enjoy Enjaami"
  },
  {
    id: 6,
    name: "Harris Jayaraj",
    nickname: "The Melody King",
    bio: "A former keyboardist for A.R. Rahman, Harris Jayaraj debuted with 'Minnale' in 2001. He is celebrated for his unique synth-driven melodies and ultra-catchy production style that dominated the 2000s.",
    image: "https://i.scdn.co/image/ab6761610000e5eb1263a7722e01be16b21ab944",
    genre: "Techno-Pop, Romantic",
    popular: "Vaseegara, Mundhinam Paartheney"
  },
  {
    id: 7,
    name: "Sid Sriram",
    nickname: "Soul Stirrer",
    bio: "An Indian-American Carnatic musician whose breakthrough came with 'Adiye'. His signature R&B-infused vocal style and impeccable command over soul music have made him the most dominant playback singer in current Tamil cinema.",
    image: "https://i.scdn.co/image/ab6761610000e5ebef6a8800763bf428e85940a6",
    genre: "Carnatic, R&B, Soul",
    popular: "Kannaana Kanney, Maruvaarthai"
  },
  {
    id: 8,
    name: "Shreya Ghoshal",
    nickname: "Melody Queen",
    bio: "One of the most decorated singers in India with five National Film Awards. Her perfect Tamil diction and emotional range have allowed her to dominate the Tamil industry across decades of hits with every major composer.",
    image: "https://i.scdn.co/image/ab6761610000e5ebe7ce89a9f5d11e0ba26677eb",
    genre: "Classical, Filmi",
    popular: "Munbe Vaa, Mannipaaya"
  },
  {
    id: 9,
    name: "G.V. Prakash Kumar",
    nickname: "The Versatile",
    bio: "A prolific composer, singer, and actor who started as an assistant to ARR. He is known for his deeply ethnic and rural melodies in films like 'Veyil' and 'Aadukalam', winning a National Award for 'Soorarai Pottru'.",
    image: "https://i.scdn.co/image/ab6761610000e5eb0a5c692089af5c0f9cf839f3",
    genre: "Ethnic, Alternative, Folk",
    popular: "Pookkalae Sattru, Vizhigalil Arugil"
  },
  {
    id: 10,
    name: "D. Imman",
    nickname: "Rooted Maestro",
    bio: "Specializes in rural and commercial folk music with deep emotional resonance. He won the National Film Award for Best Music Direction for 'Viswasam' (2019) and has composed for over 100 films.",
    image: "https://i.scdn.co/image/ab6761610000e5eb859ef7414772b7d07526d40a",
    genre: "Folk, Commercial Filmi",
    popular: "Kannaana Kanney, Kurumba"
  }
];

const Artists = () => {
  const [selectedArtist, setSelectedArtist] = useState(null);

  return (
    <section className="w-full pb-32 pt-4 px-4 md:px-6 relative min-h-screen overflow-hidden">
      
      {/* Dynamic Aura */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[150px] -z-10 animate-pulse"></div>
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-fuchsia-600/10 rounded-full blur-[150px] -z-10 animate-pulse delay-1000"></div>

      <header className="mb-12">
        <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
            <div>
                <h1 className="text-4xl md:text-6xl font-black text-white flex items-center gap-4">
                   <FaMicrophone className="text-primary text-3xl md:text-5xl" /> The Masters
                </h1>
                <p className="text-slate-400 mt-3 text-lg font-medium max-w-2xl">
                    Discover the architects of the Tamil soundscape. From legends who defined generations to the rockstars of today.
                </p>
            </div>
        </motion.div>
      </header>

      {/* Artists Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
        {ARTISTS.map((artist, index) => (
          <Tilt 
            key={artist.id} 
            tiltMaxAngleX={10} 
            tiltMaxAngleY={10} 
            perspective={1000} 
            scale={1.05}
            transitionSpeed={1500}
            className="h-full"
          >
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedArtist(artist)}
                className="group relative cursor-pointer h-[380px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900"
            >
                {/* Image Layer */}
                <div className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110">
                    <img src={artist.image} alt={artist.name} className="w-full h-full object-cover" />
                </div>

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050510] via-[#050510]/60 to-transparent opacity-90 group-hover:opacity-70 transition-opacity"></div>
                
                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <motion.span 
                        className="text-[10px] uppercase tracking-[0.2em] font-black text-primary-light mb-1 block opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        {artist.nickname}
                    </motion.span>
                    <h3 className="text-2xl font-black text-white mb-2 leading-none">{artist.name}</h3>
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-bold mb-4">
                        <IoMusicalNotes className="text-primary" />
                        {artist.genre}
                    </div>

                    <div className="flex items-center justify-between transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                         <span className="text-[11px] text-slate-300 font-medium">Explore Profile</span>
                         <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                            <FaChevronRight className="text-[10px] text-white" />
                         </div>
                    </div>
                </div>
            </motion.div>
          </Tilt>
        ))}
      </div>

      {/* Artist Details Splash Modal */}
      <AnimatePresence>
        {selectedArtist && (
             <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/90 backdrop-blur-3xl"
             >
                <motion.div 
                    initial={{ scale: 0.9, y: 50, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.9, y: 50, opacity: 0 }}
                    className="w-full max-w-5xl bg-slate-900 border border-white/10 rounded-[40px] overflow-hidden relative shadow-[0_0_100px_rgba(0,0,0,1)]"
                >
                    <button 
                        onClick={() => setSelectedArtist(null)}
                        className="absolute top-8 right-8 z-50 bg-white/5 hover:bg-white text-white hover:text-black p-4 rounded-full transition-all border border-white/10 text-xl"
                    >
                        &times;
                    </button>

                    <div className="flex flex-col lg:flex-row h-full">
                        {/* Visuals */}
                        <div className="w-full lg:w-1/2 h-64 lg:h-[600px] relative overflow-hidden">
                            <img src={selectedArtist.image} alt={selectedArtist.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-transparent to-transparent hidden lg:block"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent lg:hidden"></div>
                        </div>

                        {/* Text Info */}
                        <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                            <span className="text-primary-light font-black tracking-widest uppercase text-sm mb-2">{selectedArtist.nickname}</span>
                            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter italic">{selectedArtist.name}</h2>
                            
                            <p className="text-slate-400 text-lg leading-relaxed mb-8 font-medium">
                                {selectedArtist.bio}
                            </p>

                            <div className="grid grid-cols-2 gap-8 mb-10">
                                <div>
                                    <h4 className="text-[10px] uppercase tracking-widest text-slate-500 font-black mb-1">Signature Sound</h4>
                                    <p className="text-white font-bold">{selectedArtist.genre}</p>
                                </div>
                                <div>
                                    <h4 className="text-[10px] uppercase tracking-widest text-slate-500 font-black mb-1">Essential Listening</h4>
                                    <p className="text-white font-bold">{selectedArtist.popular}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <button className="bg-white text-black px-8 py-3 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-primary hover:text-white transition-all shadow-xl">
                                    View discography
                                </button>
                                <div className="flex gap-4 ml-4">
                                    <FaInstagram className="text-slate-400 hover:text-white cursor-pointer text-xl" />
                                    <FaTwitter className="text-slate-400 hover:text-white cursor-pointer text-xl" />
                                    <FaGlobe className="text-slate-400 hover:text-white cursor-pointer text-xl" />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
             </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Artists;
