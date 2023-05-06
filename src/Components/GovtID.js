import React, { forwardRef } from "react";

const GovtIdComponent = forwardRef(({ onChange, onBlur, name, label }, ref) => {
  return (
    <div>
      <label>{label}</label>
      <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
        <option value="">Select GovtID</option>
        <option value="Aadhar">Aadhar</option>
        <option value="PAN">PAN</option>
      </select>
    </div>
  );
});

export default GovtIdComponent;
