import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
     
      backgroundColor: "lightblue",
      flex: 1,
    },
    containerActivityIndicator:{
      justifyContent:'center',
      alignContent:'center',
    },
    handleIndicator: {
      backgroundColor: "grey",
      width: 100,
    },
    handleIndicatorContainer: {
      // marginTop: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 20,
    },
    routeDetailsText: {
      fontSize: 25,
      letterSpacing: 1,
    },
    deliveryDetailsContainer: {
      paddingHorizontal: 20,
    },
    restaurantName: {
      fontSize: 25,
      letterSpacing: 1,
      paddingVertical: 20,
    },
    adressContainer: {
      flexDirection: "row",
      marginBottom: 20,
      alignItems: "center",
    },
    adressText: {
      fontSize: 20,
      color: "grey",
      fontWeight: "500",
      letterSpacing: 0.5,
      marginLeft: 15,
    },
    orderDetailsContainer: {
      borderTopWidth: 1,
      borderColor: "lightgrey",
      paddingTop: 20,
    },
    orderItemText: {
      fontSize: 18,
      color: "grey",
      fontWeight: "500",
      letterSpacing: 0.5,
      marginBottom: 5,
    },
    buttonContainer: {
      marginTop: "auto",
      marginVertical: 30,
      marginHorizontal: 10,
      borderRadius: 10,
    },
    buttonText: {
      color: "white",
      paddingVertical: 15,
      fontSize: 25,
      fontWeight: "500",
      textAlign: "center",
      letterSpacing: 0.5,
    },

    validateContainer:{
      marginTop: "auto",
    },
    buttonValidateContainer: {
     
      marginVertical: 10,
      marginHorizontal: 10,
      borderRadius: 10,
    },




    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    alertContainer: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 8,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 4,
      padding: 10,
      marginBottom: 10,
    },
    confirmButton: {
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 4,
      alignSelf: 'flex-end',
    },
    confirmButtonText: {
      color: '#fff',
    },
  });
  