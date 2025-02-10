import { motion } from 'framer-motion';

const Logo = () => {
  return (
    <motion.svg
      width="64"
      height="64"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transform"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.8
      }}
      variants={{
        hover: {
          scale: 1.05,
          rotate: 180,
          transition: { 
            duration: 0.8,
            ease: "easeInOut"
          }
        }
      }}
    >
      {/* Base hexagon with smooth edges */}
      <motion.path
        d="M20 7C21.2 7 22.3 7.4 23.1 8L28.8 11.6C29.6 12.1 30 12.9 30 13.8V24.2C30 25.1 29.6 25.9 28.8 26.4L23.1 30C22.3 30.6 21.2 31 20 31C18.8 31 17.7 30.6 16.9 30L11.2 26.4C10.4 25.9 10 25.1 10 24.2V13.8C10 12.9 10.4 12.1 11.2 11.6L16.9 8C17.7 7.4 18.8 7 20 7Z"
        className="stroke-gray-900 dark:stroke-white"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        variants={{
          hover: {
            scale: 1.1,
            transition: { duration: 0.4 }
          }
        }}
      />

      {/* Orbiting elements */}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          rotate: 360
        }}
        transition={{
          scale: { duration: 0.5, delay: 0.8 },
          opacity: { duration: 0.5, delay: 0.8 },
          rotate: {
            duration: 20,
            repeat: Infinity,
            ease: "linear",
            delay: 1
          }
        }}
        style={{ transformOrigin: "20px 20px" }}
        variants={{
          hover: {
            rotate: 720,
            transition: { duration: 2 }
          }
        }}
      >
        {/* Three orbiting circles */}
        <motion.circle
          cx="20"
          cy="12"
          r="2.5"
          className="fill-gray-900 dark:fill-white"
          variants={{
            hover: {
              scale: [1, 1.2, 1],
              transition: { duration: 1, repeat: Infinity }
            }
          }}
        />
        <motion.circle
          cx="27"
          cy="24"
          r="2.5"
          className="fill-gray-900 dark:fill-white"
          variants={{
            hover: {
              scale: [1, 1.2, 1],
              transition: { duration: 1, repeat: Infinity, delay: 0.3 }
            }
          }}
        />
        <motion.circle
          cx="13"
          cy="24"
          r="2.5"
          className="fill-gray-900 dark:fill-white"
          variants={{
            hover: {
              scale: [1, 1.2, 1],
              transition: { duration: 1, repeat: Infinity, delay: 0.6 }
            }
          }}
        />

        {/* Connecting lines */}
        <motion.path
          d="M20 12L27 24L13 24L20 12Z"
          className="stroke-gray-900/50 dark:stroke-white/50"
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          variants={{
            hover: {
              opacity: [0.5, 1, 0.5],
              scale: 1.1,
              transition: { duration: 1, repeat: Infinity }
            }
          }}
        />
      </motion.g>

      {/* Center element */}
      <motion.circle
        cx="20"
        cy="20"
        r="4"
        className="fill-gray-900 dark:fill-white"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: 0.6 
        }}
        variants={{
          hover: {
            scale: [1, 1.4, 1],
            transition: { duration: 0.8, repeat: Infinity }
          }
        }}
      />

      {/* Inner rotating triangle */}
      <motion.path
        d="M20 15L24 23H16L20 15Z"
        className="fill-gray-900/30 dark:fill-white/30"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          rotate: 360
        }}
        transition={{
          scale: { duration: 0.5, delay: 1 },
          opacity: { duration: 0.5, delay: 1 },
          rotate: {
            duration: 30,
            repeat: Infinity,
            ease: "linear",
            delay: 1
          }
        }}
        style={{ transformOrigin: "20px 20px" }}
        variants={{
          hover: {
            rotate: -360,
            transition: { duration: 2 }
          }
        }}
      />
    </motion.svg>
  );
};

export default Logo;
