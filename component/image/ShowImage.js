import React, { useEffect, useState } from 'react';
import { Image, View } from 'react-native';
// import FastImage from 'react-native-fast-image';
import axios from 'axios';
import { get_image } from '../../app/api/axios_image';
import { Text } from 'react-native'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const ShowImage = ({imageName,imageStyle,defaultImage}) => {
  const [imageBase64, setImageBase64] = useState(null); 

  useEffect(() => {
    fetchImage();
  }, []); 
 
  const fetchImage = async () => {
    const token = await AsyncStorage.getItem("@user")
    try {
        const response = await axios.get(`http://192.168.20.115:8080/api/private/file-name/${imageName}`, {
          responseType: 'blob',
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });

       

        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result;
          setImageBase64(base64data);
        };
        reader.readAsDataURL(response.data);
      } catch (error) {
        console.error(error);
      }
  };

  return (
    <>
      {imageBase64 ? (
            <Image
            style={imageStyle}
            source={{ uri: imageBase64 }}
            resizeMode="stretch"
        />
      ) : (
        <Image
            style={imageStyle}
            source={{ uri: defaultImage }}
            // resizeMode="contain"
        />
      )}
    </>
  );
};


export default ShowImage