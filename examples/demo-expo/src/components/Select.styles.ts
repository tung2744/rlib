import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  trigger: {
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "#4A55A2",
    minHeight: 40,
    minWidth: 120,
    textAlign: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  clearButton: {
    marginRight: -20,
    padding: 8,
  },
  clearButtonText: {
    color: "red",
  },
  menu: {
    position: "absolute",
    top: "100%",
    left: 0,
    marginTop: 12,
    width: 300,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#4A55A2",
  },
  menuItem: {
    padding: 16,
  },
});
