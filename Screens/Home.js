// HomeScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const Home = ({ route, navigation }) => {
  const { Id } = route.params;
  const [coupleCode, setCoupleCode] = useState('');
  const [coupleDate, setCoupleDate] = useState('');

  const handleCreateCouple = async () => {
    try {
        // coupleDate를 Date 객체로 변환
        const date = new Date(coupleDate);
  
        // 유효한 날짜인지 검증
        if (isNaN(date.getTime())) {
          Alert.alert('Error', 'Invalid date format');
          return;
        }
  
        // 'YYYY-MM-DD' 형식으로 변환
        const coupleDateFormatted = date.toISOString().split('T')[0];
  
        const response = await axios.post(`http://192.168.0.80:8080/couple/create/${Id}`, {
          coupleDate: coupleDateFormatted
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.status === 200) {
          Alert.alert('Couple Created', `Couple Code: ${response.data}`);
        } else {
          Alert.alert('Error', 'Failed to create couple');
        }
      } catch (error) {
        Alert.alert('Error', 'An error occurred. Please try again later.');
      }
    
  };

  const handleJoinCouple = async () => {
    try {
      const response = await axios.post(`http://192.168.0.80:8080/couple/join/${Id}`, null, {
        params: { coupleCode },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        Alert.alert('Success', response.data);
      } else {
        Alert.alert('Error', 'Failed to join couple');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred. Please try again later.');
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://192.168.0.80:8080/users/logout', {}, {
        withCredentials: true, // 세션을 사용하고 있다면 필요
      });

      if (response.status === 200) {
        Alert.alert('Logout Successful', 'You have been logged out.');
        navigation.navigate('Login');
      } else {
        Alert.alert('Logout Failed', response.data.message || 'Failed to logout');
      }
    } catch (error) {
      if (error.response) {
        Alert.alert('Logout Error', error.response.data.message || 'Failed to logout');
      } else {
        Alert.alert('Logout Error', 'An error occurred. Please try again later.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <TextInput
        style={styles.input}
        placeholder="Couple Date (YYYY-MM-DD)"
        value={coupleDate}
        onChangeText={setCoupleDate}
      />
      <Button title="Create Couple" onPress={handleCreateCouple} />
      <TextInput
        style={styles.input}
        placeholder="Couple Code"
        value={coupleCode}
        onChangeText={setCoupleCode}
      />
      <Button title="Join Couple" onPress={handleJoinCouple} />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default Home;
