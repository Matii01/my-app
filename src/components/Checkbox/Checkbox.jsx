import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

function Checkbox({ text, onPress }) {
  const [isCheck, setIsCheck] = useState(false);

  const onClick = () => {
    setIsCheck(!isCheck);
    onPress();
  };

  return (
    <View>
      <TouchableOpacity
        style={(styles.checkboxContainer, isCheck && styles.activeBorder)}
        onPress={onClick}
      >
        <Text style={styles.checkboxLabel}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // Container styles
  },
  activeBorder: {
    backgroundColor: "lightgray",
    borderColor: "green",
    color: "red",
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
  button: {
    paddingStart: 10,
    paddingEnd: 10,
  },
});

export default Checkbox;
