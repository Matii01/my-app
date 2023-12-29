import { Button, View, StyleSheet } from "react-native";

function Pagination({ paginationData, pageChange }) {
  const onPageChange = (pageNum) => {
    console.log(pageNum);
    pageChange(pageNum);
  };

  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: "row",
        },
      ]}
    >
      <View style={styles.col}>
        <Button
          title="Back"
          disabled={!paginationData.hasPrevious}
          onPress={() => onPageChange(paginationData.currentPage - 1)}
        />
      </View>
      <View style={styles.col}>
        <Button
          title="Next"
          disabled={!paginationData.hasNext}
          onPress={() => onPageChange(paginationData.currentPage + 1)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  col: {
    flex: 1,
    padding: 5,
  },
});

export default Pagination;
