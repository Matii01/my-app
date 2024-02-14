import { useEffect, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Button, DataTable, Divider, Text } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import transformObjectToQueryString from "./../../utils/transformObjectToQueryString";
import axiosInstance from "../../utils/axiosConfig";

function AdditionalImg({ imgs }) {
  const [selectedImg, setSelectedImg] = useState(0);

  const onNext = () => {
    let newIndex = selectedImg + 1;
    if (newIndex >= imgs.length) {
      newIndex = 0;
    }
    setSelectedImg(newIndex);
  };

  const onPrev = () => {
    let newIndex = selectedImg - 1;
    if (newIndex < 0) {
      newIndex = imgs.length - 1;
    }
    setSelectedImg(newIndex);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image source={{ uri: imgs[selectedImg] }} style={{ height: "100%" }} />
      </View>
      <View style={styles.row1}>
        <View style={styles.col}>
          <Button mode="contained" onPress={onPrev}>
            Prev
          </Button>
        </View>
        <View style={styles.col}>
          <Button mode="contained" onPress={onNext}>
            Next
          </Button>
        </View>
      </View>
    </View>
  );
}

export default AdditionalImg;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
  row: {},
  row1: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 15,
    alignSelf: "center",
  },
  col: {
    alignSelf: "center",
    textAlign: "center",
    alignItems: "center",
    width: "50%",
  },
  btn: {
    borderCurve: "circular",
    borderColor: "black",
  },
  text: { padding: 5, paddingStart: 10, fontSize: 25 },
});
