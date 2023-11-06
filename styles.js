import { StyleSheet } from "react-native";

const buttonWidth = "200px";
const primaryColor = "#0879eb";
const secondaryColor = "#ff9966";
const tertiaryColor = "#003366";

export const styles = StyleSheet.create({
  selectedAnswerButton: {
    backgroundColor: "white",
    width: 50,
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  answerView: {
    display: "flex",
    flexDirection: "row",
  },
  errorText: {
    color: "white",
    margin: 20,
  },
  input: {
    backgroundColor: "white",
    height: "2em",
    borderRadius: "15px",
    padding: "10px",
    margin: "5px",
    width: buttonWidth,
  },
  answerView: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  answerButton: {
    backgroundColor: "#ff9966",
    width: 50,
    padding: 10,
    borderRadius: 10,
    margin: 10,
    border: "1px solid black",
  },
  questionView: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    height: "100%",
    backgroundColor: "#0879eb",
    padding: 10,
  },
  questionText: {
    padding: 20,
    marginHorizontal: "10px",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    border: "1px solid black",
    padding: "10px",
    borderRadius: "10px",
    backgroundColor: "#ff9966",
    width: buttonWidth,
  },
  containerView: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    height: "100%",
    backgroundColor: "#0879eb",
    padding: 10
  },

  reviewView: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",
    height: "100%",
    backgroundColor: "#0879eb",
    padding: 10
  },
  reviewText:{
    textAlign: 'center'
  },
  logo: {
    height: "100px",
    width: "225px",
  },
  textInput: {
    height: "2em",
    padding: "10px",
    marginTop: "5px",
    borderRadius: "10px",
    backgroundColor: "white",
    width: 200,
    border: "1px solid black",
  },
  icon: {
    height: 150,
    width: 200,
    resizeMode: "contain",
  },
});
