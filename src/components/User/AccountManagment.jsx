import { View, StyleSheet, Text, ScrollView } from "react-native";
import ChangePasword from "./ChangePasword";
import ChangePersonalDetails from "./ChangePersonalDetails";

function AccountManagment() {
  return (
    <ScrollView>
      <ChangePasword style={{ margin: 5 }} />
      <ChangePersonalDetails style={{ margin: 5, marginTop: 10 }} />
    </ScrollView>
  );
}

export default AccountManagment;
