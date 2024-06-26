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
      isDatesValid();
      checkPrice();
    }
  }, [reservationData.DateFrom, reservationData.DateTo]);

  const checkPrice = () => {
    console.log("check price ");
    const queryString = transformObjectToQueryString(reservationData);
    axiosInstance
      .get(`Rental/CheckPriceForClient?${queryString}`)
      .then((data) => {
        console.log("ok: ");
        setCost(data.data);
        console.log(data.data);
        setError(false);
      })
      .catch((error) => {
        console.log("error");
        setError(true);
        console.log(error);
      })
      .finally(() => {
        console.log("end");
      });
  };

  const isDatesValid = () => {
    console.log("check dates");
    excludedDates.forEach((element) => {
      if (
        new Date(reservationData.DateFrom) <= new Date(element.rentalStart) &&
        new Date(reservationData.DateTo) >= new Date(element.rentalEnd)
      ) {
        setError(true);
        console.log("date error");
        return;
      } else {
        console.log("date ok");
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
      <View style={{ height: 100 }}>
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
