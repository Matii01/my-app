import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axiosInstance from "../../utils/axiosConfig";
import Dropdown from "../Dropdown/Dropdown";

function AddCarOpinion({ onCancel, carId }) {
  const [opinion, setOpinion] = useState({
    carId: carId,
    title: "",
    text: "",
    mark: 6,
  });

  const options = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
  ];

  const handleChange = (name, value) => {
    setOpinion((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = () => {
    console.log(opinion);
    axiosInstance
      .post(`CarOpinion/create`, JSON.stringify(opinion), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        console.log(data);
        onCancel();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        onCancel();
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.header}>ADDRESS</Text>
          </View>
          <View style={styles.col}>
            <TouchableOpacity onPress={onCancel}>
              <Text>Hide</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.row}>
            <View style={styles.inputGroup}>
              <Text>Title</Text>
              <TextInput
                style={styles.input}
                placeholder="Title"
                value={opinion.title}
                onChangeText={(value) => handleChange("title", value)}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.inputGroup}>
              <Dropdown
                title="Mark"
                onChange={(value) => handleChange("mark", value)}
                options={options}
                currentValue={opinion.mark}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.inputGroup}>
              <Text>Opinion</Text>
              <TextInput
                style={styles.textarea}
                multiline
                numberOfLines={4}
                placeholder="Your opionon "
                value={opinion.text}
                onChangeText={(value) => handleChange("text", value)}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={onSubmit}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default AddCarOpinion;

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    textAlign: "center",
    alignItems: "center",
    width: "100%",
  },
  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 1,
    marginTop: 10,
    marginBottom: 10,
    width: "90%",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  body: {
    // Styles for the body
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  col: {
    width: "50%",
  },
  inputGroup: {
    flex: 1,
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  textarea: {
    marginTop: 5,
    height: 100, // Set height
    justifyContent: "flex-start",
    borderColor: "gray",
    borderWidth: 1,
    textAlignVertical: "top", // This is needed for Android
    padding: 5,
  },
});
