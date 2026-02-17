import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';

interface CassetteProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
}

const Cassette: React.FC<CassetteProps> = ({ isPlaying, onTogglePlay }) => {
  // Animation variants for the reels
  const reelTransition = {
    repeat: Infinity,
    ease: "linear" as const,
    duration: 3,
  };

  const reelVariants = {
    playing: { rotate: 360 },
    paused: { rotate: 0 },
  };

  return (
    <div className="relative group w-full max-w-[360px] sm:max-w-[420px] mx-auto perspective-1000">
      <motion.div
        className={`relative w-full aspect-[1.6/1] bg-blue-50 rounded-xl shadow-xl overflow-hidden border border-blue-100/50
          transition-all duration-700 ease-in-out
          ${isPlaying ? 'shadow-[0_0_50px_rgba(59,130,246,0.3)] scale-105' : 'shadow-2xl hover:scale-[1.02]'}
        `}
        style={{
          background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', // Blue-50 to Blue-100
        }}
      >
        {/* Cassette Texture Overlay */}
        <div className="absolute inset-0 opacity-30 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 0)', backgroundSize: '4px 4px' }}></div>
        
        {/* Screws */}
        <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-zinc-300 border border-zinc-400 flex items-center justify-center shadow-inner">
          <div className="w-2 h-0.5 bg-zinc-400 rotate-45"></div>
          <div className="absolute w-2 h-0.5 bg-zinc-400 -rotate-45"></div>
        </div>
        <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-zinc-300 border border-zinc-400 flex items-center justify-center shadow-inner">
          <div className="w-2 h-0.5 bg-zinc-400 rotate-45"></div>
          <div className="absolute w-2 h-0.5 bg-zinc-400 -rotate-45"></div>
        </div>
        <div className="absolute bottom-2 left-2 w-3 h-3 rounded-full bg-zinc-300 border border-zinc-400 flex items-center justify-center shadow-inner">
          <div className="w-2 h-0.5 bg-zinc-400 rotate-45"></div>
          <div className="absolute w-2 h-0.5 bg-zinc-400 -rotate-45"></div>
        </div>
        <div className="absolute bottom-2 right-2 w-3 h-3 rounded-full bg-zinc-300 border border-zinc-400 flex items-center justify-center shadow-inner">
          <div className="w-2 h-0.5 bg-zinc-400 rotate-45"></div>
          <div className="absolute w-2 h-0.5 bg-zinc-400 -rotate-45"></div>
        </div>

        {/* Label Area */}
        <div className="absolute top-[12%] left-[5%] right-[5%] bottom-[12%] bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
          {/* Top Label Stripe */}
          <div className="h-4 bg-blue-400 w-full opacity-80"></div>
          
          {/* Label Content */}
          <div className="flex-1 relative p-2 flex flex-col items-center">
            <h2 className="font-['Inter'] text-xl sm:text-2xl text-blue-900 font-bold tracking-tight mt-2 uppercase">
              NIGHTS
            </h2>
            <p className="font-['Inter'] text-[10px] text-blue-500 tracking-widest uppercase mt-0.5 font-medium">
              Side A &bull; Stereo
            </p>

            {/* Central Window */}
            <div className="relative mt-3 w-[65%] h-[60px] bg-zinc-800 rounded-md border-2 border-zinc-300 shadow-inner overflow-hidden flex items-center justify-center gap-6 sm:gap-10">
              
              {/* Left Reel */}
              <motion.div
                className="w-12 h-12 rounded-full border-4 border-white bg-zinc-900 relative flex items-center justify-center"
                animate={isPlaying ? "playing" : "paused"}
                variants={reelVariants}
                transition={reelTransition}
              >
                {/* Spikes */}
                <div className="absolute w-full h-1 bg-white"></div>
                <div className="absolute w-full h-1 bg-white rotate-60"></div>
                <div className="absolute w-full h-1 bg-white rotate-120"></div>
                {/* Tape volume (simulated) */}
                <div className="absolute w-10 h-10 rounded-full bg-amber-900/50 border border-amber-800/80"></div>
              </motion.div>

              {/* Tape Bridge */}
              <div className="absolute bottom-2 left-[25%] right-[25%] h-8 bg-black opacity-80 z-0 transform skew-x-12"></div>

              {/* Right Reel */}
              <motion.div
                className="w-12 h-12 rounded-full border-4 border-white bg-zinc-900 relative flex items-center justify-center"
                animate={isPlaying ? "playing" : "paused"}
                variants={reelVariants}
                transition={reelTransition}
              >
                 <div className="absolute w-full h-1 bg-white"></div>
                 <div className="absolute w-full h-1 bg-white rotate-60"></div>
                 <div className="absolute w-full h-1 bg-white rotate-120"></div>
                 {/* Tape volume less on right initially */}
                 <div className="absolute w-8 h-8 rounded-full bg-amber-900/50 border border-amber-800/80"></div>
              </motion.div>
            </div>
          </div>
          
           {/* Bottom Label Stripe */}
           <div className="h-4 bg-blue-400 w-full opacity-80"></div>
        </div>

        {/* Bottom Trapezoid (Head area) */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[15%] bg-[#e5e5e5] rounded-t-lg shadow-inner z-10 flex items-center justify-center border-t border-white/50">
          {/* Integrated Play Button */}
          <button
            onClick={onTogglePlay}
            className={`
              flex items-center justify-center gap-2 px-6 py-1.5 rounded-full
              transition-all duration-300 ease-out
              ${isPlaying 
                ? 'bg-blue-100 text-blue-600 shadow-inner' 
                : 'bg-blue-500 text-white shadow-lg hover:bg-blue-600 hover:scale-105'
              }
            `}
          >
            {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
            <span className="font-['Inter'] text-xs font-bold uppercase tracking-wider">
              {isPlaying ? 'Pause' : 'Play'}
            </span>
          </button>
        </div>
      </motion.div>

      {/* Shadow underneath */}
      <div className={`absolute -bottom-8 left-[5%] right-[5%] h-6 bg-black/20 blur-xl rounded-[50%] transition-all duration-700 ${isPlaying ? 'opacity-50 scale-110' : 'opacity-30'}`}></div>
    </div>
  );
};

export default Cassette;