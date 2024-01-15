import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { DataTable } from "react-native-paper";
import { Card, Text, Button, List, MD3Colors } from "react-native-paper";
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
    return (
      <>
        <Text>PriceList</Text>
      </>
    );
  }

  return (
    <>
      <Card style={{ margin: 5 }}>
        <Card.Title title="Price list" />
        <Card.Content>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>ID</DataTable.Title>
              <DataTable.Title>Days</DataTable.Title>
              <DataTable.Title>Price</DataTable.Title>
            </DataTable.Header>
            {pricelist.map((item) => (
              <DataTable.Row key={item.id}>
                <DataTable.Cell>1</DataTable.Cell>
                <DataTable.Cell>{item.days}</DataTable.Cell>
                <DataTable.Cell>{item.price * item.days} PLN</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </Card.Content>
      </Card>
    </>
  );
}

export default Pricelist;

/*
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
*/
