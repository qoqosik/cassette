import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Heart {
  id: number;
  x: number;
  scale: number;
  duration: number;
  delay: number;
}

const FloatingHearts: React.FC<{ active: boolean }> = ({ active }) => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    if (!active) {
      setHearts([]);
      return;
    }

    // Generate hearts periodically
    const interval = setInterval(() => {
      const newHeart: Heart = {
        id: Date.now(),
        x: Math.random() * 100, // percentage
        scale: 0.5 + Math.random() * 1,
        duration: 4 + Math.random() * 5,
        delay: 0,
      };

      setHearts((prev) => [...prev, newHeart]);

      // Cleanup old hearts to prevent memory leaks
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
      }, (newHeart.duration + 1) * 1000);

    }, 800);

    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ y: -100, x: `${heart.x}vw`, opacity: 0, scale: 0 }}
            animate={{
              y: '110vh',
              opacity: [0, 1, 1, 0],
              scale: heart.scale,
              rotate: [0, 45, -45, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: heart.duration,
              ease: "linear",
              delay: heart.delay,
            }}
            // Changed to a very soft blue
            className="absolute text-blue-200/50 drop-shadow-sm"
            style={{ fontSize: '2rem' }}
          >
            ❤
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FloatingHearts;