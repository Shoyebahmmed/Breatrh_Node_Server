import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, TextInput, View, Button, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';

//import { useNavigation } from '@react-navigation/native';

export default function NavigationBar({ iconName, user_Name, Prof_Img, userID, serverIP }) {
    const navigation = useNavigation();
    const [navIconState, setNavIconState] = useState({
        home: iconName === 'home',
        diary: iconName === 'diary',
        education: iconName === 'education',
        notification: iconName === 'notification'
      });


      console.log(user_Name, Prof_Img, userID, ' *_*-*-*-*-*-*-*_*-*-*-*-*-*-*_*-*-*-*-*-*-*_*-*-*-*-*-*-*_*-*-*-*-*-*-')

    return (
        <View style={styles.navBar}>
        <TouchableOpacity style={styles.navItem} onPress={() => {
        navigation.navigate('Home_Page', { user_Name: user_Name, Prof_Img: Prof_Img, userID: userID, serverIP: serverIP });
        }} >
                <View style={styles.iconPositioning}>
                    <Fontisto name="home" size={35} color={navIconState.home ? '#94C9FF' : '#000874'} />
                    <Text style={[styles.textStyle, { color: navIconState.home ? '#94C9FF' : '#000874' }]}> Home </Text>
                </View>
        </TouchableOpacity>


        <TouchableOpacity style={styles.navItem} onPress={() => {
        navigation.navigate('Diary_Page', { user_Name: user_Name, Prof_Img: Prof_Img, userID: userID, serverIP: serverIP });
        }} >
          <View style={styles.iconPositioning}> 
                    <MaterialIcons name="note-add" size={35} color={navIconState.diary ? '#94C9FF' : '#000874'} />
                    <Text style={[styles.textStyle, { color: navIconState.diary ? '#94C9FF' : '#000874' }]}> Diary </Text>
                </View>
        </TouchableOpacity>


        <TouchableOpacity style={styles.navItem} onPress={() => {
        navigation.navigate('Health_Education_Page', { user_Name: user_Name, Prof_Img: Prof_Img, userID: userID, serverIP: serverIP });
        }} >
                        <View style={styles.iconPositioning}> 
                <Ionicons name="md-book" size={35} color={navIconState.education ? '#94C9FF' : '#000874'}  />
                    <Text style={[styles.textStyle, { color: navIconState.education ? '#94C9FF' : '#000874' }]}> Education </Text>
                </View>
          {/* <Image source={navIconState.education ? require("./img_and_icon/drawable-mdpi/education_L.png") : require("./img_and_icon/drawable-mdpi/education.png")} style={styles.navIcon} /> */}
        </TouchableOpacity>


        <TouchableOpacity style={styles.navItem} onPress={() => {
        navigation.navigate('Notification', { user_Name: user_Name, Prof_Img: Prof_Img, userID: userID, serverIP: serverIP });
        }} >
          <View style={styles.iconPositioning}> 
                <MaterialIcons name="notifications-on" size={35} color={navIconState.notification ? '#94C9FF' : '#000874'}  />
                    <Text style={[styles.textStyle, { color: navIconState.notification ? '#94C9FF' : '#000874' }]}> Notification </Text>
                </View>
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        height: 70,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#EFEFEF',
        paddingTop: 10,
        paddingBottom: 5,
      },
      navItem: {
        flex: 1,
        alignItems: 'center',
      },
      iconPositioning: {
        flex: 1,
        alignItems: 'center',
    },

    textStyle: {
        color: "#191970",
        fontSize: 16,
    },
});