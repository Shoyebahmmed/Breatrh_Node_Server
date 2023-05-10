import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Text, TextInput, View, Image, ScrollView, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Nav_Bottom from './Nav_Bottom';
import Header from './Header';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';

export default function About({route}) {
   const { user_Name, Prof_Img, userID, serverIP } = route.params;
   const navigation = useNavigation();

      const [notificationList, setNotificationList] = useState([
        {
            type: 'weather',
            title: 'High Risk Weather Alert',
            description: 'High winds and low humidity may increase asthma symptoms. Stay indoors and avoid outdoor activities.',
            dateORtime: '17:15'
        },

        {
            type: 'weather',
            title: 'Air Quality Alert',
            description: 'Poor air quality can trigger asthma symptoms. Limit outdoor exposure and stay indoors with windows closed.',
            dateORtime: '17:15'
        },

        {
            type: 'other',
            title: 'Medication Reminder',
            description: 'Its time to take your medication.',
            dateORtime: '17:15'
        },

        {
            type: 'weather',
            title: 'Heat Advisory',
            description: 'High winds and low humidity may increase asthma symptoms. Stay indoors and avoid outdoor activities.',
            dateORtime: '17:15'
        },
        {
            type: 'other',
            title: 'Appointment Reminder',
            description: 'Your appointment is coming up soon. Do not forget to prepare.',
            dateORtime: '17:15'
        },

        {
            type: 'other',
            title: 'Medication Reminder',
            description: 'Its time to take your medication.',
            dateORtime: '17:15'
        },
      ])


    function displayList (item) {
        if (item.type === 'weather') {
            return(
                <View style={styles.notificationCont}>
                <MaterialCommunityIcons name="weather-cloudy-clock" size={50} color="#FF5050" style={styles.icon}/>
                <View style={styles.notificationBody}>
                    <Text style={styles.title}>
                        {item.title}
                    </Text>
                    <Text style={styles.description}>
                        {item.description}
                    </Text>

                    <Text style={styles.dateORtime}>
                        {item.dateORtime}
                    </Text>
                </View>
                </View>
            )
        }
        else {

            return(
            <View style={styles.notificationCont}>
            <Entypo name="info-with-circle" size={50} color="#03076F" style={styles.icon}/>
            <View style={styles.notificationBody}>
                <Text style={styles.title}>
                    {item.title}
                </Text>
                <Text style={styles.description}>
                    {item.description}
                </Text>

                <Text style={styles.dateORtime}>
                    {item.dateORtime}
                </Text>
            </View>
            </View>
            )
        }
    }

    return (

        <View style={styles.container}>
        <Header user_Name = {user_Name} Prof_Img = {Prof_Img} userID = {userID} serverIP = {serverIP}/> 
        <View style={{flex: 1, marginTop: 10}}>
        <Text style={styles.titleText}>Notifi<Text style={{ color: '#94C9FF' }}>cation</Text></Text>


        <ScrollView>
            {
                notificationList.map((item, index) => (
                    <View key={index}>
                    {displayList(item)}
                    </View>
                ))
            }
        </ScrollView>
        
        


        </View>
        <Nav_Bottom iconName="notification"  user_Name = {user_Name} Prof_Img = {Prof_Img} userID = {userID} serverIP = {serverIP}/>
        </View>
        
    );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  titleText: {
    color: '#03076F',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center'
},

title: {
    color: '#03076F',
    fontSize: 23,
    fontWeight: 'bold',
},

description: {
    marginTop: 10,
    color: '#017FFF',
},

notificationBody: {
    justifyContent: 'center',
    alignContent: 'center',
    flex: 1,
    marginLeft: 10,
},

notificationCont: {
    alignSelf: 'center',
    flexDirection: 'row',
    padding: 15,
    width: '90%',
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { 
      width: 0, 
      height: 2 
    }, 
    shadowOpacity: 0.2, 
    shadowRadius: 2,
    backgroundColor: '#fff',
    marginTop: '5%',
  },
  dateORtime: {
    color: '#AEAEAE',
    marginTop: 15,
  },

  icon: {
    alignSelf: 'center',
    marginRight: 5,
  },
});
