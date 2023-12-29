import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { Switch } from "react-native-gesture-handler";

function AccordionComponent({ data, itemsName, name, handleCheckboxChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const renderCheckbox = ({ item }) => (
    <TouchableOpacity
      style={styles.checkboxContainer}
      onPress={() => handleCheckboxChange(item.id)}
    >
      <Text style={styles.checkboxLabel}>{item.name}</Text>
      {/* Add a checkbox icon or image here if desired */}
    </TouchableOpacity>
  );

  const list = data[itemsName].map((item) => (
    <View key={item.id}>
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => handleCheckboxChange(name, item.id)}
      >
        <Text style={styles.checkboxLabel}>{item.name}</Text>
      </TouchableOpacity>
    </View>
  ));

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleAccordion} style={styles.header}>
        <Text>{name}</Text>
        {/* You can add an icon here to indicate the accordion state (open/close) */}
      </TouchableOpacity>
      {isOpen && <View style={styles.body}>{list}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // Container styles
  },
  header: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    // Header styles
  },
  body: {
    // Body styles
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    // Checkbox container styles
  },
  checkboxLabel: {
    marginLeft: 10,
    // Checkbox label styles
  },
});

export default AccordionComponent;
