import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import '../styles/CalculatorPage.css';


export default function CalculatorPage({ onCalculate} ) {
  //Yup validation schema
  const validationSchema = Yup.object({
    amount: Yup.number()
      .typeError("Only numbers are allowed")
      .integer("Only integer values are allowed")
      .positive("The number must be positive")
      .required("Required"),
    term: Yup.number()
      .typeError("Only numbers are allowed")
      .integer("Only integer values are allowed")
      .positive("The number must be positive")
      .required("Required"),
    rate: Yup.number()
      .typeError("Only numbers are allowed")
      .positive("The number must be positive")
      .test(
        "decimal-places",
        "Maximum two decimal places allowed",
        (value) => (value ? /^\d+(\.\d{1,2})?$/.test(value) : true)
      )
      .required("Required"),
    type: Yup.string()
      .oneOf(["repayment", "interest"], "Choose Type")
      .required("Choose Type"),
  });

  const initialValues = {
    amount: "",
    term: "",
    rate: "",
    type: "",
  };



  //Formik setup
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const P = Number(values.amount);
      const years = Number(values.term);
      const r = Number(values.rate) / 100 / 12; // monthly interest rate
      const n = years * 12;

      let monthly = 0;
      let total = 0;

      if (values.type === "repayment") {
        if (r === 0) {
          monthly = P / n;
        } else {
          const pow = Math.pow(1 + r, n);
          monthly = P * (r * pow) / (pow - 1);
        }
        total = monthly * n;
      } else {
        // interest only
        monthly = P * r;
        total = monthly * n + P;
      }

      onCalculate?.(monthly.toFixed(5), total.toFixed(5));
    },
  });

  const handleClearAll = () => {
 
    formik.resetForm();
    onCalculate?.(null, null);                 
  };



  return (
    <form onSubmit={formik.handleSubmit} className="calculator-form">
      {/* Amount */}
      <header>
          <h1 className='calc-h1'>Mortgage Repayment Calculator</h1>
          <button className='clear-all-btn' 
                  type="button"
                  onClick={handleClearAll}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
                      e.preventDefault();        // ne fusson le kétszer (keydown + click)
                      handleClearAll();
                    }
                   }}>
                  Clear All
          </button>
      </header>
      <div className="form-group">
        <label htmlFor="amount">Mortgage Amount</label>
        <div className="input-wrapper with-prefix">
           <span className="input-adornment prefix">£</span>
           <input
              id="amount"
              name="amount"
              type="number"
              step="1"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.amount}
           />
        </div>
        {formik.touched.amount && formik.errors.amount && (
          <div className="error-label-amount">{formik.errors.amount}</div>
        )}
      </div>
      <div className="form-row">
      {/* Term */}
      <div className="form-group">
        <label htmlFor="term">Mortgage Term</label>
        <div className="input-wrapper with-suffix">
        
            <input
              id="term"
              name="term"
              type="number"
              step="1"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.term}
            />
            <span className="input-adornment suffix">years</span>
 
        </div>
        {formik.touched.term && formik.errors.term && (
          <div className="error-label-term">{formik.errors.term}</div>
        )}
      </div>

      {/* Rate */}
      <div className="form-group">
        <label htmlFor="rate">Interest Rate</label>
        <div className="input-wrapper with-suffix">
            <input
              id="rate"
              name="rate"
              type="number"
              step="0.01"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.rate}
            />
            <span className="input-adornment suffix">%</span>
          
        </div>
        {formik.touched.rate && formik.errors.rate && (
          <div className="error-label-rate">{formik.errors.rate}</div>
        )}
        </div>
      </div>
      {/* Type selection (radio) */}
      <div className="form-group">
        <label className="type-label">Mortgage Type</label>
        <div role="group" aria-labelledby="type-group" className="radio-inputs">
          <label className="radio-label">
            <input
              type="radio"
              name="type"
              value="repayment"
              checked={formik.values.type === "repayment"}
              onChange={formik.handleChange}
            />
            <span>Repayment</span>
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="type"
              value="interest"
              checked={formik.values.type === "interest"}
              onChange={formik.handleChange}
            />
            Interest only
          </label>
        </div>
        {formik.touched.type && formik.errors.type && (
          <div className="error-label-radio-btns">{formik.errors.type}</div>
        )}
      </div>

      {/* Submit */}
      <button type="submit">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#133041" d="M18.75 2.25H5.25a1.5 1.5 0 0 0-1.5 1.5v16.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V3.75a1.5 1.5 0 0 0-1.5-1.5Zm-10.5 16.5a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Zm0-3.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25ZM12 18.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25ZM12 15a1.125 1.125 0 1 1 0-2.25A1.125 1.125 0 0 1 12 15Zm3.75 3.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Zm0-3.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Zm1.5-5.25a.75.75 0 0 1-.75.75h-9a.75.75 0 0 1-.75-.75V6a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 .75.75v3.75Z"/></svg>Calculate Repayments</button>
    </form>
  );
};

