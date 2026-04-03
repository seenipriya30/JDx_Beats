import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { FaPlus, FaPlay, FaMusic, FaListUl, FaFire, FaTimes } from 'react-icons/fa';
import { BsStars } from 'react-icons/bs';
import { UserContextAPI } from '../context/UserContext';
import { AuthContextAPI } from '../context/AuthContext';
import { doc, setDoc, arrayUnion } from 'firebase/firestore';
import { __DB } from '../backend/firebase';
import { AudioPlayerContextAPI } from '../context/AudioPlayerContext';
import toast from 'react-hot-toast';

// Some cool dummy curated playlists
const CURATED_PLAYLISTS = [
  {
    id: 'p1',
    name: 'Cyberpunk Focus',
    description: 'High octane dark synthwave to keep you in the zone.',
    image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=800&auto=format&fit=crop',
    color: 'from-fuchsia-600 to-purple-900',
    tracks: [] // Dummy empty
  },
  {
    id: 'p2',
    name: 'Midnight Drive',
    description: 'Lofi hip hop and chill beats for late night cruising.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop',
    color: 'from-blue-600 to-indigo-900',
    tracks: []
  },
  {
    id: 'p3',
    name: 'Neon Nostalgia',
    description: '80s retro wave hits that never get old.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    color: 'from-rose-500 to-orange-700',
    tracks: []
  }
];

// Beautiful random gradients for User created playlists
const GRADIENTS = [
    "from-teal-400 to-emerald-700",
    "from-pink-500 to-rose-800",
    "from-indigo-400 to-cyan-700",
    "from-amber-400 to-orange-700",
    "from-violet-500 to-purple-800"
];

const Playlists = () => {
    const { userDataFromDB } = useContext(UserContextAPI);
    const { authUser } = useContext(AuthContextAPI);
    const { setSongs, setCurrentSongIndex, setIsPlaying } = useContext(AudioPlayerContextAPI);

    const [isCreating, setIsCreating] = useState(false);
    const [newPlaylistName, setNewPlaylistName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const userPlaylists = userDataFromDB?.playlists || [];

    const handleCreatePlaylist = async (e) => {
        e.preventDefault();
        
        if (!newPlaylistName.trim()) return;
        
        if (!authUser) {
            toast.error("Login required to create playlists!");
            return;
        }

        setIsSubmitting(true);
        try {
            const userRef = doc(__DB, "user_profile", authUser.uid);
            
            const randomGradient = GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)];

            const newPlaylist = {
                id: Date.now().toString(),
                name: newPlaylistName,
                createdAt: new Date().toISOString(),
                gradient: randomGradient,
                tracks: []
            };

            // Using setDoc with merge: true is safer than updateDoc if the document might not exist yet
            await setDoc(userRef, { 
                playlists: arrayUnion(newPlaylist) 
            }, { merge: true });

            toast.success(`Playlist "${newPlaylistName}" created!`);
            setNewPlaylistName("");
            setIsCreating(false);
        } catch (error) {
            console.error("Error creating playlist:", error);
            toast.error("Failed to create playlist. Check console.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const playList = (playlist) => {
        if (!playlist?.tracks || playlist.tracks.length === 0) {
            alert("This playlist has no tracks yet!");
            return;
        }
        setSongs(playlist.tracks);
        setCurrentSongIndex(0);
        setIsPlaying(true);
    };

    return (
        <section className='w-full pb-32 pt-4 px-4 md:px-6 relative min-h-screen overflow-hidden'>
            
            {/* Ambient Page Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

            {/* Header */}
            <header className='mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6'>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white flex items-center gap-3">
                        <BsStars className="text-indigo-400" /> Discover & Mix
                    </h1>
                    <p className="text-slate-400 mt-2 font-medium">Explore curated hubs or construct your ultimate personal libraries.</p>
                </motion.div>

                <motion.button 
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
                    onClick={() => setIsCreating(true)}
                    className="group relative flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3.5 rounded-2xl font-bold shadow-[0_10px_30px_rgba(79,70,229,0.3)] hover:shadow-[0_10px_40px_rgba(79,70,229,0.5)] transform hover:-translate-y-1 transition-all overflow-hidden"
                >
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <div className="bg-white/20 p-1.5 rounded-full">
                        <FaPlus className="text-sm" />
                    </div>
                    New Playlist
                </motion.button>
            </header>

            {/* Curated Heroes */}
            <div className="mb-14">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <FaFire className="text-orange-500" /> Featured Curation
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {CURATED_PLAYLISTS.map((playlist, idx) => (
                        <Tilt key={playlist.id} tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} transitionSpeed={2500} className="h-full">
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="relative rounded-3xl overflow-hidden group h-[280px] shadow-2xl cursor-pointer"
                                onClick={() => playList(playlist)}
                            >
                                <img src={playlist.image} alt={playlist.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                <div className={`absolute inset-0 bg-gradient-to-t ${playlist.color} opacity-80 mix-blend-multiply transition-opacity group-hover:opacity-60`}></div>
                                
                                <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                                    <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 border border-white/20 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                                        <FaPlay className="text-white ml-1" />
                                    </div>
                                    <h3 className="text-2xl font-black text-white tracking-wide mb-1">{playlist.name}</h3>
                                    <p className="text-slate-300 text-sm line-clamp-2">{playlist.description}</p>
                                </div>
                            </motion.div>
                        </Tilt>
                    ))}
                </div>
            </div>

            {/* User Library Array */}
            <div>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <FaListUl className="text-teal-400" /> Your Library
                </h2>

                {userPlaylists.length === 0 ? (
                    <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-3xl p-12 text-center shadow-xl">
                        <div className="w-20 h-20 mx-auto bg-slate-800 rounded-full flex items-center justify-center shadow-inner mb-6">
                            <FaMusic className="text-3xl text-slate-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">It's a little quiet here.</h3>
                        <p className="text-slate-400">Create your first custom playlist to start organizing your favorite tracks.</p>
                        <button 
                            onClick={() => setIsCreating(true)}
                            className="mt-6 text-indigo-400 hover:text-indigo-300 font-bold tracking-wide uppercase text-sm border border-indigo-500/30 px-6 py-2 rounded-full hover:bg-indigo-500/10 transition-colors"
                        >
                            Create One Now
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-6">
                        {userPlaylists.map((pl, idx) => (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                key={pl.id}
                                onClick={() => playList(pl)}
                                className="group cursor-pointer"
                            >
                                <div className={`w-full aspect-square bg-gradient-to-br ${pl.gradient} rounded-2xl shadow-lg border border-white/10 relative overflow-hidden mb-3 transform transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)]`}>
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <FaMusic className="text-5xl text-white/30 group-hover:text-white/50 transition-colors group-hover:scale-110 duration-500" />
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 backdrop-blur-sm transition-all duration-300">
                                        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-[0_0_30px_white]">
                                            <FaPlay className="text-black text-xl ml-1" />
                                        </div>
                                    </div>
                                </div>
                                <h4 className="text-white font-bold tracking-wide text-lg group-hover:text-primary transition-colors truncate">{pl.name}</h4>
                                <p className="text-slate-400 text-sm">{pl.tracks?.length || 0} Tracks</p>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Create Modal Overlay */}
            <AnimatePresence>
                {isCreating && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="w-full max-w-md bg-slate-900 border border-white/10 shadow-[0_0_100px_rgba(0,0,0,1)] rounded-3xl overflow-hidden relative"
                        >
                            {/* Modal Header */}
                            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-slate-800/50">
                                <h3 className="text-2xl font-bold text-white">Create Playlist</h3>
                                <button onClick={() => setIsCreating(false)} className="text-slate-400 hover:text-white bg-white/5 hover:bg-white/20 p-2 rounded-full transition-colors">
                                    <FaTimes />
                                </button>
                            </div>
                            
                            {/* Modal Body */}
                            <form onSubmit={handleCreatePlaylist} className="p-6 pb-8">
                                <div className="mb-8">
                                    <label className="block text-slate-400 text-sm font-bold uppercase tracking-wider mb-3">Playlist Name</label>
                                    <input 
                                        type="text" 
                                        autoFocus
                                        value={newPlaylistName}
                                        onChange={(e) => setNewPlaylistName(e.target.value)}
                                        placeholder="e.g. Code Focus 2026"
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white text-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
                                    />
                                </div>
                                <button 
                                    type="submit"
                                    disabled={!newPlaylistName.trim() || isSubmitting}
                                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    {isSubmitting ? 'Creating...' : 'Create Library'}
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            
        </section>
    );
};

export default Playlists;
