import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Text, TextInput, View, Image, ScrollView, Alert } from 'react-native';
import Nav_Bottom from './Nav_Bottom';
import Header from './Header';
import { useNavigation } from '@react-navigation/native';

export default function Reference({route}) {
    const { user_Name, Prof_Img, userID, serverIP } = route.params;
    const navigation = useNavigation();

    return (

        <View style={styles.container}>
        <Header user_Name = {user_Name} Prof_Img = {Prof_Img} userID = {userID} serverIP = {serverIP}/> 
        <View style={{flex: 1}}>
        <Text style={styles.titleText}>Refer<Text style={{ color: '#94C9FF' }}>ence</Text></Text>

        <View style={{width: '90%', justifyContent: 'center', alignItems: 'center', alignSelf: 'center'}}>
        <ScrollView>
        <Text style={{fontSize: 15, textAlign: 'justify'}}>
        Sensitive Choice. 2022. Asthma Action Plans. 
        [Online] Available At: 
        &lt;Https://Www.Sensitivechoice.Com/Asthma-
        action-plans/&gt; [Accessed 3 October 2022].
        {'\n\n'}
        Thomas, M., Kay, S., Pike, J., Williams, A., 
        Rosenzweig, J., Hillyer, E. And Price, D., 
        2009. The Asthma Control Testtm (ACT) 
        As A Predictor Of GINA Guideline-defined 
        Asthma Control: Analysis Of A Multinational 
        Cross-sectional Survey. Primary Care 
        Respiratory Journal, 18(1), Pp.41-49.
        {'\n\n'}
        Nationalasthma.org.au. 2022. The National 
        Asthma Council Australia. [online] Available 
        at: &lt;https://www.nationalasthma.org.au/&gt; 
        [Accessed 18 October 2022].
        {'\n\n'}
        Sensitive Choice. 2022. Asthma Action Plans.
        [online] Available at: 
        &lt;https://www.sensitivechoice.com/asthma-
        action-plans/&gt; [Accessed 16 October 2022].
        {'\n\n'}
        Asthma Australia. 2022. What is Asthma?. 
        [online] Available at: 
        &lt;https://asthma.org.au/about-asthma/
        understanding-asthma/asthma/&gt; 
        [Accessed 17 October 2022].
        {'\n\n'}
        Asthma Australia. 2022. What is Asthma?. 
        [online] Available at: &lt;https://asthma.org.au
        /about-asthma/understanding-asthma/asthma
        /&gt; [Accessed 18 October 2022].
        {'\n\n'}
        Asthmahandbook.org.au. 2022. Australian 
        Asthma Handbook. [online] Available at: 
        &lt;https://www.asthmahandbook.org.au/
        resources/definitions&gt; [Accessed 17 October 2022].
        {'\n\n'}
        Global Initiative for Asthma - GINA. 2022. 
        FAQs - Global Initiative for Asthma - GINA. 
        [online] Available at: &lt;https://ginasthma.
        org/about-us/faqs/&gt; [Accessed 18 October 2022].
        {'\n\n'}
        Global Initiative for Asthma - GINA. 2022. 
        FAQs - Global Initiative for Asthma - GINA. 
        [online] Available at: &lt;https://ginasthma
        .org/about-us/faqs/&gt; [Accessed 18 October 2022].
        {'\n\n'}
        Global Initiative for Asthma - GINA. 2022. 
        FAQs - Global Initiative for Asthma - GINA. 
        [online] Available at: &lt;https://ginasthma
        .org/about-us/faqs&gt; [Accessed 18 October 2022].
        {'\n\n'}
        Healthdirect.gov.au. 2022. Asthma. [online] 
        Available at: &lt;https://www.healthdirect.gov
        .au/asthma&gt; [Accessed 18 October 2022].
        {'\n\n'}
        Healthdirect.gov.au. 2022. Asthma. [online] 
        Available at: &lt;https://www.healthdirect.gov
        .au/asthma&gt; [Accessed 18 October 2022].
        {'\n\n'}
        Healthdirect.gov.au. 2022. How to use an 
        asthma inhaler. [online] Available at: 
        &lt;https://www.healthdirect.gov.au/how-to-
        use-an-asthma-inhaler&gt; [Accessed 18 
        October 2022].
        
        </Text>
        </ScrollView>
        </View>
        
        </View>


        <Nav_Bottom iconName="Ref"  user_Name = {user_Name} Prof_Img = {Prof_Img} userID = {userID} serverIP = {serverIP}/> 
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
titleText2: {
    color: '#03076F',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
},

viewButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingVertical: 4,
    width: 150,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { 
      width: 0, 
      height: 2 
    }, 
    shadowOpacity: 0.2, 
    shadowRadius: 2,
    backgroundColor: '#000874',
    marginTop: '30%',
  },
  btnText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 15,
  },

  icon: {
    alignSelf: 'center',
    marginRight: 5,
  },
});
