import { useState } from "react";
import "./input.css";

const MyInput = ({ label, errorMessage, onChange, ...inputProps }) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  return (
    <div className="formInput">
      <label>{label}</label>
      <input
        className="px-[20px]"
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === "confirmPassword" && setFocused(true)
        }
        // eslint-disable-next-line react/no-unknown-property
        focused={focused.toString()}
        autoComplete="off"
      />
      <span>{errorMessage}</span>
    </div>
  );
};

export default MyInput;
