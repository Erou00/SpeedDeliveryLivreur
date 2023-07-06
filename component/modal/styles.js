import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";

const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
     
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    alertContainer: {
      backgroundColor: '#fff',
      padding: 20,
      width:'80%',
      borderRadius: 8,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 4,
      padding: 10,
      marginVertical: 20,
    },
    confirmButton: {
      backgroundColor: COLORS.primary,
      padding: 10,
      borderRadius: 4,
      alignSelf: 'flex-end',
    },
    confirmButtonText: {
      color: '#fff',
    },
  });

  export default styles