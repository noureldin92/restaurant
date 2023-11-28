import Input from "./reuseableInput";
import Modal from "./reuseableModal";
import { useContext, useRef, useState } from "react";
import { appContext } from "../contextApi/selectedMealsContext";
import Reactdom from "react-dom";
import { convertNum } from "../functions/validation";

export default function FormInputs() {
  let [inputValue, setInputValue] = useState({});
  //
  function changeHandler(name, value) {
    setInputValue((prv) => ({ ...prv, [name]: value }));
  }
  //
  let isValid = false;
  let ctx = useContext(appContext);
  let resetRef = useRef();
  let formRef = ctx.formRef;
  //
  if (
    inputValue.email &&
    inputValue.name &&
    inputValue.street &&
    inputValue.city &&
    inputValue["postal-code"] &&
    inputValue.name.trim() != "" &&
    inputValue["postal-code"].trim() != "" &&
    inputValue.street.trim() != "" &&
    inputValue.city.trim() != "" &&
    inputValue.email.trim() != "" &&
    inputValue.email.includes("@")
  ) {
    isValid = true;
  } else isValid = false;
  //
  function submitHandler(e) {
    e.preventDefault();
    async function send() {
      await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order: { items: ctx.selectedMeals, customer: inputValue },
        }),
      });
      console.log("REQUEST SENT");
      console.log(ctx.selectedMeals, inputValue);
    }
    send();
    resetRef.current.reset();

    setTimeout(() => {
      console.log(inputValue);
    }, 2000);
  }

  //
  return Reactdom.createPortal(
    <Modal myRef={formRef} className="form">
      <h2>Checkout</h2>
      <p>Total Amount {convertNum(ctx.totalcost)}</p>
      <form ref={resetRef} onSubmit={submitHandler}>
        <Input
          name="Full Name"
          type="text"
          id="name"
          onChange={(e) => {
            changeHandler("name", e.target.value);
          }}
        />
        <Input
          name="E-mail Adress"
          type="email"
          id="email"
          onChange={(e) => {
            changeHandler("email", e.target.value);
          }}
        />
        <Input
          name="Street"
          type="text"
          id="street"
          onChange={(e) => {
            changeHandler("street", e.target.value);
          }}
        />

        <div className="control-row">
          <Input
            name="Postal code"
            type="number"
            id="postal-code"
            onChange={(e) => {
              changeHandler("postal-code", e.target.value);
            }}
          />
          <Input
            name="City"
            type="text"
            id="city"
            onChange={(e) => {
              changeHandler("city", e.target.value);
            }}
          />
        </div>

        <div className="form-actions">
          <button
            disabled={!isValid}
            className={`button ${!isValid && "disabled"}`}
            onClick={ctx.openSuccess}>
            Check Out
          </button>
        </div>
      </form>
    </Modal>,
    document.getElementById("formModal")
  );
}
