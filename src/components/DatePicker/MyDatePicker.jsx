import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { View, Button, Platform, StyleSheet } from "react-native";

const MyDatePicker = ({ onChange, excludedDate, onBlur }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const onStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartPicker(false);
    setStartDate(currentDate);
    onChange("DateFrom", formatAndStoreDate(currentDate));
  };

  const onEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndPicker(false);
    setEndDate(currentDate);
    onChange("DateTo", formatAndStoreDate(currentDate));
  };

  const formatAndStoreDate = (date) => {
    let formatted = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
    return formatted;
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Button
          style={styles.btn}
          onPress={() => setShowStartPicker(true)}
          title="Select Start Date"
        />
        {showStartPicker && (
          <DateTimePicker value={startDate} onChange={onStartDateChange} />
        )}
      </View>
      <View style={styles.row}>
        <Button
          style={styles.btn}
          onPress={() => setShowEndPicker(true)}
          title="Select End Date"
        />
        {showEndPicker && (
          <DateTimePicker value={endDate} onChange={onEndDateChange} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
  row: {
    margin: 4,
    padding: 2,
  },
  col: {
    alignSelf: "center",
    textAlign: "center",
    alignItems: "center",
  },
  btn: {
    width: "100%",
    padding: 5,
    margin: 5,
    backgroundColor: "red",
    borderCurve: "circular",
  },
});

export default MyDatePicker;
