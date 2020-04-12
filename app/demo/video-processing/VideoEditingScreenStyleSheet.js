import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1
  },
  textView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  trimmerView: {
    marginTop: 50,
    width: 300,
    height: 50,
    borderWidth: 1,
    alignItems: "center"
  },
  loading: {
    backgroundColor: "black",
    opacity: 0.5,
    width: "100%",
    height: "100%",
    position: "absolute",
    alignSelf: "center",
    zIndex: 2
  }
});
export default styles;
