import { useEffect } from "react";
import { ScrollView } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import axiosInstance from "../../utils/axiosConfig";

function NotificationDetails({ item, onGoBack, onMessageRead }) {
  useEffect(() => {
    readMessage();
  }, [item]);

  const readMessage = () => {
    axiosInstance
      .post(`Notification/read/${item.id}`)
      .then((data) => {
        onMessageRead(item.id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ScrollView>
      <Card style={{ margin: 5 }}>
        <Card>
          <Card.Title
            title={item.title}
            subtitle={item.createdDate}
            right={() => <Button onPress={onGoBack}>Go Back</Button>}
          />
          <Card.Content>
            <Text>{item.message}</Text>
          </Card.Content>
          <Card.Actions></Card.Actions>
        </Card>
      </Card>
    </ScrollView>
  );
}

export default NotificationDetails;
