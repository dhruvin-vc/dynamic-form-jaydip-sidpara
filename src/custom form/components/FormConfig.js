import React, { useState } from "react";
import { ALLOWED_FORM_FIELD_TYPES } from "../constants";
import Select from "react-select";
import GenerateForm from "./GenerateForm";

const defaultFormConfig = {
  label: "",
  type: "text",
  required: false,
};
const FormConfig = () => {
  const [formConfigs, setFormConfigs] = useState([
    {
      label: "firstName",
      type: "text",
      required: true,
    },
    {
      label: "age",
      type: "number",
      required: false,
    },
    {
      label: "hobbies",
      type: "Select",
      required: true,
      options: "coding,drumming",
    },
    {
      label: "gender",
      type: "radio",
      required: true,
      options: "male,female",
    },
    {
      label: "T&C",
      type: "checkbox",
      required: false,
    },
  ]);
  const [generateForm, setGenerateForm] = useState(false);

  const handleConfigChange = (params) => {
    const { index, key, value } = params;

    const deepClonedConfigs = formConfigs.slice();

    deepClonedConfigs[index] = {
      ...deepClonedConfigs[index],
      [key]: value,
    };
    setFormConfigs(deepClonedConfigs);
  };

  const addFormConfig = () => {
    const deepClonedConfigs = formConfigs.slice();
    setFormConfigs([...deepClonedConfigs, defaultFormConfig]);
  };

  return (
    <div>
      {!generateForm ? (
        <>
          {formConfigs.map((config, index) => {
            return (
              <div
                key={`fromConfigs_${index}`}
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "500px",
                    height: "100%",
                    margin: "15px",
                  }}
                >
                  <input
                    type="text"
                    value={config.label}
                    name="label"
                    onChange={(e) =>
                      handleConfigChange({
                        index,
                        key: e.target.name,
                        value: e.target.value,
                      })
                    }
                  />
                  <Select
                    name="type"
                    options={Object.values(ALLOWED_FORM_FIELD_TYPES)}
                    defaultValue={ALLOWED_FORM_FIELD_TYPES["text"]}
                    value={ALLOWED_FORM_FIELD_TYPES[config.type]}
                    onChange={(e) => {
                      handleConfigChange({
                        index,
                        key: "type",
                        value: e.value,
                      });
                    }}
                  />
                  <input
                    type="radio"
                    checked={config.required}
                    onChange={(e) => {
                      handleConfigChange({
                        index,
                        key: "required",
                        value: e.target.checked,
                      });
                    }}
                  />
                  {["Select", "radio"].includes(config.type) ? (
                    <input
                      type="text"
                      name="options"
                      onChange={(e) => {
                        handleConfigChange({
                          index,
                          key: e.target.name,
                          value: e.target.value,
                        });
                      }}
                    />
                  ) : (
                    <></>
                  )}
                </div>
                <button onClick={(e) => addFormConfig()}>+</button>
              </div>
            );
          })}

          <button onClick={() => setGenerateForm(true)}>Generate Form</button>
        </>
      ) : (
        <GenerateForm formConfigs={formConfigs} />
      )}
    </div>
  );
};

export default FormConfig;
