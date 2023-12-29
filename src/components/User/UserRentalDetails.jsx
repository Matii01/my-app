import { View, Text, Button } from "react-native";

function UserRentalDetails({ onGoBackClick, rentalDetail }) {
  return (
    <View>
      <Text>{rentalDetail.carName}</Text>
      <Button onPress={onGoBackClick} title="GoBack" />
    </View>
  );
}

export default UserRentalDetails;
