import { useContext } from "react";
import { appContext } from "../contextApi/selectedMealsContext";
export default function Modal({ myRef, children, className, onClose, button }) {
  let ctx = useContext(appContext);
  return (
    <dialog ref={myRef} onClose={onClose} className={`modal ${className}`}>
      {children}
      <form method="dialog" className="dialog">
        <button className="button alignSelf" onClick={button && ctx.clearArr}>
          {button ? button : "close"}
        </button>
      </form>
    </dialog>
  );
}
