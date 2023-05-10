import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function coust_Button ({ text, isSelected, onPress })  {

  return (
    <TouchableOpacity onPress={onPress}>
          <Text style={isSelected ? styles.button_after : styles.button_before}>
            {text}
          </Text>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({

    button_before: {
      backgroundColor: '#000874',
      color: '#FFFFFF',
      alignItems: 'center',
      justifyContent: 'center',
      textAlignVertical: 'center',
      height: 40,
      borderRadius: 30,
      paddingHorizontal: '15%',
    },
    button_after: {
      backgroundColor: '#E8F3FF',
      textAlignVertical: 'center',
      color: '#000874',
      alignItems: 'center',
      justifyContent: 'center',
      height: 40,
      borderRadius: 30,
      fontWeight: 'bold',
      paddingHorizontal: '15%',
    },
  });
  