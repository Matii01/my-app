import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
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
      <View style={styles.container}>
        {list.map((item) => (
          <View key={item.id} style={styles.tableRow}>
            <View style={styles.tableCell}>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>{item.userName}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>
                  {formatDate(item.addedDate)}
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>{item.title}</Text>
                <Text style={styles.tableCell}>{item.mark}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>{item.text}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </>
  );
}

function GenrateStars({ number }) {
  const stars = [];

  for (let i = 0; i < number; i++) {
    stars.push(<i key={i} className="fa-regular fa-star"></i>);
  }

  return <div>{stars}</div>;
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
