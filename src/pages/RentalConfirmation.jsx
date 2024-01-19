import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import axiosInstance from "../utils/axiosConfig";
import { Button, Card, Text } from "react-native-paper";

function RentalConfirmation({ route, navigation }) {
  const { paymentId } = route.params;
  const [rentalData, setRentalData] = useState("");

  useEffect(() => {
    axiosInstance
      .get(`Rental/rentalDetail/${paymentId}`)
      .then((response) => {
        console.log(response);
        setRentalData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const goToreRervation = () => {
    navigation.navigate("Account");
  };

  return (
    <>
      <View style={styles.container}>
        <Card style={{ margin: 5 }}>
          <Card.Title titleVariant="headlineSmall" title={"RENTAL CONFIRMED"} />
          <Card.Content>
            {rentalData && (
              <Text variant="titleLarge">
                Thank you, {rentalData.client.firstName}. Your rental is
                confirmed.
              </Text>
            )}
            {/* <Text>{paymentId}</Text> */}
          </Card.Content>
        </Card>
        <Card.Actions>
          <Button onPress={goToreRervation}>Go to your reservation</Button>
        </Card.Actions>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default RentalConfirmation;
