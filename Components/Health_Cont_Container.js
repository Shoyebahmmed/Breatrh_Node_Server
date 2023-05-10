import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Health_Cont_Container({ image, title, description, date, time, content, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress({ image, title, description, date, time, content })}>
      <Image source={{ uri:image}} style={styles.image} onLoad={() => console.log('Image loaded!')}/>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.datetimeContainer}>
          <Text style={styles.datetimeText}>{date} </Text>
          <Text style={styles.datetimeText}>{time}</Text>
        </View>

      </View>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    textAlign: 'center',
    height: 210,
    width: 370,
    backgroundColor: '#FFFFFF30',
    marginTop: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    height: 82,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.93)',
    padding: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
  },
  caption: {
    fontSize: 10,
    color: '#666666',
  },
  datetimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  datetimeText: {
    color: '#AEAEAE',
    fontSize: 12,
  }
  
});
