import { useEffect, useState } from "react";
import { View } from "react-native";
import axiosInstance from "../../utils/axiosConfig";
import { Card, Text, Button } from "react-native-paper";

function RecommendedCars({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(`car/recommended`)
      .then((data) => {
        console.log(data.data);
        setItems(data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleCarClick = (id) => {
    navigation.navigate("Cars", {
      screen: "CarDetails",
      params: {
        carId: id,
      },
    });
  };

  if (isLoading == true) {
    return (
      <View>
        <Text>Loading ... </Text>
      </View>
    );
  }

  return (
    <View>
      {items.map((item) => (
        <Card key={item.carId} style={{ margin: 5, marginTop: 10 }}>
          <Card.Cover source={{ uri: `${item.pictureUrl}` }} />
          <Card.Title title={item.name} subtitle={`${item.price} zł`} />
          <Card.Actions>
            <Button onPress={() => handleCarClick(item.carId)}>Details</Button>
          </Card.Actions>
        </Card>
      ))}
    </View>
  );
}

export default RecommendedCars;
