import React, { useEffect } from "react";
import RenderInput from "@/config/RenderInput";

const AmountEffectSync = ({ values, setFieldValue }) => {
  useEffect(() => {
    const base = parseFloat(values.baseAmount) || 0;
    const rate = parseFloat(values.exchangeRate) || 0;
    const newAmount = base * rate;
    const currentAmount = parseFloat(values.amount) || 0;

    if (currentAmount !== newAmount) {
      setFieldValue("amount", newAmount);
    }
  }, [values.baseAmount, values.exchangeRate, setFieldValue]);

  return null;
};

const contractForm = (field, formikProps, renderField, fields, context) => {
  const { initialData } = context;
  const { values, handleChange, handleBlur, setFieldValue } = formikProps;

  if (field.item === "currency") {
    return (
      <>
        <AmountEffectSync values={values} setFieldValue={setFieldValue} />

        {/* First row: 4 fields (25% each) */}
        <div className="flex flex-wrap w-full mb-4">
          {[
            field,
            { item: "baseAmount", label: "Amount", type: "number" },
            { item: "exchangeRate", label: "Exchange Rate", type: "number" },
            {
              item: "amount",
              label: "Contract Amount",
              type: "currency",
              disabled: true,
            },
          ].map((f) => (
            <div className="w-full md:w-1/4 px-2 mb-4" key={f.item}>
              <label
                htmlFor={f.item}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {f.label}
              </label>
              <RenderInput
                field={{
                  ...f,
                  id: f.item,
                }}
                type={f.type}
                value={
                  values[f.item] ?? initialData[f.item] ?? f.defaultValue ?? ""
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          ))}
        </div>

      </>
    );
  }

  return null;
};

export default contractForm;
