import React, {useState} from "react";
import {View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { Overlay } from '@rneui/base';
import { Header, Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import Menu from "./Menu";

export default function Head({user_Name, Prof_Img, userID, serverIP}) {
    const navigation = useNavigation();
    const [visible, setVisible] = useState(false);
    const toggleOverlay = () =>
    {
        setVisible(!visible);
    };

    //const navigation = useNavigation();

    return(
        <View>
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={styles.overlay}>
                <Menu user_Name = {user_Name} Prof_Img = {Prof_Img} userID= {userID} serverIP = {serverIP}/>
            </Overlay>

            <Header
                leftComponent={
                    <View style={styles.firstLine}>
                        <TouchableOpacity onPress={toggleOverlay} style={styles.menu}>
                            <Icon name='menu' color='#000874' />
                        </TouchableOpacity>
                        <Image
                    source={require("./img_and_icon/drawable-mdpi/breath_logo_menu.png")}
                    style={styles.userLogo}
                />
                    </View>
                }
                rightComponent={
                    <TouchableOpacity onPress={() => navigation.navigate('Profile_Page', { user_Name: user_Name, Prof_Img: Prof_Img, userID: userID, serverIP: serverIP })}>
                <View style={styles.profImgContainer}>
                <Image source={{ uri: Prof_Img }} style={styles.profImage} />
                </View>
                    </TouchableOpacity>
                }
                containerStyle={styles.header}
            />
        </View>
    );
};

styles = StyleSheet.create({
    userLogo: {
        marginLeft: 10,
        alignSelf: 'center',
    },

    profImgContainer: {
        width: 42,
        height: 42,
        borderRadius: 50,
        overflow: 'hidden',
      },
      profImage: {
        width: '100%',
        height: '100%',
      },

    header: {
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
        borderBottomColor: '#e6e6e6',
        flexDirection: 'row',
        width: '100%',
        paddingLeft: '5%',
        paddingRight: '5%',
        paddingTop: '2%',
        alignSelf: 'center',
    },

    menu: {
        alignSelf: 'center',
    },
    firstLine: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 10,
        alignSelf: 'center',
        justifyContent: 'space-between',

    },

    breath: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    
    overlay: {
        width: "75%",
        height: "100%",
        backgroundColor: '#E8F3FF',
        position:"absolute",
        left:0,
        top:0,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
    },
})
