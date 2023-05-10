import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';

export default function Social_Page_Comment_View({Prof_Img, Com_User_Name, Comm_Content, Comm_Time, serverIP}) {

    const [userIdValid, setUserIdValid] = useState(true);

    return(


        <View style={styles.container}>

        <View style={styles.profImgContainer}>
        <Image 
            source={{ uri: Prof_Img }}
            style={styles.profImage}
        />
        </View>

        <View style={styles.C_container}>
        <View style={styles.parent}>
  <View style={styles.C_box}>
    <Text style={styles.C_name}>{Com_User_Name}</Text>
    <Text style={styles.C_cont}>{Comm_Content}</Text>
  </View>
</View>
            <Text style={styles.C_time}>{Comm_Time}</Text>
        </View>

        </View>
    )}

    const styles = StyleSheet.create({ 
        container: {
            flexDirection: 'row',
            width: '100%',
            marginLeft: '5%',
            alignContent: 'space-between',
        },
        profImgContainer: {
            width: 35,
            height: 35,
            borderRadius: 50,
            overflow: 'hidden',
            marginTop: 5,

          },
          profImage: {
            width: '100%',
            height: '100%',
          },
          C_container: {
            flexDirection: 'column',
            alignContent: 'space-between',
            width: '100%',
            marginLeft: 10,
          },
          C_box: {
            backgroundColor: '#F1F1F1',
            maxWidth: '75%',
            padding: '2%',
            borderRadius: 20,
          },
          C_name: {
            fontWeight: 'bold',
            fontSize: 15,
          },
          C_cont: {
            fontSize: 14,
          },
          C_time: {
            color: '#616161',
            marginLeft: 10,
          },
    });