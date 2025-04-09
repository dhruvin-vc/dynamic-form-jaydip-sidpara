import React, { useState } from "react";
import FormConfig from "./components/FormConfig";


const CustomForm = () => {
  const [showFormConfig, setShowFormConfig] = useState(false);
  return (
    <>
      {!showFormConfig ? (
        <button
          onClick={() => {
            setShowFormConfig(true);
          }}
        >
          Configure Form
        </button>
      ) : (
        <></>
      )}

      {showFormConfig ? <FormConfig /> : <></>}
    </>
  );
};

export default CustomForm;
