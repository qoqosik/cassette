import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CONFESSION_PAGES, FINAL_GIF_URL } from '../constants';

interface LoveLetterProps {
  isVisible: boolean;
}

const LoveLetter: React.FC<LoveLetterProps> = ({ isVisible }) => {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);

  if (!isVisible) return null;

  const paginate = (newDirection: number) => {
    const newPage = page + newDirection;
    if (newPage >= 0 && newPage < CONFESSION_PAGES.length) {
      setDirection(newDirection);
      setPage(newPage);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 20 : -20,
      opacity: 0,
      filter: 'blur(5px)'
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      filter: 'blur(0px)'
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 20 : -20,
      opacity: 0,
      filter: 'blur(5px)'
    })
  };

  const isLastPage = page === CONFESSION_PAGES.length - 1;

  return (
    <div className="max-w-3xl mx-auto mt-8 sm:mt-12 px-2 pb-20 relative min-h-[400px]">
      
      {/* Navigation Layer */}
      <div className="absolute inset-y-0 left-0 right-0 pointer-events-none flex items-center justify-between z-30 px-2 sm:px-0">
        {/* Left Arrow */}
        <div className="pointer-events-auto">
          {page > 0 && (
            <button
              onClick={() => paginate(-1)}
              className="p-2 rounded-full hover:bg-blue-100/50 text-blue-800/60 hover:text-blue-900 transition-all duration-300 transform hover:scale-110"
              aria-label="Previous page"
            >
              <ChevronLeft size={32} strokeWidth={1.5} />
            </button>
          )}
        </div>

        {/* Right Arrow */}
        <div className="pointer-events-auto">
          {page < CONFESSION_PAGES.length - 1 && (
            <button
              onClick={() => paginate(1)}
              className="p-2 rounded-full hover:bg-blue-100/50 text-blue-800/60 hover:text-blue-900 transition-all duration-300 transform hover:scale-110"
              aria-label="Next page"
            >
              <ChevronRight size={32} strokeWidth={1.5} />
            </button>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="px-8 sm:px-16 text-center sm:text-left overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.6 },
              filter: { duration: 0.4 }
            }}
            className="space-y-6 sm:space-y-8"
          >
            {CONFESSION_PAGES[page].map((paragraph, index) => (
              <motion.p
                key={`${page}-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  // Stagger slightly faster for subsequent pages to keep flow active
                  delay: index * (page === 0 ? 1.5 : 0.8), 
                  ease: "easeOut"
                }}
                className={`
                  text-lg sm:text-xl leading-relaxed
                  ${index % 2 === 0 ? 'text-blue-950' : 'text-blue-800'}
                  font-['Inter'] font-normal tracking-wide
                `}
                dangerouslySetInnerHTML={{ __html: paragraph.replace(/\n/g, '<br/>') }}
              />
            ))}

            {/* Render GIF only on the last page */}
            {isLastPage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 1.2, 
                  // Calculate delay based on number of paragraphs to appear after text
                  delay: CONFESSION_PAGES[page].length * 0.8 + 0.5,
                  ease: "easeOut" 
                }}
                className="flex justify-center pt-6 pb-4"
              >
                <img 
                  src={FINAL_GIF_URL} 
                  alt="Us" 
                  className="rounded-xl shadow-lg border-4 border-white/50 w-full max-w-[300px] sm:max-w-[350px]"
                />
              </motion.div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LoveLetter;