import React, { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import { View, Text, StyleSheet } from "react-native";
//import { Picker } from "@react-native-picker/picker";

const Dropdown = ({ title, onChange, options, currentValue }) => {
  const [selectedValue, setSelectedValue] = useState(currentValue);

  const onValueChange = (value) => {
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <View
      style={[
        styles.container,
        {
          // Try setting `flexDirection` to `"row"`.
          flexDirection: "column",
          flexDirection: "row",
        },
      ]}
    >
      <View style={styles.col}></View>
      <View style={styles.col1}>
        <Text>{title}: </Text>
      </View>
      <View style={styles.col1}>
        <RNPickerSelect
          items={options}
          onValueChange={(value) => onValueChange(value)}
          value={selectedValue}
          style={pickerSelectStyle}
          useNativeAndroidPickerStyle={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  col: {
    flex: 1,
  },
  col1: {
    justifyContent: "center",
  },
  col2: {
    justifyContent: "center",
    alignContent: "center",
  },
});

const pickerSelectStyle = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "white",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  placeholder: {
    color: "black",
    fontSize: 15,
  },
  iconContainer: {
    top: 5,
    right: 15,
  },
  items: {},
});

export default Dropdown;
