import React from 'react'
import { motion } from 'framer-motion'

const ComingSoon = ({ title, description }) => {
  return (
    <section className='w-full h-[80vh] flex flex-col items-center justify-center p-10'>
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className='text-center space-y-6 max-w-lg bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 shadow-[0_20px_50px_rgba(0,0,0,0.3)]'
        >
            <div className='w-24 h-24 mx-auto bg-gradient-to-tr from-indigo-500 to-cyan-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.4)]'>
                {/* Generic construction/rocket icon */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.36c-5.82 0-8.91-5.74-8.91-5.74s2.21 2.37 5.76 2.37A6 6 0 0015.59 11v3.37z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.41 9.63a6 6 0 015.84-7.36c5.82 0 8.91 5.74 8.91 5.74s-2.21-2.37-5.76-2.37A6 6 0 008.41 13V9.63z" />
                </svg>
            </div>
            
            <h1 className='text-4xl font-extrabold text-white tracking-tight'>{title}</h1>
            
            <p className='text-slate-300 leading-relaxed'>
                {description || "This feature is currently being built in our labs and will be released very soon!"}
            </p>
            
            <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary-light border border-primary/30 text-sm font-medium'>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Under Development
            </div>
        </motion.div>
    </section>
  )
}

export default ComingSoon
