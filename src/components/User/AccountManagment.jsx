import { View, StyleSheet, Text, ScrollView } from "react-native";
import ChangePasword from "./ChangePasword";
import ChangePersonalDetails from "./ChangePersonalDetails";

function AccountManagment() {
  return (
    <ScrollView>
      <ChangePasword />
      <Text>---------</Text>
      <ChangePersonalDetails />
    </ScrollView>
  );
}

export default AccountManagment;
