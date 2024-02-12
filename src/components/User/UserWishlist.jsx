import { useEffect, useState } from "react";
import { View, Image, StyleSheet, ScrollView } from "react-native";
import { Button, Card, Text, Surface, Divider } from "react-native-paper";

import axiosInstance from "../../utils/axiosConfig";

function UserWishList({ navigation }) {
  const [list, setList] = useState([]);
  useEffect(() => {
    axiosInstance
      .get("Wishlist/Wishlist")
      .then((data) => {
        console.log(data.data);
        setList(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const goToDetails = (id) => {
    navigation.navigate("Cars", {
      screen: "CarDetails",
      params: {
        carId: id,
      },
    });
  };

  const removeFromList = (id) => {
    axiosInstance
      .delete(`Wishlist/${id}`)
      .then((data) => {
        const newList = list.filter((it) => it.carId != id);
        setList(newList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <ScrollView>
        {list.map((item) => (
          <Card key={item.car.id} style={{ margin: 10 }}>
            <Card.Cover
              source={{ uri: item.car.pictureUrl }}
              style={{ margin: 10 }}
            />
            <Card.Title title={item.car.name} />
            <Card.Actions>
              <Button onPress={removeFromList}>Remove </Button>
              <Button onPress={() => goToDetails(item.car.id)}>Details</Button>
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>
    </>
  );
}

export default UserWishList;

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
