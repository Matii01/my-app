import React, { useEffect } from "react";
import { Text, View } from "react-native";
import UserRentalList from "./UserRentalList";
import UserRentalDetails from "./UserRentalDetails";
import axiosInstance from "../../utils/axiosConfig";

function UserRental() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [showDetails, setShowDetails] = React.useState(false);
  const [rentalDetailData, setRentalDetailData] = React.useState({});
  const [rentalList, setRentalList] = React.useState([]);

  useEffect(() => {
    setIsLoading(true);
    axiosInstance
      .get(`/rental/UserRental`)
      .then((data) => {
        console.log(data.data);
        setRentalList(data.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const getRentalDetails = (id) => {
    setIsLoading(true);
    axiosInstance
      .get(`/rental/UserRental/${id}`)
      .then((data) => {
        console.log(data);
        setRentalDetailData(data.data);
        setShowDetails(true);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onDetailsClick = (id) => {
    getRentalDetails(id);
  };

  const onGoBackClick = () => {
    setShowDetails(false);
  };

  return (
    <View>
      {!showDetails && (
        <UserRentalList items={rentalList} onDetailsClick={onDetailsClick} />
      )}
      {showDetails && !isLoading && (
        <UserRentalDetails
          onGoBackClick={onGoBackClick}
          rentalDetail={rentalDetailData}
        />
      )}
    </View>
  );
}

export default UserRental;
