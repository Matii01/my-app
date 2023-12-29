import React from "react";
import { Text, View, useWindowDimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";

function UserRentals() {
  return (
    <View>
      <Text>Rentals</Text>
    </View>
  );
}

function AccountManagment() {
  return (
    <View>
      <Text>AccountManagment</Text>
    </View>
  );
}

function Address() {
  return (
    <View>
      <Text>Address</Text>
    </View>
  );
}

function SecondRoute() {
  return (
    <View>
      <Text>SecondRoure</Text>
    </View>
  );
}

function FirstRoute() {
  return (
    <View>
      <Text>FirstRoute</Text>
    </View>
  );
}

const renderScene = SceneMap({
  rentals: UserRentals,
  account: AccountManagment,
  address: Address,
});

function UserPage() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "rentals", title: "Rentals" },
    { key: "account", title: "Account" },
    { key: "address", title: "Address" },
  ]);

  return (
    <>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </>
  );
}
export default UserPage;
