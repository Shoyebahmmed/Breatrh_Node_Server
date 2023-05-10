import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Text, TextInput, View, Image, ScrollView, Alert, Switch } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Nav_Bottom from './Nav_Bottom';
import Header from './Header';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { isEnabled } from 'react-native/Libraries/Performance/Systrace';
import { CheckBox } from 'react-native-elements';


export default function About({route}) {
    const { user_Name, Prof_Img, userID, serverIP } = route.params;
    const navigation = useNavigation();
    const [showNotification, setshowNotification] = useState(false);
    const [emailNotification, setemailNotification] = useState(false);
    const [allowSound, setallowSound] = useState(false);
    const [allowVibration, setallowVibration] = useState(false);
    const [triggers, setTriggers] = useState(false);

    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);
    const [checked4, setChecked4] = useState(false);


    function displayCheckBox () {
        return(
            <View style={styles.checkBoxCont}>
            <View style={{borderBottomWidth: 0.5, marginBottom: 10}} />
                    <CheckBox
                        title='High Humidity'
                        checked={checked1}
                        containerStyle={{ 
                        backgroundColor: 'transparent',
                        borderWidth: 0,
                        padding: 0
                        }}
                        onPress={() => setChecked1(!checked1)}
                    />

                    <CheckBox
                        title='Dry Air'
                        checked={checked2}
                        containerStyle={{ 
                        backgroundColor: 'transparent',
                        borderWidth: 0,
                        padding: 0
                        }}
                        onPress={() => setChecked2(!checked2)}
                    />

                    <CheckBox
                        title='Breathing in Cold'
                        checked={checked3}
                        containerStyle={{ 
                        backgroundColor: 'transparent',
                        borderWidth: 0,
                        padding: 0
                        }}
                        onPress={() => setChecked3(!checked3)}
                    />

                    <CheckBox
                        title='Thunderstorms'
                        checked={checked4}
                        containerStyle={{ 
                        backgroundColor: 'transparent',
                        borderWidth: 0,
                        padding: 0
                        }}
                        onPress={() => setChecked4(!checked4)}
                    />

                    </View>
        )
    }


    return (

        <View style={styles.container}>
        <Header user_Name = {user_Name} Prof_Img = {Prof_Img} userID = {userID} serverIP = {serverIP}/> 
        <View style={{flex: 1}}>
        

        <View style={styles.header}>
        <Text style={styles.titleText}>Notification<Text style={{ color: '#94C9FF' }}> Setting</Text></Text>
        </View>

            <View style={styles.body}>
                <View style={styles.notfi_cont}>
                    <Text style={styles.noti_text}>Show Notification</Text>
                    <Switch 
                        style={styles.switch}
                        value={showNotification}
                        onValueChange={(value) => setshowNotification(value)}
                        trackColor={{ false: "#C5D0D8", true: "#2699FB"}}
                        thumbColor={showNotification ? "#FFFFFF" : "#2699FB"}      
                    />
                </View>
                <View style={styles.notfi_cont}>
                    <Text style={[styles.noti_text, {color: '#C5D0D8'}]}>Email Notification</Text>
                    <Switch 
                        style={styles.switch}
                        value={emailNotification}
                        onValueChange={(value) => setemailNotification(value)}
                        trackColor={{ false: "#C5D0D8", true: "#2699FB"}}
                        thumbColor={emailNotification ? "#FFFFFF" : "#C5D0D8"}    
                    />
                </View>
                <View style={styles.notfi_cont}>
                    <Text style={[styles.noti_text, {color: '#C5D0D8'}]}>Allow Sound</Text>
                    <Switch 
                        style={styles.switch}
                        value={allowSound}
                        onValueChange={(value) => setallowSound(value)}
                        trackColor={{ false: "#C5D0D8", true: "#2699FB"}}
                        thumbColor={allowSound ? "#FFFFFF" : "#C5D0D8"}        
                    />
                </View>
                <View style={styles.notfi_cont}>
                    <Text style={[styles.noti_text, {color: '#C5D0D8'}]}>Allow Vibration</Text>
                    <Switch 
                        style={styles.switch}
                        value={allowVibration}
                        onValueChange={(value) => setallowVibration(value)}
                        trackColor={{ false: "#C5D0D8", true: "#2699FB"}}
                        thumbColor={allowVibration ? "#FFFFFF" : "#C5D0D8"}    
                        disabled={true}   
                    />
                </View>

                <View style={[triggers ? styles.notfi_cont_extra : styles.notfi_cont_new]}>
                    <View style={styles.trigger_title}>
                    <Text style={styles.noti_text}>Notification for Triggers</Text>
                    <Switch 
                        style={styles.switch}
                        value={triggers}
                        onValueChange={(value) => setTriggers(value)}
                        trackColor={{ false: "#C5D0D8", true: "#2699FB"}}
                        thumbColor={triggers ? "#FFFFFF" : "#2699FB"}      
                    />
                    </View>

                    {triggers ? displayCheckBox() :null}
                    
                </View>
            </View>

        </View>
        <Nav_Bottom iconName="notification_setting"  user_Name = {user_Name} Prof_Img = {Prof_Img} userID = {userID} serverIP = {serverIP}/>
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
header: {
    marginTop: 10,
    marginBottom: 10,
},


body: {
    flex: 1,
    alignItems: 'center',
},
checkBoxCont: {
    flexDirection: 'column',
    marginTop: 5,
},

noti_text: {
    color: '#2699FB',
    flex: 1,
    fontSize: 20,
},

notfi_cont: {
    alignItems: 'center',
    padding: 10,
    marginBottom: 20,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    width: '90%',
    height: 70,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { 
      width: 0, 
      height: 2 
    }, 
    shadowOpacity: 0.2, 
    shadowRadius: 2,
},
notfi_cont_new: {
    padding: 10,
    marginBottom: 40,
    backgroundColor: '#FFFFFF',
    width: '90%',
    height: 70,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { 
      width: 0, 
      height: 2 
    }, 
    shadowOpacity: 0.2, 
    shadowRadius: 2,
  },
  notfi_cont_extra: {
    padding: 10,
    marginBottom: 40,
    backgroundColor: '#FFFFFF',
    width: '90%',
    height: 230,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { 
      width: 0, 
      height: 2 
    }, 
    shadowOpacity: 0.2, 
    shadowRadius: 2,
  },
  trigger_title: {
    flexDirection: 'row',
    alignItems: 'center',
  },
switch: {
    alignSelf: 'center',
},
});
