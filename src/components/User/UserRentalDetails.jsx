import { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AddCarOpinion from "./AddCarOpinion";

function UserRentalDetails({ onGoBackClick, rentalDetail }) {
  const [showAddOption, setShowAddOpinion] = useState(false);
  const formatDate = (date) => {
    return date.slice(0, 10);
  };

  const handleDownload = () => {
    console.log("try to download");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.row}>
        <View style={styles.col}>
          <Image source={{ uri: rentalDetail.carImg }} style={styles.image} />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.col1}>
          <Text style={styles.text}>From:</Text>
        </View>
        <View style={styles.col1}>
          <Text style={styles.text}>
            {formatDate(rentalDetail.rentalStart)}
          </Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.col1}>
          <Text style={styles.text}>To:</Text>
        </View>
        <View style={styles.col1}>
          <Text style={styles.text}>{formatDate(rentalDetail.rentalEnd)}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.col1}>
          <Text style={styles.text}>Status</Text>
        </View>
        <View style={styles.col1}>
          <Text style={styles.text}>{rentalDetail.status}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.col1}>
          <Text style={styles.text}>Price</Text>
        </View>
        <View style={styles.col1}>
          <Text style={styles.text}>{rentalDetail.totalPrice}</Text>
        </View>
      </View>
      <View>
        <View>
          {showAddOption && (
            <AddCarOpinion
              style={styles.center}
              carId={rentalDetail.carId}
              onCancel={() => setShowAddOpinion(false)}
            />
          )}
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.col1}>
          <TouchableOpacity style={styles.button} onPress={onGoBackClick}>
            <Text>GoBack</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.col1}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setShowAddOpinion(true)}
          >
            <Text>Add opinion</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default UserRentalDetails;

const styles = StyleSheet.create({
  container: { marginBottom: 10 },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  col: {
    alignSelf: "center",
    textAlign: "center",
    alignItems: "center",
    width: "100%",
  },
  col1: {
    alignSelf: "center",
    textAlign: "center",
    alignItems: "center",
    width: "50%",
  },
  text: {
    fontSize: 21,
  },
  btn: {
    width: "90%",
    width: 100,
  },
  button: {
    backgroundColor: "#007bff",
    width: "90%",
    padding: 10,
    borderRadius: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 200,
  },
});
