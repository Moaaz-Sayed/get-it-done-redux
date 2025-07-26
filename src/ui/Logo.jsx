import { motion } from "framer-motion";
function Logo({ size = "lg" }) {
  const sizeClasses = size === "sm" ? "text-2xl" : "text-4xl";

  return (
    <motion.h1
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      className={`text-center font-extrabold ${sizeClasses} bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text tracking-tight text-transparent drop-shadow-md`}
    >
      Get It Done
    </motion.h1>
  );
}

export default Logo;
