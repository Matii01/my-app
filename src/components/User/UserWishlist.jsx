import { useEffect, useState } from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";
import axiosInstance from "../../utils/axiosConfig";

function UserWishList() {
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
    console.log("go to details: " + id);
  };

  const removeFromList = (id) => {
    axiosInstance
      .delete(`https://localhost:7091/Wishlist/${id}`)
      .then((data) => {
        const newList = list.filter((it) => it.carId != id);
        setList(newList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderedList = list.map((item) => (
    <View key={item.car.id} style={styles.carItem}>
      <Image source={{ uri: item.car.pictureUrl }} style={styles.image} />
      <View>
        <Text style={styles.name}>{item.car.name}</Text>
        <Button title="Details" onPress={() => goToDetails(item.car.id)} />
      </View>
      <View></View>
    </View>
  ));

  return (
    <>
      <View>{renderedList}</View>
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
