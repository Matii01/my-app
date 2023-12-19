import React from "react";
import { View, Text, FlatList, Image, StyleSheet, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const CarList = ({ cars, navigation }) => {
  console.log("cars: ");
  console.log(cars);
  const renderList = ({ car }) => {
    <View style={styles.carItem}>
      <Image source={{ uri: car.pictureUrl }} style={styles.image} />
      <View>
        <Text style={styles.name}>{car.name}</Text>
      </View>
    </View>;
  };

  const goToDetails = (id) => {
    console.log(id);
    navigation.navigate("CarDetails", { carId: id });
  };

  const list = cars.map((car) => (
    <View key={car.id} style={styles.carItem}>
      <Image source={{ uri: car.pictureUrl }} style={styles.image} />
      <View>
        <Text style={styles.name}>{car.name}</Text>
        <Button title="Details" onPress={() => goToDetails(car.id)} />
      </View>
    </View>
  ));

  return (
    <>
      <ScrollView>{list}</ScrollView>
    </>
  );
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
