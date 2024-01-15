import { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button, Card, Text, Divider } from "react-native-paper";
import AddCarOpinion from "./AddCarOpinion";

function CardRow({ first, value }) {
  return (
    <>
      <Divider bold style={{ marginTop: 2, marginBottom: 2 }} />
      <View style={styles.row}>
        <View style={styles.column1}>
          <Text variant="headlineSmall">{first}</Text>
        </View>
        <View style={styles.column2}>
          <Text variant="titleLarge">{value}</Text>
        </View>
      </View>
      <Divider bold style={{ marginTop: 2, marginBottom: 2 }} />
    </>
  );
}

function UserRentalDetails({ onGoBackClick, rentalDetail }) {
  const [showAddOption, setShowAddOpinion] = useState(false);
  const formatDate = (date) => {
    return date.slice(0, 10);
  };

  const handleDownload = () => {
    console.log("try to download");
  };

  return (
    <ScrollView style={styles.container}>
      <Card>
        <Card.Cover source={{ uri: rentalDetail.carImg }} />
        <Card.Content>
          <CardRow
            first={"From"}
            value={formatDate(rentalDetail.rentalStart)}
          />
          <CardRow first={"To"} value={formatDate(rentalDetail.rentalEnd)} />
          <CardRow first={"Status"} value={rentalDetail.status} />
          <CardRow first={"Price"} value={rentalDetail.totalPrice} />
        </Card.Content>
        <Card.Actions>
          <Button onPress={onGoBackClick}>Go back</Button>
          <Button onPress={() => setShowAddOpinion(true)}>Add opinion</Button>
        </Card.Actions>
      </Card>
      <Divider />

      <View>
        <View>
          {showAddOption && (
            <AddCarOpinion
              style={styles.center}
              carId={rentalDetail.carId}
              onCancel={() => setShowAddOpinion(false)}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
}

export default UserRentalDetails;

const styles = StyleSheet.create({
  container: { marginBottom: 10 },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  column1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  column2: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});
