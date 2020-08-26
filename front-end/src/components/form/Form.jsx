import React from "react";

import "./_form.scss";

const DEFAULT_SUBMIT_TEXT = "Save";

const Form = (props) => {
  const {
    handleInputChange,
    handleSubmit,
    inputs = [],
    submitButtonText = DEFAULT_SUBMIT_TEXT,
  } = props;

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formParams = {};
    inputs.forEach((input) => {
      const { name = "", value = "" } = input;
      formParams[name] = value;
    });
    handleSubmit(formParams);
  };

  const onChange = (index) => {
    return (event) => {
      const { target = {} } = event;
      const { value = "" } = target;
      handleInputChange({ index, value });
    };
  };

  const getInputControls = () => {
    return inputs.map((input, index) => {
      const {
        error = "",
        id = "",
        isValid = true,
        label = "",
        name = "",
        isRequired = false,
        type = "text",
        value = "",
      } = input;
      return (
        <div key={id}>
          <input
            autoComplete={"off"}
            id={id}
            name={name}
            onChange={onChange(index)}
            placeholder={label}
            required={isRequired}
            type={type}
            value={value}
          />
          {!isValid && <span>{error}</span>}
        </div>
      );
    });
  };

  return (
    <form className="form" onSubmit={handleFormSubmit}>
      {getInputControls()}
      <input type="submit" value={submitButtonText} />
    </form>
  );
};

export default Form;
