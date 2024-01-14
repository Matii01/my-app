import { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import axiosInstance from "../utils/axiosConfig";
import TechDetailCard from "../components/Car/TechDetailCard";
import Pricelist from "../components/Car/Pricelist";
import CarOpinionList from "../components/Car/CarOpinion";
import MyAccordion from "../components/AccordionComponent/MyAccordion";
import BookCar from "../components/Car/BookCar";

function CarDetails({ route, navigation }) {
  const { carId } = route.params;
  const [car, setCar] = useState({});
  useEffect(() => {
    axiosInstance
      .get(`Car/details/${carId}`)
      .then((data) => {
        setCar(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [carId]);

  let url = car.pictureUrl;
  if (car.pictureUrl === "") {
    url =
      "https://cdn.pixabay.com/photo/2012/11/02/13/02/car-63930_960_720.jpg%201x,%20https://cdn.pixabay.com/photo/2012/11/02/13/02/car-63930_1280.jpg";
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Image source={{ uri: car.pictureUrl }} style={styles.image} />
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <TechDetailCard
              title={car.ac}
              subtitle={"klimatyzacja"}
              icon={"rocket"}
            />
          </View>
          <View style={styles.col}>
            <TechDetailCard
              title={car.engine}
              subtitle={"silnik"}
              icon={"rocket"}
            />
          </View>
          <View style={styles.col}>
            <TechDetailCard
              title={car.gearbox}
              subtitle={"skrzynia biegów"}
              icon={"rocket"}
            />
          </View>
        </View>
        <View style={styles.row}>
          <Text>{car.description}</Text>
        </View>
        <View>
          <Pricelist id={carId} />
        </View>
        <View>
          <MyAccordion title={"Zamów"}>
            <BookCar
              carId={carId}
              excludedDates={car.excludedDates}
              navigation={navigation}
            />
          </MyAccordion>
        </View>
        <View>
          <CarOpinionList carId={carId} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
    alignSelf: "center",
  },
  col: {
    alignSelf: "center",
    textAlign: "center",
    alignItems: "center",
    width: "33%",
  },
  image: {
    width: 360,
    height: 200,
    marginRight: 10,
  },
});

export default CarDetails;
