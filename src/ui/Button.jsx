function Button({
  children,
  onClick,
  size = "sm",
  variant = "primary",
  type = "button",
  className = "",
}) {
  const sizeClasses =
    size === "lg" ? "px-6 py-3 text-base" : "px-4 py-2 text-sm";

  const baseStyles =
    "rounded-full font-semibold shadow-sm transition-all duration-200 focus:outline-none focus:ring-2";

  const variantClasses = {
    primary:
      "bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-400",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${sizeClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
