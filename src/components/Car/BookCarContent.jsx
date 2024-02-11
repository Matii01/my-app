import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, DataTable, Divider, Text } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import transformObjectToQueryString from "./../../utils/transformObjectToQueryString";
import axiosInstance from "../../utils/axiosConfig";

function BookCarContent({ carId, excludedDates, navigation, hide }) {
  /// chooseData
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  /// chooseEnd

  /// bookCar
  const [error, setError] = useState(false);
  const [cost, setCost] = useState("");
  const [reservationData, setReservationDate] = useState({
    carId: carId,
    DateFrom: "",
    DateTo: "",
  });
  /// bookCarEnd

  /// chooseData
  const onStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartPicker(false);
    setStartDate(currentDate);
    handleDate("DateFrom", formatAndStoreDate(currentDate));
  };

  const onEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndPicker(false);
    setEndDate(currentDate);
    handleDate("DateTo", formatAndStoreDate(currentDate));
  };

  const formatAndStoreDate = (date) => {
    let formatted = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
    return formatted;
  };
  /// chooseEnd

  /// BookCar
  useEffect(() => {
    if (reservationData.DateFrom < reservationData.DateTo) {
      console.log(reservationData);
      checkPrice();
      isDatesValid();
    }
  }, [reservationData.DateFrom, reservationData.DateTo]);

  const checkPrice = () => {
    console.log("check price ");
    const queryString = transformObjectToQueryString(reservationData);
    axiosInstance
      .get(`Rental/CheckPriceForClient?${queryString}`)
      .then((data) => {
        console.log(data.data);
        setCost(data.data);

        //setError(false);
      })
      .catch((error) => {
        setError(true);
        console.log(error);
      });
  };

  const isDatesValid = () => {
    let errorCount = 0;
    console.log(excludedDates);
    excludedDates.forEach((element) => {
      if (
        !(
          (new Date(reservationData.DateFrom) > new Date(element.rentalEnd) &&
            new Date(reservationData.DateTo) > new Date(element.rentalEnd)) ||
          (new Date(reservationData.DateFrom) < new Date(element.rentalStart) &&
            new Date(reservationData.DateTo) < new Date(element.rentalStart))
        )
      ) {
        errorCount++;
      }
    });

    if (errorCount > 0) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const handleDate = (name, value) => {
    console.log(name + " " + value);
    setReservationDate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = () => {
    console.log("new reservation ");
    console.log(reservationData);
    hide();
    navigation.navigate("Rental", {
      reservation: reservationData,
      excludedDates: excludedDates,
    });
  };
  /// BookCarEnd

  return (
    <View style={styles.container}>
      <View>
        <DataTable style={{ marginLeft: 10, marginBottom: 20 }}>
          <Divider />
          {reservationData.DateFrom && (
            <DataTable.Row>
              <DataTable.Cell>From</DataTable.Cell>
              <DataTable.Cell>{reservationData.DateFrom}</DataTable.Cell>
            </DataTable.Row>
          )}
          {reservationData.DateTo && (
            <DataTable.Row>
              <DataTable.Cell>To</DataTable.Cell>
              <DataTable.Cell>{reservationData.DateTo}</DataTable.Cell>
            </DataTable.Row>
          )}
          <Divider />
        </DataTable>
      </View>
      <View>{error && <Text>The dates are busy, select others</Text>}</View>
      <View style={styles.row}>
        <Button
          mode="contained"
          style={styles.btn}
          onPress={() => setShowStartPicker(true)}
          title="Select Start Date"
        >
          Select Start Date
        </Button>
        {showStartPicker && (
          <DateTimePicker value={startDate} onChange={onStartDateChange} />
        )}
      </View>
      <View style={styles.row}>
        <Button
          mode="contained"
          style={styles.btn}
          onPress={() => setShowEndPicker(true)}
        >
          Select End Date
        </Button>
        {showEndPicker && (
          <DateTimePicker value={endDate} onChange={onEndDateChange} />
        )}
      </View>
      <View>{cost && <Text style={styles.text}>Price: {cost}</Text>}</View>
      <View style={styles.row}>
        <Button
          mode="outlined"
          style={styles.btn}
          onPress={onSubmit}
          disabled={error === true}
        >
          Book
        </Button>
      </View>
    </View>
  );
}

export default BookCarContent;

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
    borderCurve: "circular",
    borderColor: "black",
  },
  text: { padding: 5, paddingStart: 10, fontSize: 25 },
});
