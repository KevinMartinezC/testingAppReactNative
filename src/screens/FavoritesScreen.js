import React, {useState, useEffect} from 'react';
import { Text, ScrollView } from 'react-native';
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {doc, getDoc, collection, query, where, onSnapshot} from "firebase/firestore";
import {size, map} from "lodash";
import {db} from "../utils";
import { UserNotLogged, NotFoundRestaurants, RestaurantFavorites} from "../components/Favorites";
import {Loading} from "../components/shared";



export  function FavoritesScreen() {
  const [hasLogged, setHasLogged] = useState(null);
  const [restaurants, setRestaurants] = useState(null);
  const auth = getAuth();


  useEffect(() => {
   onAuthStateChanged(auth, (user) =>{
    setHasLogged(user ? true : false);
   })
  }, []);


  useEffect(() => {
    const q = query(
      collection(db, "favorites"),
      where("idUser", "==", auth.currentUser.uid)
    )
    onSnapshot( q, async (snapshot) => {
      let restaurantArray = [];
      for await (const item of snapshot.docs){
        const data = item.data();
        const docRef = doc(db,"restaurants", data.idRestaurant);
        const docSnap = await getDoc(docRef);
        const newData = docSnap.data();
        newData.idFavorite = data.id

        restaurantArray.push(newData);
      }
      setRestaurants(restaurantArray)
    })
  }, []);
  
 

  if(!hasLogged) return <UserNotLogged/>

  if(!restaurants) return <Loading show text="Cargando..."/>

  if(size(restaurants) === 0) return <NotFoundRestaurants/>

  return (
    <ScrollView>
      {map(restaurants, (restaurant)=>(
        <RestaurantFavorites key={restaurant.id} restaurant={restaurant}/>
      ))}
    </ScrollView>
  )
}