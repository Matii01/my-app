import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Pagination from "../Pagination/Pagination";
import { useEffect, useState } from "react";

function UserRentalList({ items, onDetailsClick, paginationData, pageChange }) {
  const goToDetails = (id) => {
    onDetailsClick(id);
  };

  const renderItem = ({ item }) => (
    <View style={styles.row} key={item.id}>
      <Text style={styles.cell}>{item.carName}</Text>
      <Text style={styles.cell}>{formatDate(item.rentalStart)}</Text>
      <Text style={styles.cell}>{formatDate(item.rentalEnd)}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => goToDetails(item.id)}
      >
        <Text>Detalis</Text>
      </TouchableOpacity>
    </View>
  );

  const list = items.map((item) => renderItem({ item }));

  return (
    <ScrollView>
      {list}
      <Pagination paginationData={paginationData} pageChange={pageChange} />
    </ScrollView>
  );
}

export default UserRentalList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  cell: {
    flex: 1,
    textAlign: "center",
  },
  button: {
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
  },
});

const formatDate = (date) => {
  return date.slice(0, 10);
};
