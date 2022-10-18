import { View, Text} from 'react-native';
import {Button } from "react-native-elements";
import React, {useEffect, useState} from 'react';
import * as Location from 'expo-location';
import MapView from "react-native-maps";
import  Toast  from 'react-native-toast-message';
import { Modal } from '../../../shared';
import {styles} from "./MapForm.styles"

export  function MapForm(props) {
  const {show, close, formik} = props;
  const [location, setLocation] = useState({
    latitude: 0.001,
    longitude: 0.001,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  })

  useEffect(() => {
   (async () => {
    const {status} = await Location.requestForegroundPermissionsAsync(); //obtener el estado del permiso 

    if(status !== "granted"){
      Toast.show({
        type: "info",
        position: "bottom",
        text1: "Tienes que ir a ajustes de la app y activar la localización"
      });
      return;
    }
    const locationTemp = await Location.getCurrentPositionAsync({}); //codigo para obtener la localización del usuario
    
    setLocation({
    latitude: locationTemp.coords.latitude,
    longitude: locationTemp.coords.longitude,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
    })
   })()
  }, [])
  
  const saveLocation = () => {
    formik.setFieldValue("location", location);
    close();
  }
  return (
    <Modal show={show} close={close}>

        <MapView
          initialRegion={location}
          showsUserLocation={true}
          style={styles.mapStyle}
          onRegionChange={(locationTemp) => setLocation(locationTemp)}
        >
          <MapView.Marker draggable coordinate={location}/>
        </MapView>
        <View style={styles.mapActions}>
          <Button 
            title="Guardar"
            ContainerStyle={styles.btnMapContainerSave}
            buttonStyle={styles.btnMapSave}
            onPress={saveLocation}
            />
          <Button 
            title="Cerrar"
            ContainerStyle={styles.btnMapContainerCancel}
            buttonStyle={styles.btnMapCancel}
            onPress={close}
            />
        </View>
     
    </Modal>
  )
}