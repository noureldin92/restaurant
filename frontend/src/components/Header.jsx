import logo from "../assets/logo.jpg";
import { useContext } from "react";
import { appContext } from "../contextApi/selectedMealsContext";

export default function Hearder() {
  let ctx = useContext(appContext);

  let mealsCounter = ctx.selectedMeals.reduce((accumulator, currentObject) => {
    if (ctx.selectedMeals.length > 0) {
      return accumulator + currentObject.count;
    }
    return accumulator;
  }, 0);

  return (
    <header>
      <nav id="main-header">
        <div id="title">
          <img src={logo} alt="LOGO"></img>
          <h1> react Restaurant</h1>
        </div>
        <div>
          <button onClick={ctx.openModal} className="text-button">
            cart({mealsCounter})
          </button>
        </div>
      </nav>
    </header>
  );
}
