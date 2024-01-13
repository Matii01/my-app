import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { View, Button, Platform } from "react-native";

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
    <View>
      <View>
        <Button
          onPress={() => setShowStartPicker(true)}
          title="Select Start Date"
        />
        {showStartPicker && (
          <DateTimePicker value={startDate} onChange={onStartDateChange} />
        )}
      </View>
      <View>
        <Button
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

export default MyDatePicker;
