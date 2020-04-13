import {StyleSheet} from "react-native";
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
  trimmerTime: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  trimmerView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 80
  },
  trim: {
    marginTop: 40
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
