import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Text, TextInput, View, Image, ScrollView, Alert } from 'react-native';
import { Ionicons, FontAwesome5, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Nav_Bottom from './Nav_Bottom';
import Header from './Header';
import { useNavigation } from '@react-navigation/native';

export default function Setting({route}) {
  const { user_Name, Prof_Img, userID, serverIP } = route.params;
  const navigation = useNavigation();

    return (

        <View style={styles.container}>
        <Header user_Name = {user_Name} Prof_Img = {Prof_Img} userID = {userID} serverIP = {serverIP}/>
        <View style={styles.colView}>

          <View style={styles.rowView}>

          <TouchableOpacity
          style={styles.viewButton}
          onPress={() => navigation.navigate('Notification_Setting', { user_Name: user_Name, Prof_Img: Prof_Img, userID: userID, serverIP: serverIP })}>
              <Ionicons name="ios-notifications-outline" size={40} color="#000874" style={styles.icon}/>
              <Text style={styles.btnText}>Notification</Text>
            </TouchableOpacity>

            <TouchableOpacity 
            style={styles.viewButton}
            onPress={() => navigation.navigate('Profile_Page', { user_Name: user_Name, Prof_Img: Prof_Img, userID: userID, serverIP: serverIP })}
            >
              <FontAwesome5 name="user-alt" size={40} color="#000874" style={styles.icon}/>
              <Text style={styles.btnText}>Profile</Text>
            </TouchableOpacity>
            
          </View>

          <View style={styles.rowView}>
          <TouchableOpacity
          style={styles.viewButton}
          onPress={() =>
                Alert.alert(
                  'Update',
                  `Currently We do not have any version.`,
                  [
                    { text: 'Cancel', style: 'cancel' },
                  ],
                  { cancelable: false },
                )
              }>
              <MaterialIcons name="system-update" size={40} color="#000874" style={styles.icon}/>
              <Text style={styles.btnText}>Update</Text>
            </TouchableOpacity>


            <TouchableOpacity 
            style={styles.viewButton}
            onPress={() =>navigation.navigate('Change_Password', { user_Name: user_Name, Prof_Img: Prof_Img, userID: userID, serverIP: serverIP })}
            >
              <FontAwesome5 name="key" size={30} color="#000874" style={styles.icon}/>
              <Text style={styles.btnText}>Change {'\n'}Password</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.rowView}>
            <TouchableOpacity 
            style={styles.viewButton}
            onPress={() =>navigation.navigate('Login_Page_New')}>
              <MaterialCommunityIcons name="logout" size={40} color="#000874" style={styles.icon}/>
              <Text style={styles.btnText}>Log Out</Text>
            </TouchableOpacity>
          </View>

        </View>
        <Nav_Bottom iconName="Settings"  user_Name = {user_Name} Prof_Img = {Prof_Img} userID = {userID} serverIP = {serverIP}/>
        </View>
        
    );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  colView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },

  rowView: {
    flexDirection: 'row',
  },

  viewButton: {
    justifyContent: 'center',
    height: 130,
    width: 130,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { 
      width: 0, 
      height: 2 
    }, 
    shadowOpacity: 0.2, 
    shadowRadius: 2,
    margin: 25,
    backgroundColor: '#fff',
  },
  
  btnText: {
    textAlign: 'center',
    color: '#000874',
    fontSize: 15,
  },

  icon: {
    alignSelf: 'center',
    padding: 10
  },
});
