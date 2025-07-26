function Input({
  required,
  placeholder,
  type = "text",
  value,
  onChange,
  size = "sm",
}) {
  const sizeClasses =
    size === "lg" ? "px-6 py-3 text-base" : "px-4 py-2 text-sm";

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className={`w-full rounded-full border border-gray-300 bg-white shadow-sm transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 ${sizeClasses} `}
    />
  );
}

export default Input;
