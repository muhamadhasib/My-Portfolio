import { motion } from "framer-motion";
import { useState, useRef } from "react";

export function Avatar3D() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      setMousePosition({
        x: ((e.clientX - centerX) / rect.width) * 15,
        y: ((e.clientY - centerY) / rect.height) * 15,
      });
    }
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={containerRef}
      className="relative avatar-mobile-size fold:avatar-desktop-size lg:avatar-desktop-size flex items-center justify-center overflow-visible"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onHoverStart={() => setIsHovered(true)}
      animate={{
        y: [0, -10, 0],
        rotateY: mousePosition.x,
        rotateX: -mousePosition.y,
        scale: isHovered ? 1.05 : 1,
      }}
      transition={{
        y: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        },
        rotateY: {
          type: "spring",
          stiffness: 80,
          damping: 25,
        },
        rotateX: {
          type: "spring", 
          stiffness: 80,
          damping: 25,
        },
        scale: {
          duration: 0.3,
        }
      }}
    >
      {/* Main Avatar Container with Breathing Effect */}
      <motion.div
        className="relative w-full h-full rounded-full overflow-visible"
        animate={{
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Gradient Border Ring */}
        <motion.div
          className="absolute w-full h-full rounded-full p-1 overflow-visible"
          style={{
            background: `conic-gradient(
              from 0deg,
              hsl(270, 85%, 60%) 0%,
              hsl(188, 95%, 44%) 25%,
              hsl(328, 85%, 70%) 50%,
              hsl(214, 95%, 58%) 75%,
              hsl(270, 85%, 60%) 100%
            )`,
          }}
          animate={{ 
            scale: isHovered ? [1, 1.05, 1] : 1,
          }}
          transition={{
            scale: {
              duration: 2,
              repeat: isHovered ? Infinity : 0,
              ease: "easeInOut",
            }
          }}
        >
          {/* Inner Container */}
          <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center relative overflow-hidden">
            
            {/* Dynamic Profile Image */}
            <motion.div 
              className="w-full h-full rounded-full bg-cover bg-center bg-no-repeat relative overflow-hidden"
              style={{
                backgroundImage: `url("/assets/images/profile.jpg")`,
              }}
              animate={{
                backgroundSize: isHovered ? "110%" : "100%",
              }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
              }}
            />
            



          </div>
        </motion.div>
      </motion.div>

    </motion.div>
  );
}