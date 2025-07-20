function Logo({ size = "lg" }) {
  const sizeClasses = size === "sm" ? "text-2xl" : "text-4xl";

  return (
    <h1
      className={`text-center font-extrabold ${sizeClasses} bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text tracking-tight text-transparent drop-shadow-md`}
    >
      Get It Done
    </h1>
  );
}

export default Logo;
