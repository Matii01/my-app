import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import {
  Card,
  Button,
  Text,
  DataTable,
  Divider,
  Portal,
  Modal,
} from "react-native-paper";
import axiosInstance from "../utils/axiosConfig";
import RecommendedCars from "../components/Car/RecomendedCars";

function HomePage({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState({
    homePageImage: "",
    homePageTextOne: "",
    homePageTextTwo: "",
    homePageTitle: "",
  });

  useEffect(() => {
    axiosInstance
      .get(`/ContentManagement/homePage`)
      .then((data) => {
        console.log(data.data);
        setPage(data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (isLoading == true) {
    return (
      <View>
        <Text>Loading ... </Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Card>
        <Card.Cover source={{ uri: `${page.homePageImage}` }} />
        <Card.Title />
        <Card.Content>
          <Text variant="titleLarge">{page.homePageTitle}</Text>
          <Text variant="bodyMedium"></Text>
        </Card.Content>
        <Card.Content>
          <Text>See recomended cars:</Text>
          <RecommendedCars navigation={navigation} />
        </Card.Content>
        <Card.Actions></Card.Actions>
      </Card>
    </ScrollView>
  );
}

export default HomePage;
