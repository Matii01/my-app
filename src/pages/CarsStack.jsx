import { createStackNavigator } from "@react-navigation/stack";
import CarsPage from "./CarsPage";
import CarDetails from "./CarDetailPage";
import RentalPage from "./RentalPage";

const Stack = createStackNavigator();

function CarStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CarsPage"
        component={CarsPage}
        options={{ title: "Cars" }}
      />
      <Stack.Screen
        name="CarDetails"
        component={CarDetails}
        options={{ title: "Cars Details" }}
      />
      <Stack.Screen
        name="Rental"
        component={RentalPage}
        options={{ title: "Rental" }}
      />
    </Stack.Navigator>
  );
}

export default CarStack;
