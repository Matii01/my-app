import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text, MD3Colors, Icon } from "react-native-paper";
import axiosInstance from "../../utils/axiosConfig";

function CarOpinionList({ carId }) {
  const [list, setList] = useState([]);
  useEffect(() => {
    axiosInstance
      .get(`/CarOpinion/${carId}`)
      .then((data) => {
        setList(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const formatDate = (date) => {
    return date.slice(0, 10);
  };

  return (
    <>
      <View>
        <Text variant="displaySmall" style={{ margin: 10, marginTop: 25 }}>
          Opinion
        </Text>
        {list.map((item) => (
          <Card key={item.id} style={{ margin: 5, marginBottom: 50 }}>
            <Card.Title
              title={item.userName}
              subtitle={formatDate(item.addedDate)}
              right={() => <Stars number={item.mark} />}
            />
            <Card.Content>
              <Text variant="titleLarge">{item.title}</Text>
              <Text variant="bodyMedium">{item.text}</Text>
            </Card.Content>
          </Card>
        ))}
      </View>
    </>
  );
}

function Stars({ number }) {
  const stars = [];

  for (let i = 0; i < number; i++) {
    stars.push(
      <Icon key={i} source="star" color={MD3Colors.error50} size={15} />
    );
  }

  return (
    <View
      style={{ flex: 1, flexDirection: "row", marginTop: 15, marginEnd: 15 }}
    >
      {stars}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tableCell: {
    flex: 1,
    margin: 4,
  },
  firstColumn: {
    flex: 0.5,
  },
  header: {
    fontWeight: "bold",
  },
});

export default CarOpinionList;
