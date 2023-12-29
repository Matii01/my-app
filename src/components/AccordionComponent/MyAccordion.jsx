import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const MyAccordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View style={styles.accordion}>
      <TouchableOpacity onPress={toggleAccordion} style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
      </TouchableOpacity>
      {isOpen && <View style={styles.content}>{children}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  accordion: {
    margin: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  header: {
    padding: 15,
    backgroundColor: "#f7f7f7",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  headerText: {
    fontWeight: "bold",
  },
  content: {
    padding: 15,
  },
});

export default MyAccordion;
