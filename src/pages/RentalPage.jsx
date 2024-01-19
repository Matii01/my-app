import { Button, Text, View } from "react-native";
import RentalDetail from "../components/Rental/RentalDetail";
import { StripeProvider } from "@stripe/stripe-react-native";
import config from "../../config";

function RentalPage({ route, navigation }) {
  const { reservation } = route.params;

  return (
    <>
      <StripeProvider publishableKey={config.STRIPE_KEY}>
        <RentalDetail reservation={reservation} navigation={navigation} />
      </StripeProvider>
    </>
  );
}

export default RentalPage;
