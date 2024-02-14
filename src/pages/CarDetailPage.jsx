import { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import {
  Card,
  Text,
  Button,
  List,
  MD3Colors,
  Modal,
  Portal,
} from "react-native-paper";
import axiosInstance from "../utils/axiosConfig";
import Pricelist from "../components/Car/Pricelist";
import CarOpinionList from "../components/Car/CarOpinion";
import BookCarContent from "../components/Car/BookCarContent";

function CarDetails({ route, navigation }) {
  const { carId } = route.params;
  const [car, setCar] = useState({});
  const [visible, setVisible] = useState(false);
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

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20, margin: 20 };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
          >
            <View style={{ height: "75%" }}>
              <BookCarContent
                carId={carId}
                excludedDates={car.excludedDates}
                navigation={navigation}
                hide={hideModal}
              />
            </View>
          </Modal>
        </Portal>
        <Card style={{ margin: 5 }}>
          <Card.Cover source={{ uri: url }} />
          <Card.Title title={car.name} />
          <Card.Content>
            <List.Item
              title={"air: " + car.ac}
              left={() => (
                <List.Icon color={MD3Colors.tertiary70} icon="folder" />
              )}
            />
            <List.Item
              title={"engine: " + car.engine}
              left={() => (
                <List.Icon color={MD3Colors.tertiary70} icon="folder" />
              )}
            />
            <List.Item
              title={"gerbox: " + car.gearbox}
              left={() => (
                <List.Icon color={MD3Colors.tertiary70} icon="folder" />
              )}
            />
          </Card.Content>
          <Card.Content>
            <Text variant="bodyMedium">{car.description}</Text>
          </Card.Content>
          <Card.Actions>
            <Button onPress={showModal}>Book</Button>
          </Card.Actions>
        </Card>
        <View>
          <Card>
            <Card.Title title="Car equipment" />
            <Card.Content>
              {car.carEquipment &&
                car.carEquipment.length > 0 &&
                car.carEquipment.map((it) => (
                  <Text key={it.id}>{it.name}</Text>
                ))}
            </Card.Content>
          </Card>
        </View>
        <View>
          <Pricelist id={carId} />
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

/*
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
    <MyAccordion title={"Zamów"}>
      <BookCar
        carId={carId}
        excludedDates={car.excludedDates}
        navigation={navigation}
      />
    </MyAccordion>
  </View>
*/
