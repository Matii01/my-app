import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View,
} from "react-native";
import { Button, Card, Text, Surface, Divider } from "react-native-paper";
import transformObjectToQueryString from "../utils/transformObjectToQueryString";
import axiosInstance from "../utils/axiosConfig";
import NotificationDetails from "../components/Notifications/NotificationsDetails";

const initialParams = {
  PageNumber: 1,
  PageSize: 10,
  CreatedStart: " ",
  CreatedEnd: "",
  IsRead: "",
};

function NotificationsPage({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [items, setItems] = useState([]);
  const [metaData, setMetaData] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [params, setParams] = useState(initialParams);

  useEffect(() => {
    getNotification();
  }, []);

  useEffect(() => {
    if (params.PageNumber != 1) {
      getNotificationAndAppend();
    }
  }, [params.PageNumber]);

  const onRefresh = useCallback(() => {
    getNotification();
  }, []);

  const getNotification = () => {
    const queryString = transformObjectToQueryString(initialParams);
    axiosInstance
      .get(`/Notification/myNotification?${queryString}`)
      .then((data) => {
        transformAndSetItems(data.data.items);
        setMetaData(data.data.metaData);
        setLoading(false);
        setParams((prev) => ({
          ...prev,
          PageNumber: 1,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getNotificationAndAppend = () => {
    const queryString = transformObjectToQueryString(params);
    axiosInstance
      .get(`/Notification/myNotification?${queryString}`)
      .then((data) => {
        transformAndAppendItems(data.data.items);
        setMetaData(data.data.metaData);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const transformAndSetItems = (newData) => {
    console.log(newData);
    const transformed = newData.map((it) => ({
      ...it,
      createdDate: formDate(it.createdDate),
      isRead: it.isRead == true ? "odczytany" : "nie odczytany",
    }));
    setItems(transformed);
  };

  const transformAndAppendItems = (newData) => {
    const transformed = newData.map((it) => ({
      ...it,
      createdDate: formDate(it.createdDate),
      isRead: it.isRead == true ? "odczytany" : "nie odczytany",
    }));

    const newList = [...items, ...transformed];

    setItems(newList);
  };

  const formDate = (data) => {
    return data.slice(0, 10);
  };

  const onSelectNotification = (it) => {
    setSelectedItem(it);
    setShowDetails(true);
  };

  const removeItem = (id) => {
    const list = items.filter((it) => it.id != id);
    setItems(list);
  };

  const updateStatus = (id) => {
    const list = items.map((item) => {
      if (item.id == id) {
        return {
          ...item,
          isRead: "odczytany",
        };
      } else {
        return item;
      }
    });
    setItems(list);
  };

  const loadNextData = () => {
    if (metaData.hasNext == true) {
      setLoading(true);
      setParams((prev) => ({
        ...prev,
        PageNumber: params.PageNumber + 1,
      }));
    }
  };

  return (
    <View>
      {!showDetails && items && (
        <>
          <FlatList
            style={{ marginTop: 5 }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <>
                <Card
                  key={item.id}
                  style={{ marginBottom: 10 }}
                  onPress={() => onSelectNotification(item)}
                >
                  <Card.Title title={item.title} />
                  <Card.Content>
                    <Text>{item.createdDate}</Text>
                    <Text>{item.isRead}</Text>
                  </Card.Content>
                </Card>
              </>
            )}
            onEndReached={loadNextData}
            ListFooterComponent={() =>
              loading && <ActivityIndicator size="large" />
            }
          />
        </>
      )}

      {showDetails && (
        <NotificationDetails
          item={selectedItem}
          onGoBack={() => setShowDetails(false)}
          onMessageRead={updateStatus}
        />
      )}
    </View>
  );
}

export default NotificationsPage;

/* 
{showDetails && (
    <Card style={{ margin: 5, borderWidth: 0 }}>
        {items &&
        items.map((it) => (
            <Card
            key={it.id}
            style={{ marginBottom: 10 }}
            onPress={() => onSelectNotification(it)}
            >
            <Card.Title title={it.title} />
            <Card.Content>
                <Text>{it.createdDate}</Text>
            </Card.Content>
            </Card>
        ))}
    </Card>
    )}
*/
