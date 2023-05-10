import React, { useState, useEffect } from 'react';
import { View, ScrollView, FlatList, StyleSheet, StatusBar, Image, Text, ImageBackground, Button } from 'react-native';
import axios from 'axios';
import Dash_Message_View from './Dash_Message_View';
import Chat_Button from './coust_Button';



export default function Message_DashBoard({userID}) {
  const [lastMessageForDash, setLastMessageForDash] = useState([]);
  const [emptyValueView, setEmptyValueView] = useState(true);
  async function setLastMessages() {
    try {
      const response = await axios.get('http://192.168.10.1:8888/view_joined_groups_with_last_message');
      if (response.data.length > 0) {
        setLastMessageForDash(response.data);
        setEmptyValueView(false);
      } else {
        console.log('Response data is empty');
        setEmptyValueView(true);
      }
    } catch (error) {
      console.error(error);
    }
  }

console.log('bb ', userID);
useEffect(() => {
  axios.post('http://192.168.8.104:8888/send_userID_from_Message_Dashboard', {userID})
    .then(res => {
      console.log('hello');
      console.log('aa ', res.data);
      setLastMessages();
    })
    .catch(err => {
      console.error(err);
    });
}, [userID]);



const [selectedButton, setSelectedButton] = useState('My Group');

const handleButtonPress = (text) => {
  setSelectedButton(text);
};

const haveGroups = () => {
  return(
    <ScrollView>
    {lastMessageForDash.map((message, index) => (
      <Dash_Message_View
        key={index}
        Group_Name={message.Group_Name}
        Sender_ID={message.Sender_ID}
        Message_Content={message.Message_Content}
        Timestamp={message.Timestamp}
      />
    ))}
  </ScrollView>
  )
}

const notHaveGroups = () => {
  return(
<View style={styles.notGroup}>
  <Image source={require('./img_and_icon/dont_have_group.jpg')} style={styles.image} />
  <Text style={styles.text1}>Welcome to our Breath community.</Text>
  <Text style={styles.text2}>Start chatting now and share your experiences.</Text>
  <Text style = {styles.button}>
  Join Group
  </Text>
</View>

  )
}

  return (
<ImageBackground source={require('./img_and_icon/Screen.png')} style={styles.imageBackground}>
  <View style={styles.buttonContainer}>
    <Chat_Button
      text="My Group"
      isSelected={selectedButton === 'My Group'}
      onPress={() => handleButtonPress('My Group')}
    />
    <Chat_Button
      text="Suggestions"
      isSelected={selectedButton === 'Suggestions'}
      onPress={() => handleButtonPress('Suggestions')}
    />
  </View>

  <View
  style={{
    borderBottomColor: '#e6e6e6',
    borderBottomWidth: 1,
  }}
/>
<View>
  {emptyValueView ? notHaveGroups() : haveGroups()}
</View>


</ImageBackground>


  )
}

const styles = StyleSheet.create({
    imageBackground: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'flex-start',
      
    },
    buttonContainer: {
      flexDirection: 'row',
      marginTop: 50,
      marginBottom: 10,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#E8F3FF',
      borderRadius: 15,
    },
    
    image: {
      height: 200,
      width: 360,
    },
    notGroup: {
      top: '50%',
      alignItems: 'center',
    },
    text1: {
      fontSize: 20,
      textAlign: 'center',
      fontWeight: 'bold',
      marginTop: 15,
      color: '#000874',
    },
    text2: {
      fontSize: 16,
      textAlign: 'center',
      marginTop: 5,
      color: '#000874',
    },
    button: {
      color: '#E8F3FF',
      borderRadius: 30,
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 10,
      paddingBottom: 10,
      backgroundColor: '#000874', 
      fontWeight: 'bold',
      marginTop: 15,
    }
});