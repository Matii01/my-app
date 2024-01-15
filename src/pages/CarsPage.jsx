import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Button, ToggleButton } from "react-native-paper";
import CarList from "../components/Car/CarList";
import axiosInstance from "../utils/axiosConfig";
import { ScrollView } from "react-native-gesture-handler";
import CarFilter from "../components/Filters/CarFilters";
import Dropdown from "../components/Dropdown/Dropdown";
import Pagination from "../components/Pagination/Pagination";

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
});

function CarsPage({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [metaData, setMetaData] = useState();
  const [cars, setCars] = useState([]);
  const [userWishList, setUserWishList] = useState([]);
  const [filterInfo, setFilterInfo] = useState({
    PageNumber: 1,
    PageSize: 10,
    OrderBy: "",
    Fields: "",
    GearboxTypeId: [],
    ACTypeId: null,
    EngineTypeId: [],
    CarTypeId: [],
    MakeId: [],
    PriceMin: null,
    PriceMax: null,
    MinSeatsNum: null,
  });

  useEffect(() => {
    getFilteredCars();
    getClientWishList();
  }, []);

  useEffect(() => {
    getFilteredCars();
  }, [filterInfo.PageNumber, filterInfo.PageSize]);

  const transformObjectToQueryString = (object) => {
    const obectToString = Object.entries(object)
      .map(([key, value]) => {
        if (key !== null && value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            return value.map((x) => `${key}=${x}&`).join("");
          } else {
            return `${key}=${value}&`;
          }
        }
        return "";
      })
      .join("");
    return obectToString.slice(0, obectToString.length - 1);
  };

  const getClientWishList = () => {
    axiosInstance
      .get("Wishlist")
      .then((data) => {
        setUserWishList(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getFilteredCars = () => {
    setIsLoading(true);
    const queryString = transformObjectToQueryString(filterInfo);

    //axios.get()
    axiosInstance
      .get(`/car/cars?${queryString}`)
      .then((response) => {
        setCars(response.data.items);
        setMetaData(response.data.metaData);
      })
      .catch((error) => {
        console.log(error);
        setCars([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const filterClick = (params) => {
    getFilteredCars(params);
  };

  const handlePageSizeChange = (value) => {
    console.log(value);
    setFilterInfo((prevState) => ({
      ...prevState,
      PageSize: value,
    }));
  };

  const onPageChange = (pageNumber) => {
    console.log("object");
    setFilterInfo((prevState) => ({
      ...prevState,
      PageNumber: pageNumber,
    }));
  };

  const options = [
    { label: "2", value: "2" },
    { label: "5", value: "5" },
    { label: "10", value: "10" },
    { label: "20", value: "20" },
  ];

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  if (isLoading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View
        style={[
          row.container,
          {
            flexDirection: "column",
            flexDirection: "row",
          },
        ]}
      >
        <View style={row.col1}>
          <Button mode="contained" onPress={toggleFilter}>
            =
          </Button>
        </View>
        <View style={row.col1}></View>
        <View style={row.col2}>
          <Dropdown
            title="On Page"
            onChange={handlePageSizeChange}
            options={options}
            currentValue={filterInfo.PageSize}
          />
        </View>
      </View>
      {isFilterOpen && (
        <CarFilter
          filterInfo={filterInfo}
          setFilterInfo={setFilterInfo}
          applayFilterClick={filterClick}
        />
      )}
      <CarList cars={cars} navigation={navigation} wishlist={userWishList} />
      <Pagination paginationData={metaData} pageChange={onPageChange} />
    </ScrollView>
  );
}

const row = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
  },
  col1: {
    flex: 2,
    justifyContent: "center",
  },
  col2: {
    justifyContent: "center",
    alignContent: "center",
  },
});

export default CarsPage;
