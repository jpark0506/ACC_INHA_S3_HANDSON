import React from 'react';

function StyledInput(props) {
    const {
        value,
        onChange,
        placeholder,
    } = props;
  const inputStyle = {
    width: '300px',
    padding: '12px 20px',
    margin: '10px 0',
    marginRight: '20px',
    border: '2px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.3s',
  };

  const handleFocus = (e) => {
    e.target.style.borderColor = '#66afe9';
  };

  const handleBlur = (e) => {
    e.target.style.borderColor = '#ccc';
  };

  return (
    <input
      type="text"
      style={inputStyle}
      onFocus={handleFocus}
      onBlur={handleBlur}
      value={value}
        onChange={onChange}
      placeholder={placeholder}
    />
  );
}

export default StyledInput;