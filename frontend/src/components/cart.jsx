import { useContext } from "react";
import { appContext } from "../contextApi/selectedMealsContext";
import Modal from "./reuseableModal";
import { convertNum } from "../functions/validation";
import Reactdom from "react-dom";

export default function Cart() {
  let ctx = useContext(appContext);
  let ref = ctx.modalRef;
  let selectedMeals = ctx.selectedMeals;
  let onIncrease = ctx.onIncrease;
  let onDecrease = ctx.onDecrease;
  let totalCoast = ctx.totalcost;

  selectedMeals.map((ele, ind) => {
    ele.count === 0 ? selectedMeals.splice(ind, 1) : ele;
  });

  return Reactdom.createPortal(
    <Modal className="cart" myRef={ref} onClose={ctx.closeDialog}>
      {selectedMeals.length === 0 ? (
        <h3>Your Cart Is Empty</h3>
      ) : (
        <>
          <h2>Your Cart</h2>
          <ul className="cart">
            {selectedMeals.map((meal) => {
              if (meal.count != 0)
                return (
                  <li className="cart-item" key={meal.id}>
                    <div className="cart-item-mealname">
                      {meal.name} - {meal.count} * {convertNum(meal.price)}
                    </div>
                    <div className="cart-item-actions">
                      <span className="mealCost">{convertNum(meal.cost)}</span>
                      <button
                        onClick={() => {
                          onDecrease(meal.count, meal.id, meal.price);
                        }}>
                        -
                      </button>
                      <span className="mealCount">{meal.count}</span>
                      <button
                        onClick={() => {
                          onIncrease(meal.count, meal.id, meal.price);
                        }}>
                        +
                      </button>
                    </div>
                  </li>
                );
            })}
          </ul>
          <p className="cart-total">{convertNum(totalCoast)}</p>
          <p className="modal-actions">
            <button className="button" onClick={ctx.openFormModal}>
              Go to checkout
            </button>
          </p>
        </>
      )}
    </Modal>,
    document.getElementById("cartModal")
  );
}
