import { useEffect, useState } from "react";
import { IconButton, Text } from "react-native-paper";
import axiosInstance from "../../utils/axiosConfig";

function AddToWishList({ carId, wishlist }) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (wishlist.some((item) => item.carId === carId)) {
      setIsSaved(true);
    }
  }, []);

  const onSaveClick = () => {
    console.log(wishlist);
    if (!isSaved) {
      addToWishList();
    } else {
      removeFromWishList();
    }
  };

  const addToWishList = () => {
    axiosInstance
      .post(`Wishlist/add`, JSON.stringify({ CarId: carId }), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        setIsSaved(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeFromWishList = () => {
    axiosInstance
      .delete(`Wishlist/${carId}`)
      .then((data) => {
        setIsSaved(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {isSaved && <IconButton icon="star" size={20} onPress={onSaveClick} />}
      {!isSaved && (
        <IconButton icon="star-outline" size={20} onPress={onSaveClick} />
      )}
    </>
  );
}

export default AddToWishList;
