import React from "react";

const SimpleForm = ({ handleSubmit, renderErrorMessage, inputClass }) => {
  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pw" required />
          {renderErrorMessage()}
        </div>
        <div className="button-container">
          <input className={inputClass} type="submit" />
        </div>
      </form>
    </div>
  );
};

export default SimpleForm;
