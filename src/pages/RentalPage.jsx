import { Text, View } from "react-native";
import RentalDetail from "../components/Rental/RentalDetail";
import { StripeProvider } from "@stripe/stripe-react-native";
import config from "../../config";

function RentalPage({ route }) {
  const { reservation } = route.params;

  return (
    <>
      <StripeProvider publishableKey={config.STRIPE_KEY}>
        <RentalDetail reservation={reservation} />
      </StripeProvider>
    </>
  );
}

export default RentalPage;
