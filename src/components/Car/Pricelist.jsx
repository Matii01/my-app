import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import axiosInstance from "../../utils/axiosConfig";

function Pricelist({ id }) {
  const [pricelist, setPricelist] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(`/CarPriceList/${id}/carPricelist`)
      .then((data) => {
        setPricelist(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  if (!pricelist) {
    return <>PriceList</>;
  }
  const data = [
    // Replace with your data
    { id: 1, name: "Item 1", value: "Value 1" },
    { id: 2, name: "Item 2", value: "Value 2" },
    { id: 3, name: "Item 3", value: "Value 3" },
  ];
  return (
    <>
      <View style={styles.container}>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.header, styles.firstColumn]}>
            ID
          </Text>
          <Text style={[styles.tableCell, styles.header]}>Days</Text>
          <Text style={[styles.tableCell, styles.header]}>Price</Text>
        </View>
        {pricelist.map((item) => (
          <View key={item.id} style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.firstColumn]}>
              {item.id}
            </Text>
            <Text style={styles.tableCell}>{item.days}</Text>
            <Text style={styles.tableCell}>{item.price * item.days} PLN</Text>
          </View>
        ))}
      </View>
    </>
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

export default Pricelist;
