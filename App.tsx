import React, { useEffect, useState } from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

function PhoneSection({confirm, phoneNumber, onConfirm, setPhoneNumber }) {

  if(!!confirm) return ''

  return (
    <View>
       <TextInput
              style={styles.phoneNumber}
              placeholder='Insert your phone number'
              onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
              defaultValue={phoneNumber}
            />
            <Button
              title='Send SMS'
              onPress={onConfirm}
            />
      </View>  
  )
}

function ConfirmationCodeSection({code, styles, confirmCode, setCode }) {
  return (
    <View>
      <TextInput
        style={styles.confirmationCode}
        placeholder='Insert the confirmation code'
        onChangeText={code => setCode(code)}
        defaultValue={code}
      />
      <Button
        title='Validate'
        onPress={confirmCode}
      />
    </View>
  )
}

const App = () => {
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState<FirebaseAuthTypes.ConfirmationResult>();

  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('')

  // Handle login
  function onAuthStateChanged(user: any) {
    if (user) {
      console.log('USER', user)
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; 
  }, []);

  async function signInWithPhoneNumber(phoneNumber: string) {
    if(!phoneNumber) return;

    auth().signInWithPhoneNumber(phoneNumber).then((result) => {
      setConfirm(result);
    }).catch((reason) => console.log('error', reason));
  }

  async function confirmCode() {
    try {
      await confirm?.confirm(code);
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  // if (!confirm) {
  //   return (
  //     <Button
  //       title="Phone Number Sign In"
  //       onPress={() => signInWithPhoneNumber('+1 650-555-3434')}
  //     />
  //   );
  // }

  const onConfirm = () => {
    signInWithPhoneNumber(phoneNumber)
  }

  
  return (
    <SafeAreaView style={styles.container}>
      <View style={{padding: 10}}>
        <PhoneSection 
          onConfirm={onConfirm}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          confirm={confirm}
        />

        <ConfirmationCodeSection 
          code={code}
          confirmCode={confirmCode}
          setCode={setCode}
          styles={styles}
        />
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  phoneNumber: {
    textAlign: 'center',
    marginVertical: 8,
    height: 40
  },
  confirmationCode: {
    textAlign: 'center',
    marginVertical: 8,
    height: 40,
    marginTop: 10
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default App;
