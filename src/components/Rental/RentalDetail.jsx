import { View, Text, StyleSheet } from "react-native";
import {
  Card,
  Button,
  DataTable,
  Divider,
  Portal,
  Modal,
} from "react-native-paper";
import { CardField, useStripe } from "@stripe/stripe-react-native";
import { useState } from "react";
import RentalData from "./RentalData";
import { ScrollView } from "react-native-gesture-handler";
import axiosInstance from "../../utils/axiosConfig";
import ChangeReservationData from "../Car/ChangeReservationData";

function RentalDetail({ reservation, navigation }) {
  const [visible, setVisible] = useState(false);
  const { confirmPayment } = useStripe();
  const stripe = useStripe();
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

  const fetchPaymentIntentClientSecret = async () => {
    const response = await axiosInstance.post(
      "/Payment/NewPayment",
      JSON.stringify(allRentalData),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    const clientSecret = response.data.clientSecret;

    return clientSecret;
  };

  const handlePayPress = async () => {
    try {
      const clientSecret = await fetchPaymentIntentClientSecret();
      const { paymentIntent, error } = await confirmPayment(clientSecret, {
        paymentMethodType: "Card",
      });

      if (error) {
        console.log("Payment confirmation error", error);
      } else if (paymentIntent) {
        console.log("Success from promise", paymentIntent);
        navigation.navigate("RentalConfirm", { paymentId: paymentIntent.id });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setNewRentalDate = (data) => {
    console.log(data);
    setAllRentalData((prev) => ({
      ...prev,
      NewRentalForClient: {
        CarId: data.carId,
        DateFrom: data.DateFrom,
        DateTo: data.DateTo,
      },
    }));
  };

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20, margin: 20 };

  return (
    <ScrollView>
      <View>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
          >
            <View style={{ height: "75%" }}>
              <ChangeReservationData
                rentalData={allRentalData.NewRentalForClient}
                setRentalData={setNewRentalDate}
                hide={hideModal}
              />
            </View>
          </Modal>
        </Portal>
        <Card style={{ margin: 5, marginBottom: 0 }}>
          <Card.Title title="Rental date" />
          <Card.Content>
            <DataTable style={{ marginLeft: 10, marginBottom: 20 }}>
              <Divider />
              {allRentalData.NewRentalForClient.DateFrom && (
                <DataTable.Row>
                  <DataTable.Cell>From</DataTable.Cell>
                  <DataTable.Cell>
                    {allRentalData.NewRentalForClient.DateFrom}
                  </DataTable.Cell>
                </DataTable.Row>
              )}
              {allRentalData.NewRentalForClient.DateTo && (
                <DataTable.Row>
                  <DataTable.Cell>To</DataTable.Cell>
                  <DataTable.Cell>
                    {allRentalData.NewRentalForClient.DateTo}
                  </DataTable.Cell>
                </DataTable.Row>
              )}
              <Divider />
            </DataTable>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => setVisible(true)}>Choose</Button>
          </Card.Actions>
        </Card>
      </View>
      <View>
        <RentalData
          allRentalData={allRentalData}
          setAllRentalData={setAllRentalData}
          onSubmit={handlePayPress}
        />
      </View>
      <View>
        <Card style={{ margin: 5 }}>
          <Card.Title title="Card" />
          <Card.Content>
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
                height: 60,
                marginVertical: 30,
              }}
              onCardChange={(cardDetails) => {
                console.log("cardDetails", cardDetails);
              }}
              onFocus={(focusedField) => {
                console.log("focusField", focusedField);
              }}
            />
          </Card.Content>
          <Card.Actions>
            <Button mode="contained" onPress={(onPress = { handlePayPress })}>
              PAY
            </Button>
          </Card.Actions>
        </Card>
      </View>
    </ScrollView>
  );
}

export default RentalDetail;
