import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";
import CarList from "../components/Car/CarList";
import config from "../../config";
import axiosInstance from "../utils/axiosConfig";

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
  const [metaData, setMetaData] = useState();
  const [cars, setCars] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isGridView, setIsGridView] = useState(true);
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
  }, []);

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

  const getFilteredCars = () => {
    setIsLoading(true);
    const queryString = transformObjectToQueryString(filterInfo);

    //fetch(`https://192.168.0.104:44363/car/cars?${queryString}`)r

    //axios.get()
    axiosInstance
      .get(`/car/cars?${queryString}`)
      .then((response) => {
        console.log(response.data);
        setCars(response.data.items);
        setMetaData(response.data.items);
      })
      .catch((error) => {
        console.log(error);
        setCars([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }
  return <CarList cars={cars} navigation={navigation} />;
}
export default CarsPage;

// fetch(`${config.API_URL}/car/cars?${queryString}`)
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error("An Error");
//     }
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data.items);
//     setCars(data.items);
//     setMetaData(data.metaData);
//   })
//   .catch((error) => {
//     console.log(error);
//     setCars([]);
//   })
//   .finally(() => {
//     setIsLoading(false);
//   });
