import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosConfig";
import AddressComponent from "./AddressComponent";
import { ScrollView } from "react-native-gesture-handler";

function ChangeAddress() {
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axiosInstance.get(`/Users/GEtUserAddresses`).then((response) => {
      console.log(response);
      setAddresses(response.data);
    });
  };

  const onAdd = () => {
    getData();
  };

  return (
    <>
      <ScrollView>
        {addresses &&
          addresses.map((item, index) => (
            <AddressComponent key={index} address={item} onAdd={onAdd} />
          ))}
        <AddressComponent onAdd={onAdd} />
      </ScrollView>
    </>
  );
}
export default ChangeAddress;
