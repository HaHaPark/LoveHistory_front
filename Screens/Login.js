import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const Login = ({ navigation }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (userId === 'admin' && password === '0000') {
      Alert.alert('Admin Login', 'Welcome, Admin!');
      navigation.navigate('AdminPage'); // AdminPage로 이동
      return;
    }

    const loginReq = {
      userId,
      password,
    };

    try {
      const response = await axios.post('http://192.168.200.136:8080/users/login', loginReq, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const loginRes = response.data;
        const user = loginRes.user;
        const couple = loginRes.couple;

        console.log(response.data);
        Alert.alert('Login Successful', `Welcome back, ${user.username}!`);
        
        // coupleId가 있을 경우 RealHome으로, 없을 경우 Home으로 이동
        if (couple && couple.coupleId) {
          navigation.navigate('RealHome', { userId: user.id, username: user.username, coupleId: couple.coupleId, coupleDate: couple.coupleDate, userId1: couple.userId1, userId2: couple.userId2 });
        } else {
          navigation.navigate('Home', { Id: user.id });
        }
      } else {
        Alert.alert('Login Failed', response.data.message || 'Invalid credentials');
      }
    } catch (error) {
      if (error.response) {
        // 서버가 상태 코드 범위 내의 응답을 반환했습니다.
        Alert.alert('Login Error', error.response.data.message || 'Invalid credentials');
      } else {
        // 요청이 설정되지 않았거나 서버가 응답하지 않았습니다.
        Alert.alert('Login Error', 'An error occurred. Please try again later.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="User ID"
        value={userId}
        onChangeText={setUserId}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
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

export default Login;
