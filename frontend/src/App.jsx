import Hearder from "./components/Header";
import AvailbleMeals from "./components/availbleMeals";
import { ContextProvider } from "./contextApi/selectedMealsContext";
import Cart from "./components/cart";
import FormInputs from "./components/inputsForm";
import SuccessMessage from "./components/successMessage";

function App() {
  return (
    <ContextProvider>
      <Hearder />
      <FormInputs />
      <SuccessMessage />
      <AvailbleMeals />
      <Cart />
    </ContextProvider>
  );
}

export default App;
