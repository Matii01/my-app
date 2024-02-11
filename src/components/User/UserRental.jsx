import React, { useEffect } from "react";
import { Text, View } from "react-native";
import UserRentalList from "./UserRentalList";
import UserRentalDetails from "./UserRentalDetails";
import axiosInstance from "../../utils/axiosConfig";
import transformObjectToQueryString from "../../utils/transformObjectToQueryString";
import Pagination from "../Pagination/Pagination";

function UserRental() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [showDetails, setShowDetails] = React.useState(false);
  const [rentalDetailData, setRentalDetailData] = React.useState({});
  const [rentalList, setRentalList] = React.useState([]);
  const [metaData, setMetaData] = React.useState({});
  const [filterInfo, setFilterInfo] = React.useState({
    PageNumber: 1,
    PageSize: 10,
  });

  useEffect(() => {
    const queryString = transformObjectToQueryString(filterInfo);
    setIsLoading(true);
    axiosInstance
      .get(`/rental/UserRental?${queryString}`)
      .then((data) => {
        console.log(data.data);
        setMetaData(data.data.metaData);
        setRentalList(data.data.items);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [filterInfo.PageNumber, filterInfo.PageSize]);

  const getRentalDetails = (id) => {
    setIsLoading(true);
    axiosInstance
      .get(`/rental/UserRental/${id}`)
      .then((data) => {
        console.log(data.data);
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

  const onPageChange = (pageNumber) => {
    console.log("object");
    setFilterInfo((prevState) => ({
      ...prevState,
      PageNumber: pageNumber,
    }));
  };

  const onDetailsClick = (id) => {
    getRentalDetails(id);
  };

  const onGoBackClick = () => {
    setShowDetails(false);
  };

  return (
    <View>
      {!showDetails && !isLoading && (
        <>
          <UserRentalList
            items={rentalList}
            onDetailsClick={onDetailsClick}
            paginationData={metaData}
            pageChange={onPageChange}
          />
        </>
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
