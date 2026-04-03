import React, { useContext } from 'react';
import { AlbumContextAPI } from '../../context/AlbumContext';
import { FiSearch } from 'react-icons/fi';
import { motion } from 'framer-motion';

const GlobalSearch = () => {
    const { searchTerm, setSearchTerm } = useContext(AlbumContextAPI);

    return (
        <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-grow max-w-md mx-2 sm:mx-6"
        >
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className="text-slate-500 group-focus-within:text-primary transition-colors duration-300" />
                </div>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for albums, artists, or languages..."
                    className="block w-full pl-10 pr-4 py-2 bg-slate-800/40 backdrop-blur-md border border-white/5 rounded-2xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-300 hover:bg-slate-800/60"
                />
                
                {searchTerm && (
                    <button 
                        onClick={() => setSearchTerm("")}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-white transition-colors"
                    >
                        &times;
                    </button>
                )}

                {/* Subtle Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 -z-10"></div>
            </div>
        </motion.div>
    );
};

export default GlobalSearch;
