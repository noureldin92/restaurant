import { useContext } from "react";
import { appContext } from "../contextApi/selectedMealsContext";
import { convertNum } from "../functions/validation";
import ItemButton from "./itemButton";
export default function MealItem() {
  let { Error, addItem, availbleMeals, isLoading } = useContext(appContext);

  if (isLoading) {
    return <h1>LOADING ....</h1>;
  }
  if (Error) {
    return <h1>{Error}</h1>;
  }

  return (
    <ul id="meals">
      {availbleMeals.map((meal) => {
        return (
          <li className="meal-item" key={meal.id}>
            <article>
              <img
                src={`https://restaurantt.onrender.com/${meal.image}`}
                alt={"MealImage"}
              />
              <div>
                <h3>{meal.name}</h3>
                <p className="meal-item-price">{convertNum(meal.price)}</p>
                <p className="meal-item-description">{meal.description}</p>
              </div>
              <p className={`meal-item-actions`}>
                <ItemButton
                  onClick={(e) =>
                    addItem(meal.id, meal.name, meal.price, e.target)
                  }
                  className={`button mealButton`}
                  type="button ">
                  add to cart
                </ItemButton>
              </p>
            </article>
          </li>
        );
      })}
      ;
    </ul>
  );
}
