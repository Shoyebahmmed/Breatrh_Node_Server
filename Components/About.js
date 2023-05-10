import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Text, TextInput, View, Image, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Nav_Bottom from './Nav_Bottom';
import Header from './Header';
import { useNavigation } from '@react-navigation/native';

export default function About({route}) {
   const { user_Name, Prof_Img, userID, serverIP } = route.params;
   const navigation = useNavigation();

    return (

        <View style={styles.container}>
        <Header user_Name = {user_Name} Prof_Img = {Prof_Img} userID = {userID} serverIP = {serverIP}/> 
        <View style={{flex: 1}}>
        <Text style={styles.titleText}> Abo<Text style={{ color: '#94C9FF' }}>ut</Text></Text>

        <View style={{width: '90%', justifyContent: 'center', alignItems: 'center', alignSelf: 'center'}}>
        <Text style={{fontSize: 15, textAlign: 'justify'}}>
        With Breath, the smart asthma app, you can simplify your life by effortlessly recognising and controlling your asthma triggers. 
        Keep track of your medication, make appointment reminders, and keep a personal notebook all in one place. 
        Personalised environmental information is also available to help you better understand and manage your asthma. 
        </Text>
        </View>
        
        <Text style={{fontSize: 18, textAlign:'center', marginTop: 40}}>
        <Text style={styles.titleText2}>
        Brea
        <Text style={{ color: '#94C9FF' }}>
        the
        </Text>
        </Text> comfortably with 
        <Text style={styles.titleText2}> Bre
        <Text style={{ color: '#94C9FF' }}>
        ath
        </Text>
        </Text>.</Text>




        <TouchableOpacity
          style={styles.viewButton}
          onPress={() => navigation.navigate('Referance', { user_Name: user_Name, Prof_Img: Prof_Img, userID: userID, serverIP: serverIP })}
          >
              <Ionicons name="ios-information-circle-outline" size={20} color="#FFFFFF" style={styles.icon}/>
              <Text style={styles.btnText}>Source Material</Text>
            </TouchableOpacity>


            </View>

        <Nav_Bottom iconName="About"  user_Name = {user_Name} Prof_Img = {Prof_Img} userID = {userID} serverIP = {serverIP}/>
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
titleText2: {
    color: '#03076F',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
},

viewButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingVertical: 4,
    width: 150,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { 
      width: 0, 
      height: 2 
    }, 
    shadowOpacity: 0.2, 
    shadowRadius: 2,
    backgroundColor: '#000874',
    marginTop: '30%',
  },
  btnText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 15,
  },

  icon: {
    alignSelf: 'center',
    marginRight: 5,
  },
});
