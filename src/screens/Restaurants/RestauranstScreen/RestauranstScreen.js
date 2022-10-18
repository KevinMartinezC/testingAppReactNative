import { View, Text } from 'react-native';
import React, {useState, useEffect} from 'react';
import { Icon } from 'react-native-elements';
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {collection, onSnapshot, orderBy, query} from "firebase/firestore";
import {LoadingModal} from "../../../components/shared";
import {ListRestaurants} from "../../../components/Restaurants";
import {screen, db} from "../../../utils";
import {styles} from "./RestauranstScreen.styles";

export function RestauranstScreen(props) {
  const {navigation} = props;
  const [currentUser, setCurrentUser] = useState(null);
  const [restaurants, setRestaurants] = useState(null);

  useEffect(() => {
    const auth = getAuth(); //obteniendo usuario registrado
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    })
  }, []);

  useEffect(() => {
    const q = query(collection(db,"restaurants"),//obtener restaurantes y listarlos de forma descendente
    orderBy("createdAt", "desc"));

    onSnapshot(q, (snapshot) =>{
      setRestaurants(snapshot.docs);
    });
  }, []);

  const goToAddRestaurant = () =>{
    navigation.navigate(screen.restaurant.addRestaurant); //para ir a una screen en el mismo stack
   // navigation.navigate(screen.account.tab,{screen: screen.account.account}) para ir a una screen en un diferente stack
  };

  return (
    <View style={styles.content}>
      {!restaurants ? (
        <LoadingModal show text="Cargando"/>
      ) : (
        <ListRestaurants restaurants={restaurants}/>
      )}

    
     {currentUser && ( // si el usuario existe se le mostrara el boton para agregar restaurante de causo contrario este no se mostrara
        <Icon 
        reverse type="material-community" 
        name="plus" color="#E02E00" 
        containerStyle={ styles.btnContainer}
        onPress={goToAddRestaurant}/>
      )}
    
    </View>
  )
}