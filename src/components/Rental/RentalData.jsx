import { useEffect, useState } from "react";
import axiosInstance from "./../../utils/axiosConfig";
import { View } from "react-native";
import { Button, Card, Text, TextInput } from "react-native-paper";

function RentalData({ allRentalData, setAllRentalData }) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUserDate();
  }, []);

  const getUserDate = () => {
    setIsLoading(true);
    axiosInstance
      .get(`Users/GetDefaultDataForRental`)
      .then((response) => {
        setAllRentalData((prev) => ({
          ...prev,
          ClientDetails: {
            ...prev.ClientDetails,
            FirstName: response.data.firstName,
            LastName: response.data.lastName,
            Email: response.data.email,
            PhoneNumber: response.data.phoneNumber,
            Address: response.data.address,
            PostCode: response.data.postCode,
            City: response.data.city,
          },
        }));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleChange = (name, value) => {
    //console.log(name + " " + value);
    const keys = name.split(".");

    if (keys.length > 1) {
      setAllRentalData((prev) => ({
        ...prev,
        [keys[0]]: {
          ...prev[keys[0]],
          [keys[1]]: value,
        },
      }));
    } else {
      setAllRentalData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  if (isLoading) {
    return <Text>loading ... </Text>;
  }

  /* 
   NewRentalForClient: {
      CarId: reservation.carId,
      DateFrom: reservation.DateFrom,
      DateTo: reservation.DateTo,
      */
  return (
    <Card style={{ margin: 5 }}>
      <Card.Title title="Customer details" />
      <Card.Content>
        <TextInput
          label="First Name"
          value={allRentalData.ClientDetails.FirstName}
          onChangeText={(value) =>
            handleChange("ClientDetails.FirstName", value)
          }
        />
        <TextInput
          label="Last Name"
          name="ClientDetails.LastName"
          value={allRentalData.ClientDetails.LastName}
          onChangeText={(value) =>
            handleChange("ClientDetails.LastName", value)
          }
        />
        <TextInput
          label="Email"
          name="ClientDetails.Email"
          value={allRentalData.ClientDetails.Email}
          onChangeText={(value) => handleChange("ClientDetails.Email", value)}
        />
        <TextInput
          label="Phone"
          name="ClientDetails.PhoneNumber"
          value={allRentalData.ClientDetails.PhoneNumber}
          onChangeText={(value) =>
            handleChange("ClientDetails.PhoneNumber", value)
          }
        />
        <TextInput
          label="Address"
          name="ClientDetails.Address"
          value={allRentalData.ClientDetails.Address}
          onChangeText={(value) => handleChange("ClientDetails.Address", value)}
        />
        <TextInput
          label="Post Code"
          name="ClientDetails.PostCode"
          value={allRentalData.ClientDetails.PostCode}
          onChangeText={(value) =>
            handleChange("ClientDetails.PostCode", value)
          }
        />
        <TextInput
          label="City"
          name="ClientDetails.City"
          value={allRentalData.ClientDetails.City}
          onChangeText={(value) => handleChange("ClientDetails.City", value)}
        />
      </Card.Content>
    </Card>
  );
}

export default RentalData;
