import React, { useState } from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

const App = () => {
  const [phoneNumber, setPhoneNumber] = useState('')
  return (
    <SafeAreaView style={styles.container}>
      <View style={{padding: 10}}>
        <TextInput
          style={styles.phoneNumber}
          placeholder='Insert yout phone number'
          onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
          defaultValue={phoneNumber}
        />
        <Button
          title='Confirm'
          onPress={onConfirm}
        />
      </View>
    </SafeAreaView>
  );
}

const onConfirm = () => {
  console.log('Sending message...')
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
