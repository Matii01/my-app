import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import MyDatePicker from "../DatePicker/MyDatePicker";
import transformObjectToQueryString from "./../../utils/transformObjectToQueryString";
import axiosInstance from "../../utils/axiosConfig";

function BookCar({ carId, excludedDates, navigation }) {
  const [error, setError] = useState(false);
  const [cost, setCost] = useState("");
  const [reservationData, setReservationDate] = useState({
    carId: carId,
    DateFrom: "",
    DateTo: "",
  });

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
        setCost(data.data);
        setError(false);
      })
      .catch((error) => {
        setError(true);
        console.log(error);
      });
  };

  const isDatesValid = () => {
    excludedDates.forEach((element) => {
      if (
        new Date(reservationData.DateFrom) <= new Date(element.rentalStart) &&
        new Date(reservationData.DateTo) >= new Date(element.rentalEnd)
      ) {
        setError(true);
        return;
      } else {
        setError(false);
      }
    });
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
    navigation.navigate("Rental", { reservation: reservationData });
  };

  const goToDetails = (id) => {
    navigation.navigate("CarDetails", { carId: id });
  };

  const bookCar = () => {
    axiosInstance
      .post(`Rental/IsDateAvailable`, JSON.stringify(reservationData), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        console.log(data);
        if (data.data === true) {
          navigation(
            `/car/reservation/${carId}?from=${reservationData.DateFrom}&to=${reservationData.DateTo}`
          );
        } else {
          console.log("choose other dates");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <View>
        <View>
          <MyDatePicker
            onBlur={isDatesValid}
            onChange={handleDate}
            excludedDate={excludedDates}
          />
        </View>
        <View>{cost && <Text>Price: {cost}</Text>}</View>
        <View style={styles.row}>
          <Button onPress={onSubmit} title="Book" disabled={error == true} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
  row: {
    margin: 4,
    padding: 2,
  },
});

export default BookCar;
