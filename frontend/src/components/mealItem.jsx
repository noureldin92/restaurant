import { useContext } from "react";
import { appContext } from "../contextApi/selectedMealsContext";
import { convertNum } from "../functions/validation";
export default function MealItem() {
  let { Error, addItem, availbleMeals, isLoading } = useContext(appContext);

  if (isLoading) {
    return <h1>LOADING ....</h1>;
  }
  if (Error) {
    return <h1>{Error}</h1>;
  }
  return availbleMeals.map((meal) => {
    return (
      <ul className="meal-item" key={meal.id}>
        <li>
          <img
            src={`https://restaurantt.onrender.com/${meal.image}`}
            alt="MealImage"
          />
          <h3>{meal.name}</h3>
          <p className="meal-item-price">{convertNum(meal.price)}</p>
          <p className="meal-item-description">{meal.description}</p>
          <button
            onClick={() => addItem(meal.id, meal.name, meal.price)}
            className="button mealButton"
            type="button ">
            add to cart
          </button>
        </li>
      </ul>
    );
  });
}
