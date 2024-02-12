import { createStackNavigator } from "@react-navigation/stack";
import CarsPage from "./CarsPage";
import CarDetails from "./CarDetailPage";
import RentalPage from "./RentalPage";
import RentalConfirmation from "./RentalConfirmation";
import { Button } from "react-native-paper";

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
        options={({ navigation }) => ({
          title: "Car Details",
          headerRight: () => (
            <Button onPress={() => navigation.navigate("CarsPage")}>
              Go to all cars
            </Button>
          ),
        })}
      />
      <Stack.Screen
        name="Rental"
        component={RentalPage}
        options={{ title: "Rental" }}
      />
      <Stack.Screen
        name="RentalConfirm"
        component={RentalConfirmation}
        options={{ title: "Confirmation" }}
      />
    </Stack.Navigator>
  );
}

export default CarStack;
