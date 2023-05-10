import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';

export default function CustomTextInput({ label, value, onChangeText, secure }) {

    const [clicked, setClicked] = useState(false);

    return (
        <TouchableOpacity style={styles.container} onPress={ () => setClicked(false)}>
        <TouchableOpacity style={styles.inputCont} onPress={ () => setClicked(true)}>
            
            {clicked ? (
                <View>
                    <Text style={styles.label_after}>{label}</Text>
                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChangeText}    
                    secureTextEntry={secure}                
                />
            </View>

            ):(
                <Text style={styles.label_before}>{label}</Text>
            )}
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#E8F3FF',
        width: '80%',
        padding: 10,
        marginBottom: 20,
    },

    label_before: {
        fontSize: 18,
        color: '#000000',
        padding: 7,
    },

    label_after: {
        fontSize: 14,
        color: '#000000',
        marginBottom: 5,
    },
    input: {
        borderBottomWidth: 1,
        borderColor: '#017FFF',
        backgroundColor: '#F8F8F8',
        padding: 12,
        fontSize: 16,
    },

});
