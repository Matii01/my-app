import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

function TechDetailCard({ title, subtitle, icon }) {
  return (
    <>
      <View>
        <View>
          <View>
            <Text>
              <Icon name={icon} size={30} color="#900" />
            </Text>
          </View>

          <View>
            <Text>{subtitle}</Text>
          </View>
          <View>
            <Text>{title}</Text>
          </View>
        </View>
      </View>
    </>
  );
}
export default TechDetailCard;

{
  /* <i className={icon}></i> */
}
