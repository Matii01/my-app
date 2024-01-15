import React from "react";
import { View } from "react-native";
import CarCardForList from "./CarCardForList";

const CarList = ({ cars, navigation }) => {
  const list = cars.map((car) => (
    <View key={car.id} style={{ marginBottom: 10 }}>
      <CarCardForList car={car} navigation={navigation} />
    </View>
  ));

  return <View>{list}</View>;
};

export default CarList;

/**import React from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";

const CarList = ({ cars, navigation }) => {
  const goToDetails = (id) => {
    navigation.navigate("CarDetails", { carId: id });
  };

  const list = cars.map((car) => (
    <View key={car.id} style={styles.carItem}>
      <Image source={{ uri: car.pictureUrl }} style={styles.image} />
      <View>
        <Text style={styles.name}>{car.name}</Text>
        <Button title="Details" onPress={() => goToDetails(car.id)} />
      </View>
      <View></View>
    </View>
  ));

  return <View>{list}</View>;
};

const styles = StyleSheet.create({
  carItem: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  infoContainer: {
    justifyContent: "center",
  },
  name: {
    fontWeight: "bold",
  },
});

export default CarList;
 */
