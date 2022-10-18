import React from 'react';
import { ScrollView } from 'react-native';
import { Text, Image, Button } from 'react-native-elements';
import {useNavigation} from "@react-navigation/native";
import {screen} from "../../../utils"
import {styles} from "./UserGuestScreen.styles";

export function UserGuestScreen() {
    const navigation = useNavigation();

    const goToLogin = ()=>{
        navigation.navigate(screen.account.login);
    }

    return (
        <ScrollView centerContent={true} style={styles.content}>
            <Image source={require("../../../../assets/img/user-guest.png")} style={styles.image}/>
            <Text style={styles.title}>Consultar tu perfil de MyFoodApp</Text>
            <Text style={styles.description}>
                ¿Como describirias tu mejor restaurante? Busca y Visualiza los mejores
                restaurantes de una forma sencilla, vota cual te ha gustado mas y comenta
                tu experiencia.
            </Text>

            <Button title="Ver tu perfil" onPress={goToLogin} buttonStyle={styles.btnStyle}/>
        </ScrollView>
    );
}