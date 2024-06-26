import { View, Text, TouchableOpacity, TextInput, Alert, StyleSheet, SafeAreaView, Image } from 'react-native'
import React, { useState,useRef } from 'react';
import { COLORS, FONT } from '../../constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRoute } from '@react-navigation/native';
import { getAuth, PhoneAuthProvider, signInWithCredential, signInWithPhoneNumber, PhoneAuthState } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import firebase from '../../config/firebase';

const auth = getAuth(firebase);

const Otp = ({navigation}) => {
  const route = useRoute();
const { verificationId, phoneNumber } = route.params;

  const [code, setCode] = useState('');
  const codeInputRefs = useRef([]);

  const handleVerification = async () => {
    try {
      const credential = PhoneAuthProvider.credential(verificationId, code);
      const userCredential = await signInWithCredential(auth, credential);
      navigation.navigate('nameinfo',{phoneNumber});
    } catch (error) {
      console.log('Error verifying OTP', error);
      Alert.alert('Verification Failed');
    }
  };
  

    const handleCodeChange = (index, value) => {
      const updatedCode = code.split('');
      updatedCode[index] = value;
      setCode(updatedCode.join(''));
  
      if (value === '' && index > 0) {
        for (let i = index - 1; i >= 0; i--) {
          if (code[i]) {
            codeInputRefs.current[i].focus();
            break;
          }
        }
      } else if (value !== '' && index < codeInputRefs.current.length - 1) {
        codeInputRefs.current[index + 1].focus();
      }
    };

  return (
    <SafeAreaView style={{flex:1,width:'100%'}}>
     <Image
       source={require('../../assets/images/back.jpg')}
       style={{zIndex:-1,width:'100%'}}
    />
    <View style={styles.backArrow}>
        <TouchableOpacity>
          <Icon
            name='arrow-back'
            size={28}
            color={COLORS.lightWhite}
            onPress={() => navigation.goBack()}
          />      
        </TouchableOpacity>
      </View>
    <View style={styles.container}>
      <View style={styles.textContainer}>
      <Text style={styles.otpText}>Enter OTP</Text>
      <Text>We have sent a 6-digit code to {phoneNumber}</Text>

      </View>
    <View style={styles.codeContainer}>
      {[...Array(6)].map((_, index) => (
        <TextInput
          key={index}
          style={styles.codeInput}
          placeholder=""
          placeholderTextColor="gray"
          onChangeText={(value) => handleCodeChange(index, value)}
          value={code[index] || ''}
          keyboardType="numeric"
          maxLength={1}
          ref={(ref) => (codeInputRefs.current[index] = ref)}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === 'Backspace' && code[index] === '') {
              for (let i = index - 1; i >= 0; i--) {
                if (code[i]) {
                  codeInputRefs.current[i].focus();
                  break;
                }
              }
            }
          }}
        />
      ))}
    </View>
    <TouchableOpacity style={[styles.button,{backgroundColor:(code.length==6)?COLORS.two:COLORS.gray2}]} onPress={handleVerification}>
      <Text style={styles.buttonText}>Verify</Text>
    </TouchableOpacity>
    <Text style={{marginTop:20}}>Didn't receive any code? <Text style={{color:COLORS.two,fontWeight:'bold'}}>Resend OTP</Text></Text>
  </View>
   </SafeAreaView>
  )
}

export default Otp;

const styles = StyleSheet.create({
  container: {
    position:'absolute',
    bottom:0,
    left:0,
    right:0,
    backgroundColor: COLORS.white,
    height:'60%',
    borderTopLeftRadius:70,
    alignItems:'center',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 40,
    gap:15

  },
  codeInput: {
    width: 40,
    height: 40,
    borderColor: COLORS.two,
    borderWidth: 1,
    textAlign: 'center',
    fontSize: 20,
    borderRadius:10,

  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width:'80%',
    alignItems:'center',
    alignSelf:'center',
    marginTop: 21,

  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 17,
  },
  otpText:{
    fontSize: 20,
  },
  textContainer:{
    marginTop:60
  },
  backArrow:{
    height:40,
    width:40, 
    backgroundColor:COLORS.two,
    borderRadius:50, 
    marginTop:40,
    marginLeft:10,
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    top:0,
    left:0,
    zIndex:1
  },
  });