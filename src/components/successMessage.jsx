import Modal from "./reuseableModal";
import Reactdom from "react-dom";
import { useContext } from "react";
import { appContext } from "../contextApi/selectedMealsContext";
export default function SuccessMessage() {
  let ctx = useContext(appContext);
  let SuccessRef = ctx.successRef;
  return Reactdom.createPortal(
    <Modal myRef={SuccessRef} className="Success" button="Okay">
      <h2>Success!</h2>
      <p>Your order was submitted successfully</p>
      <p>We will get back to you via email within few minutes</p>
    </Modal>,
    document.getElementById("successModal")
  );
}
