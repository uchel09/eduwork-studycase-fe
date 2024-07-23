const OtherInput = ({
  type = "text",
  placeholder,
  name,
  prefix,
  suffix,
  inputStyle = "w-full bg-transparent py-[2px] px-1 outline-none text-base",
  containerStyle = "w-full items-center flex  h-[32px] border-gray-400 border rounded-md px-3 gap-2  focus-within:border-2 focus-within:border-gray-700",
  onChange,
  value,
  autoFocus = false,
  disabled = false,
  label,
}) => {
  return (
    <div className="w-full flex-col">
      {label && (
        <label htmlFor={name} className="font-bold text-[16px] text-black ">
          {label}
        </label>
      )}
      <div
        className={`${containerStyle} ${disabled ? "bg-gray-400" : "bg-white"}`}
      >
        {prefix && <span className="icon">{prefix}</span>}
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          className={inputStyle}
          value={value}
          onChange={onChange}
          autoFocus={autoFocus}
          disabled={disabled}
        />
        {suffix && <span className="icon">{suffix}</span>}
      </div>
    </div>
  );
};

export default OtherInput;
