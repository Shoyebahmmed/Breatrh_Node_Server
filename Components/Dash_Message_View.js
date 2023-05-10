import React, { useState, useEffect } from 'react';
import { View, ScrollView, FlatList, StyleSheet, StatusBar, Image, Text, ImageBackground, TouchableOpacity } from 'react-native';
import axios from 'axios';



export default function Message_DashBoard({Group_Name, Sender_ID, Message_Content, Timestamp}) {
  
  return (
<TouchableOpacity style={styles.container}>
  <Image source={require('./img_and_icon/drawable-hdpi/user_icon.png')} style={styles.image} />
  <View style={styles.textContainer}>
    <View style={styles.topContainer}>
      <Text style={styles.groupName}>{Group_Name}</Text>
      <Text style={styles.time}>{Timestamp}</Text>
    </View>
    <View style={styles.bottomContainer}>
      <Text style={styles.userID}>{Sender_ID}: {Message_Content}</Text>
    </View>
  </View>
</TouchableOpacity>

  )
}


  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#e6e6e6',
    },
    image: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 10,
    },
    textContainer: {
      flex: 1,
    },
    topContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    bottomContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    groupName: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    userID: {
      fontSize: 14,
      marginRight: 5,
    },
    message: {
      fontSize: 14,
    },
    time: {
      fontSize: 12,
      color: '#888',
      alignSelf: 'flex-end',
    },
  });
  
