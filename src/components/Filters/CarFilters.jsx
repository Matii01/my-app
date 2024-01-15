import { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Text } from "react-native-paper";
import axiosInstance from "../../utils/axiosConfig";
import MyAccordion from "../AccordionComponent/MyAccordion";
import Checkbox from "../Checkbox/Checkbox";

function CarFilter({ filterInfo, setFilterInfo, applayFilterClick }) {
  const [data, setData] = useState();
  const [priceError, setPriceError] = useState(null);

  useEffect(() => {
    if (filterInfo.PriceMax === null || filterInfo.PriceMin === null) {
      return;
    }
    if (filterInfo.PriceMax < filterInfo.PriceMin) {
      setPriceError("Min price can't exceed Max price");
    } else {
      setPriceError(null);
    }
  }, [filterInfo.PriceMax, filterInfo.PriceMin]);

  useEffect(() => {
    axiosInstance
      .get("/car/CarSortingInfo")
      .then((data) => {
        setData(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleCheckboxChange = (name, id) => {
    console.log(name + ": " + id);

    let selected = [...filterInfo[name]];
    if (selected.includes(id)) {
      selected = filterInfo[name].filter((item) => item !== id);
    } else {
      selected = [...filterInfo[name], id];
    }
    setFilterInfo((prev) => ({
      ...prev,
      [name]: selected,
    }));
    console.log(selected);
  };

  const handlePriceChange = () => {
    console.log("price change");
  };

  const applayFilters = () => {
    applayFilterClick();
  };

  return (
    <>
      <View>
        <MyAccordion title="Make">
          {data &&
            data.carMakes.map((item) => (
              <View key={item.id}>
                <Checkbox
                  text={item.name}
                  onPress={() => handleCheckboxChange("MakeId", item.id)}
                />
              </View>
            ))}
        </MyAccordion>
        <MyAccordion title="Gearbox Type">
          {data &&
            data.gearboxType.map((item) => (
              <View key={item.id}>
                <Checkbox
                  text={item.name}
                  onPress={() => handleCheckboxChange("GearboxTypeId", item.id)}
                />
              </View>
            ))}
        </MyAccordion>
        <MyAccordion title="Engine Type">
          {data &&
            data.engineType.map((item) => (
              <View key={item.id}>
                <Checkbox
                  text={item.name}
                  onPress={() => handleCheckboxChange("EngineTypeId", item.id)}
                />
              </View>
            ))}
        </MyAccordion>
        <MyAccordion title="Body Type">
          {data &&
            data.carType.map((item) => (
              <View key={item.id}>
                <Checkbox
                  text={item.name}
                  onPress={() => handleCheckboxChange("CarTypeId", item.id)}
                />
              </View>
            ))}
        </MyAccordion>
        <View style={styles.button}>
          <Button title="Applay filters" onPress={applayFilters} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // Container styles
  },
  header: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    // Header styles
  },
  body: {
    // Body styles
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    // Checkbox container styles
  },
  checkboxLabel: {
    marginLeft: 10,
    // Checkbox label styles
  },
  button: {
    paddingStart: 10,
    paddingEnd: 10,
  },
});

export default CarFilter;
