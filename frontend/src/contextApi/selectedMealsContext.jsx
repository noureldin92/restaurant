import { createContext, useEffect, useReducer, useRef } from "react";
import { useFetch } from "../Hooks/useFetch";
import { getData } from "../functions/getData";
export let appContext = createContext({
  availbleMeals: [],
  isLoading: false,
  Error: "",
  addItem: () => {},
  openModal: () => {},
  modalRef: null,
  openFormModal: () => {},
  formRef: null,
  selectedMeals: [],
  onIncrease: () => {},
  onDecrease: () => {},
  closeDialog: () => {},
  totalcost: 0,
  openSuccess: () => {},
  successRef: null,
  clearArr: () => {},
});

function mealsReducer(state, action) {
  if (action.type === "addItem") {
    if (state.length === 0) {
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          price: action.price,
          count: 1,
          cost: 1 * action.price,
        },
      ];
    } else {
      const existingMeal = state.find((meal) => meal.id === action.id);
      if (existingMeal) {
        let myobj = state.map((meal) =>
          meal.id === action.id
            ? {
                ...meal,
                count: meal.count + 1,
                cost: (meal.count + 1) * meal.price,
              }
            : meal
        );
        return myobj;
      }
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          price: action.price,
          count: 1,
          cost: 1 * action.price,
        },
      ];
    }
  }
  if (action.type === "increaseItems") {
    const idFound = state.find((meal) => meal.id === action.id);
    if (idFound) {
      let myobj = state.map((meal) =>
        meal.id === action.id
          ? {
              ...meal,
              count: action.count + 1,
              cost: (action.count + 1) * action.price,
            }
          : meal
      );
      return myobj;
    }
  }
  if (action.type === "decreaseItems") {
    let idFounded = state.find((meal) => meal.id === action.id);
    if (idFounded) {
      let decresedObj = state.map((meal) => {
        if (meal.id === action.id) {
          return {
            ...meal,
            count: action.count - 1,
            cost: (action.count - 1) * action.price,
          };
        } else return meal;
      });
      return decresedObj;
    }
  }
  if (action.type === "clearArr") {
    return [];
  }
}
export function ContextProvider({ children }) {
  let totalCost = 0;
  let { availbleMeals, isLoading, Error } = useFetch(getData);
  let [mealsState, mealsDispatch] = useReducer(mealsReducer, []);

  let modalControl = useRef();
  let formControl = useRef();
  let successRef = useRef();

  mealsState &&
    mealsState.map((ele) => {
      totalCost += ele.cost;
    });

  function openModal() {
    modalControl.current.showModal();
  }
  function closeModal() {
    modalControl.current.close();
  }
  function openForm() {
    formControl.current.showModal();
    modalControl.current.close();
  }
  function openSuccess() {
    successRef.current.showModal();
    formControl.current.close();
  }

  function clearArr() {
    mealsDispatch({
      type: "clearArr",
    });
  }
  function addItems(id, name, price) {
    mealsDispatch({
      type: "addItem",
      id: id,
      name: name,
      price: price,
      count: 0,
      cost: 0,
    });
  }

  function increase(oldCount, id, price) {
    mealsDispatch({
      type: "increaseItems",
      id: id,
      count: oldCount,
      price: price,
    });
  }

  function decrease(oldCount, id, price) {
    mealsDispatch({
      type: "decreaseItems",
      id: id,
      count: oldCount,
      price: price,
    });
  }

  let value = {
    availbleMeals: availbleMeals,
    isLoading: isLoading,
    Error: Error,
    addItem: addItems,
    openModal: openModal,
    modalRef: modalControl,
    selectedMeals: mealsState,
    onIncrease: increase,
    onDecrease: decrease,
    closeDialog: closeModal,
    formRef: formControl,
    openFormModal: openForm,
    totalcost: totalCost,
    openSuccess: openSuccess,
    successRef: successRef,
    clearArr: clearArr,
  };
  return <appContext.Provider value={value}>{children}</appContext.Provider>;
}
