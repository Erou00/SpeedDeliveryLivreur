import React, { useState } from 'react'
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './styles'

   const CustomModal = ({ visible, onClose, onConfirm }) => {

    const [inputText, setInputText] = useState('');

  const handleConfirm = () => {
    console.log(inputText);
    onConfirm(inputText);
    setInputText('');
  };
     return (
        <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.alertContainer}>
            <TextInput
              style={styles.input}
              placeholder="Motif"
              onChangeText={(text) => setInputText(text)}
              value={inputText}
            />
            <TouchableOpacity onPress={handleConfirm} style={styles.confirmButton}>
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
     )
   }
   
   export default CustomModal
   