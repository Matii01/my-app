import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Button, Checkbox } from "react-native-paper";

function MyCheckbox({ itemId, text, onPress, selectedCheckbox }) {
  const [isCheck, setIsCheck] = useState(false);

  useEffect(() => {
    if (selectedCheckbox.includes(itemId)) {
      setIsCheck(true);
    }
  }, [selectedCheckbox]);

  const onClick = () => {
    setIsCheck(!isCheck);
    onPress();
  };

  return (
    <View style={styles.row}>
      <View style={styles.col}>
        <Text style={styles.text}>{text}</Text>
      </View>
      <View style={styles.col}>
        <Checkbox
          status={isCheck ? "checked" : "unchecked"}
          onPress={onClick}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignSelf: "start",
  },
  col: {
    marginEnd: 15,
  },
  text: {
    marginTop: 8,
  },
});

export default MyCheckbox;
