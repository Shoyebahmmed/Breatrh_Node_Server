import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image, Button, TouchableOpacity } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import Nav_Bottom from './Nav_Bottom';
import Header from './Header';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';


export default function Inhaler_Details_View({route}) {
    const { user_Name, Prof_Img, userID, item, serverIP } = route.params;
    const navigation = useNavigation();


    const [InhalerDetails, setInhalerDetails] = useState(item);
      
      const inTodayPer = InhalerDetails.Puffs_Used / InhalerDetails.Puffs_Per_Day || 0;
      const inTotalPer = InhalerDetails.Num_of_Puffs_Taken / InhalerDetails.Num_of_Puffs || 0;

      

      function RelieverView () {
        return (
            <View style={{ flex: 1, flexDirection: 'column' }} >
            <View style={{flex: 0.4, flexDirection: 'row', alignItems: 'center',  justifyContent: 'flex-start'}}>
            <TouchableOpacity style= {{marginTop: 30, marginLeft: 30, flex: 0.1}} onPress={() =>navigation.navigate('Inhaler_Monitoring_Page', { user_Name: user_Name, Prof_Img: Prof_Img, userID: userID, serverIP: serverIP })}>
            <Ionicons name="arrow-back" size={30} color="#03076F" />
            </TouchableOpacity>
            <View style={{flex: 0.75}}>
            <Image source={require('./img_and_icon/in_icon.png')} style={{ width: 80, height: 80, marginTop: 20, justifyContent: "center", alignSelf: "center"}} />
            </View>
            </View>
            <Text style={styles.titleText}> {InhalerDetails.Inhaler_Name}</Text>

            <View style={{justifyContent: "flex-start", alignSelf: "center", marginTop: 20}}>
            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    <Text style= {styles.title} >
                        Type: 
                    </Text>

                    <Text style= {styles.result}>
                    {InhalerDetails.Type}
                    </Text>
                </View>

                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    <Text style= {styles.title} >
                        Started: 
                    </Text>

                    <Text style= {styles.result}>
                    {InhalerDetails.Start_Date}
                    </Text>
                </View>

                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    <Text style= {styles.title} >
                        Expected end: 
                    </Text>

                    <Text style= {styles.result}>
                    {InhalerDetails.Expected_End_Date}
                    </Text>
                </View>

                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    <Text style= {styles.title} >
                    Expiry Date: 
                    </Text>

                    <Text style= {styles.result}>
                    {InhalerDetails.Expiry_Date}
                    </Text>
                </View>
                </View>

            <Text style={styles.titleText}>Puff Details</Text>


            <View style={{width: '85%', alignSelf: 'center', marginTop: 20}}>
            <Text style={{ fontSize: 16, color: "#03076F", marginBottom: 5 }}> Available Puffs</Text>
                <ProgressBar 
                    style={styles.progressBarContainer}
                    progress={inTotalPer}
                    color="#03076F"
                />
                <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 15, color: "#03076F" }}> {InhalerDetails.Num_of_Puffs_Taken} </Text>
                    <Text style={{ fontSize: 15, color: "#03076F", textAlign: "right", flex: 1 }}>{InhalerDetails.Num_of_Puffs}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.buttonStyle}
            onPress={() => {
        navigation.navigate('Health_Education_Page', { user_Name: user_Name, Prof_Img: Prof_Img, userID: userID, serverIP: serverIP });
        }}>
                <Text style={styles.buttonText}> Learn How to Use Inhaler </Text>
            </TouchableOpacity>
        </View>
        )
      }


      function PreventerView() {
        return (
            <View style={{ flex: 1, flexDirection: 'column' }} >
            <View style={{flex: 0.6, flexDirection: 'row', alignItems: 'center',  justifyContent: 'flex-start'}}>
            <TouchableOpacity style= {{marginTop: 30, marginLeft: 30, flex: 0.1}} onPress={() =>navigation.navigate('Inhaler_Monitoring_Page', { user_Name: user_Name, Prof_Img: Prof_Img, userID: userID, serverIP: serverIP })}>
            <Ionicons name="arrow-back" size={30} color="#03076F" />
            </TouchableOpacity>
            <View style={{flex: 0.75}}>
            <Image source={require('./img_and_icon/in_icon.png')} style={{ width: 80, height: 80, marginTop: 20, justifyContent: "center", alignSelf: "center"}} />
            </View>
            </View>
            <Text style={styles.titleText}> {InhalerDetails.Inhaler_Name}</Text>

            <View style={{justifyContent: "flex-start", alignSelf: "center", marginTop: 20}}>
            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    <Text style= {styles.title} >
                        Type: 
                    </Text>

                    <Text style= {styles.result}>
                    {InhalerDetails.Type}
                    </Text>
                </View>

                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    <Text style= {styles.title} >
                        Started: 
                    </Text>

                    <Text style= {styles.result}>
                    {InhalerDetails.Start_Date}
                    </Text>
                </View>

                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    <Text style= {styles.title} >
                        Expected end: 
                    </Text>

                    <Text style= {styles.result}>
                    {InhalerDetails.Expected_End_Date}
                    </Text>
                </View>

                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    <Text style= {styles.title} >
                    Expiry Date: 
                    </Text>

                    <Text style= {styles.result}>
                    {InhalerDetails.Expiry_Date}
                    </Text>
                </View>

                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    <Text style= {styles.title} >
                        Puffs Per Day: 
                    </Text>

                    <Text style= {styles.result}>
                    {InhalerDetails.Puffs_Per_Day}
                    </Text>
                </View>
                </View>

            <Text style={styles.titleText}>Puff Details</Text>

            

            <View style={{width: '85%', alignSelf: 'center',  marginBottom: 20}}>
            <Text style={{fontSize: 16, color: "#03076F", marginBottom: 5}}>Today</Text>
                <ProgressBar 
                    style={styles.progressBarContainer}
                    progress={inTodayPer}
                    color="#03076F"
                />
                <View style={{flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 15, color: "#03076F" }}> {InhalerDetails.Puffs_Used} </Text>
                    <Text style={{ fontSize: 15, color: "#03076F",  textAlign: "right", flex: 1 }}>{InhalerDetails.Puffs_Per_Day}</Text>

                </View>

            </View>

            

            <View style={{width: '85%', alignSelf: 'center'}}>
            <Text style={{ fontSize: 16, color: "#03076F", marginBottom: 5 }}> Available Puffs</Text>
                <ProgressBar 
                    style={styles.progressBarContainer}
                    progress={inTotalPer}
                    color="#03076F"
                />
                <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 15, color: "#03076F" }}> {InhalerDetails.Num_of_Puffs_Taken} </Text>
                    <Text style={{ fontSize: 15, color: "#03076F", textAlign: "right", flex: 1 }}>{InhalerDetails.Num_of_Puffs}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.buttonStyle}
            onPress={() => {
        navigation.navigate('Health_Education_Page', { user_Name: user_Name, Prof_Img: Prof_Img, userID: userID, serverIP: serverIP });
        }}>
                <Text style={styles.buttonText}> Learn How to Use Inhaler </Text>
            </TouchableOpacity>
        </View>
        )
      }
      

    return (
       <View style={{flex:1}}>
       <Header user_Name = {user_Name} Prof_Img = {Prof_Img} userID = {userID} serverIP = {serverIP}/>
        {InhalerDetails.Type==='Preventer' ? PreventerView() : RelieverView()}

        <Nav_Bottom iconName="IDV"  user_Name = {user_Name} Prof_Img = {Prof_Img} userID = {userID} serverIP = {serverIP}/>
       </View>
    );
};

const styles = StyleSheet.create({
    titleText: {
        color: '#03076F',
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: '10%',
    },

    result: {
        color: '#017FFF',
        fontSize: 15,
        marginLeft: 5,
      },

      title: {
        color: '#00157B',
        fontSize: 15,
      },

    progressBarContainer: {
        borderRadius: 30,
        overflow: 'hidden',
        width: '100%',
        height: 30,
        transform: [{ scaleX: 1.0 }, { scaleY: 1 }],
    },

    buttonStyle: {
        backgroundColor: '#9FC8FA',
        width: 260,
        borderRadius: 30,
        alignSelf: "center",
        marginTop: 40,
        padding: 10,
    },

    buttonText: {
        fontSize: 15,
        textAlign: 'center',
        color: '#FFFFFF',
    },
});


