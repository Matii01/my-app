import { View, Text, StyleSheet } from "react-native";
import { CardField, useStripe } from "@stripe/stripe-react-native";
import { useState } from "react";
import RentalData from "./RentalData";
import { ScrollView } from "react-native-gesture-handler";

function RentalDetail({ reservation }) {
  const { confirmPayment } = useStripe();
  const [allRentalData, setAllRentalData] = useState({
    NewRentalForClient: {
      CarId: reservation.carId,
      DateFrom: reservation.DateFrom,
      DateTo: reservation.DateTo,
    },
    ClientDetails: {
      FirstName: "",
      LastName: "",
      Email: "",
      PhoneNumber: "",
      Address: "",
      PostCode: "",
      City: "",
    },
    Invoice: {
      Number: "zxcvbnm",
      Comment: "brak uwag",
    },
  });

  const handleSubmit = async (event) => {};

  return (
    <ScrollView>
      <View style={styles.row}>
        <RentalData
          allRentalData={allRentalData}
          setAllRentalData={setAllRentalData}
        />
      </View>
      <View>
        <CardField
          postalCodeEnabled={true}
          placeholders={{
            number: "4242 4242 4242 4242",
          }}
          cardStyle={{
            backgroundColor: "#FFFFFF",
            textColor: "#000000",
          }}
          style={{
            width: "100%",
            height: 50,
            marginVertical: 30,
          }}
          onCardChange={(cardDetails) => {
            console.log("cardDetails", cardDetails);
          }}
          onFocus={(focusedField) => {
            console.log("focusField", focusedField);
          }}
        />
      </View>
    </ScrollView>
  );
}

export default RentalDetail;
