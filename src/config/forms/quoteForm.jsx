import React, { useEffect } from "react";
import RenderInput from "@/config/RenderInput";

const AmountEffectSync = ({ values, setFieldValue }) => {
  useEffect(() => {
    const base = parseFloat(values.baseAmount) || 0;
    const rate = parseFloat(values.exchangeRate) || 0;
    const computedAmount = base * rate;

    if (values.amount !== computedAmount) {
      setFieldValue("amount", computedAmount);
    }
  }, [values.baseAmount, values.exchangeRate, values.amount, setFieldValue]);

  return null;
};

const quoteForm = (field, formikProps, context) => {
  const { initialData } = context;
  const { values, handleChange, handleBlur, setFieldValue } = formikProps;

  if (field.item === "currency") {
    const groupedFields = [
      field, // currency
      { item: "baseAmount", label: "Amount", type: "number" },
      { item: "exchangeRate", label: "Exchange Rate", type: "number" },
      {
        item: "amount",
        label: "Quotation Amount",
        type: "currency",
        disabled: true,
      },
    ];

    return (
      <>
        <AmountEffectSync values={values} setFieldValue={setFieldValue} />
        <div className="flex flex-col md:flex-row md:space-x-4 w-full">
          {groupedFields.map((f) => (
            <div className="flex-1 mb-4" key={f.item}>
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
                  values[f.item] !== undefined
                    ? values[f.item]
                    : initialData?.[f.item] ?? f.defaultValue ?? ""
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

export default quoteForm;
