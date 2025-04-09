import React, { useState } from "react";
import Select from "react-select";

const GenerateForm = (props) => {
  const { formConfigs } = props;

  const [formData, setFormData] = useState({});

  const updateFormData = (params) => {
    const { key, value } = params;
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const formSubmit = () => {
    console.log("submit", formData);
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formSubmit();
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {formConfigs.map((config, index) => {
            return (
              <div key={`custom_field_${index}`}>
                <RenderField config={config} updateFormData={updateFormData} />
              </div>
            );
          })}
        </div>

        <button type="submit">submit</button>
      </form>
    </div>
  );
};
const RenderField = (props) => {
  const { config, updateFormData } = props;

  switch (config.type) {
    case "Select":
      return (
        <div style={{ display: "flex" }}>
          <p>{config.label}</p>
          <Select
            name="type"
            options={config?.options
              ?.split(",")
              ?.map((v) => ({ label: v, value: v }))}
            required={config.required}
            onChange={(e) =>
              updateFormData({ key: config.label, value: e.value })
            }
          />
        </div>
      );

    case "radio":
      return (
        <div style={{ display: "flex" }}>
          <p>{config.label}</p>
          {config?.options?.split(",").map((value) => {
            return (
              <>
                <label for={value}>{value}</label>
                <input
                  type="radio"
                  id={value}
                  name={config.label}
                  value={value}
                  required={config.required}
                  onChange={(e) => {
                    updateFormData({
                      key: config.label,
                      value: e.target.value,
                    });
                  }}
                />
              </>
            );
          })}
        </div>
      );

    default:
      return (
        <div style={{ display: "flex" }}>
          <p>{config.label}</p>
          <input
            type={config.type}
            name={config.label}
            id={config.label}
            required={config.required}
            onChange={(e) => {
              updateFormData({
                key: config.label,
                value:
                  e.target[config.type === "checkbox" ? "checked" : "value"],
              });
            }}
          />
        </div>
      );
  }
};
export default GenerateForm;
