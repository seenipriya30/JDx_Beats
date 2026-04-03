import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPlus, FaMusic } from 'react-icons/fa';
import { UserContextAPI } from '../context/UserContext';
import { AuthContextAPI } from '../context/AuthContext';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { __DB } from '../backend/firebase';
import toast from 'react-hot-toast';

const AddToPlaylistModal = ({ isOpen, onClose, song }) => {
    const { userDataFromDB } = useContext(UserContextAPI);
    const { authUser } = useContext(AuthContextAPI);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const userPlaylists = userDataFromDB?.playlists || [];

    const handleAddToPlaylist = async (playlistId) => {
        if (!authUser || !song) return;
        
        setIsSubmitting(true);
        try {
            const userRef = doc(__DB, "user_profile", authUser.uid);
            const userSnap = await getDoc(userRef);
            
            if (userSnap.exists()) {
                const data = userSnap.data();
                const updatedPlaylists = (data.playlists || []).map(pl => {
                    if (pl.id === playlistId) {
                        // Avoid duplicates
                        const songExists = pl.tracks?.some(t => t.songName === song.songName);
                        if (songExists) {
                            toast.error(`"${song.songName}" is already in this playlist!`);
                            return pl;
                        }
                        return {
                            ...pl,
                            tracks: [...(pl.tracks || []), song]
                        };
                    }
                    return pl;
                });

                await setDoc(userRef, { playlists: updatedPlaylists }, { merge: true });
                toast.success(`"${song.songName}" added to playlist!`);
                onClose();
            }
        } catch (error) {
            console.error("Error adding to playlist:", error);
            toast.error("Failed to add song.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
                >
                    <motion.div 
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        className="w-full max-w-md bg-slate-900 border border-white/10 shadow-[0_0_100px_rgba(0,0,0,1)] rounded-3xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-slate-800/50">
                            <div>
                                <h3 className="text-xl font-bold text-white">Add to Playlist</h3>
                                <p className="text-xs text-slate-400 mt-1 truncate max-w-[250px]">{song?.songName}</p>
                            </div>
                            <button onClick={onClose} className="text-slate-400 hover:text-white bg-white/5 hover:bg-white/20 p-2 rounded-full transition-colors">
                                <FaTimes />
                            </button>
                        </div>

                        {/* List */}
                        <div className="p-4 max-h-[400px] overflow-y-auto custom-scrollbar">
                            {userPlaylists.length === 0 ? (
                                <div className="p-8 text-center">
                                    <FaMusic className="text-4xl text-slate-700 mx-auto mb-4" />
                                    <p className="text-slate-400">You don't have any playlists yet.</p>
                                    <p className="text-xs text-slate-500 mt-2">Go to the Playlists page to create one!</p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {userPlaylists.map(pl => (
                                        <button 
                                            key={pl.id}
                                            disabled={isSubmitting}
                                            onClick={() => handleAddToPlaylist(pl.id)}
                                            className="w-full flex items-center gap-4 p-3 rounded-2xl bg-white/5 hover:bg-primary/20 border border-white/5 hover:border-primary/30 transition-all text-left group"
                                        >
                                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pl.gradient} flex items-center justify-center shadow-lg shrink-0`}>
                                                <FaMusic className="text-white/40 group-hover:text-white transition-colors" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-white font-bold tracking-wide">{pl.name}</h4>
                                                <p className="text-xs text-slate-400">{pl.tracks?.length || 0} Tracks</p>
                                            </div>
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 p-2 rounded-full">
                                                <FaPlus className="text-xs text-white" />
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AddToPlaylistModal;
