import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, TouchableWithoutFeedback, ImageBackground, ScrollView } from 'react-native';
import Nav_Bottom from './Nav_Bottom';
import Header from './Header';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';


export default function Note_View({route}) {
  const navigation = useNavigation();
  const { user_Name, Prof_Img, userID, serverIP, item } = route.params;


    return (
        <View style={styles.container}>
        <Header user_Name = {user_Name} Prof_Img = {Prof_Img} userID = {userID} serverIP = {serverIP}/>
        <View style={{flex: 1}}> 
            <View style={styles.header}>
            <TouchableOpacity 
            onPress={() =>navigation.navigate('Diary_Page', { user_Name: user_Name, Prof_Img: Prof_Img, userID: userID, serverIP: serverIP })}>
                <Ionicons name="arrow-back" size={30} color="#03076F" />
            </TouchableOpacity>
            <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={styles.titleText}>Refer<Text style={{ color: '#94C9FF' }}>ence</Text></Text>
            </View>
            </View>
            
            <ScrollView>
                <Text style={styles.title}>{item.Title}</Text>
                <Text style={styles.body}>{item.Content}</Text>
            </ScrollView>



        </View>
        <Nav_Bottom iconName="diary" user_Name = {user_Name} Prof_Img = {Prof_Img} userID = {userID} serverIP = {serverIP}/>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
  },
  titleText: {
    color: '#03076F',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },   
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#C9CDFF',
  },  

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
  },

  body:{
    paddingHorizontal: 10,
    marginBottom: 20,
  },

});