import { StyleSheet, View } from "react-native";
import { Button, Card, Text, Surface, Divider } from "react-native-paper";
import AddToWishList from "./AddToWishlist";

function CarCardForList({ car, navigation, wishlist }) {
  const handleCarClick = (id) => {
    navigation.navigate("CarDetails", { carId: id });
  };

  const goToReservation = (id) => {
    navigate(`/car/reservation/${id}`);
  };

  if (car) {
    let url = car.pictureUrl;
    if (car.pictureUrl === "") {
      url =
        "https://cdn.pixabay.com/photo/2012/11/02/13/02/car-63930_960_720.jpg%201x,%20https://cdn.pixabay.com/photo/2012/11/02/13/02/car-63930_1280.jpg";
    }

    return (
      <Card style={{ margin: 5 }}>
        <Card.Cover source={{ uri: url }} />
        <Card.Title
          title={car.name}
          right={() => <AddToWishList carId={car.id} wishlist={wishlist} />}
        />
        <Card.Content>
          <View style={styles.row}>
            <View style={styles.column}>
              <MyComponent text={car.engine} />
            </View>
            <View style={styles.column}>
              <MyComponent text={car.acceleration + "s"} />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column}>
              <MyComponent text={car.gearbox} />
            </View>
            <View style={styles.column}>
              <MyComponent text={car.horsepower + " HP"} />
            </View>
          </View>
          <Divider bold style={{ marginTop: 20, marginBottom: 5 }} />
          <View style={styles.row}>
            <View style={styles.column}>
              <Text variant="headlineSmall">Price</Text>
            </View>
            <View style={styles.column}>
              <Text variant="headlineSmall">{`${car.price} zł`}</Text>
            </View>
          </View>
          <Divider bold style={{ marginTop: 5, marginBottom: 20 }} />
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => handleCarClick(car.id)}>Details</Button>
          <Button onPress={() => goToReservation(car.id)}>Rental</Button>
        </Card.Actions>
      </Card>
    );
  }
}

const MyComponent = ({ text }) => (
  <Surface style={styles.surface} elevation={4}>
    <Text variant="titleMedium">{text}</Text>
  </Surface>
);

const styles = StyleSheet.create({
  surface: {
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  column: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10, // Optional for spacing
    // Add additional styling as needed
  },
});

export default CarCardForList;
