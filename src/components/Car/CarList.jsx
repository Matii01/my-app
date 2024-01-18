import React from "react";
import { View } from "react-native";
import CarCardForList from "./CarCardForList";

const CarList = ({ cars, navigation, wishlist }) => {
  const list = cars.map((car) => (
    <View key={car.id} style={{ marginBottom: 10 }}>
      <CarCardForList car={car} navigation={navigation} wishlist={wishlist} />
    </View>
  ));

  return <View>{list}</View>;
};

export default CarList;
