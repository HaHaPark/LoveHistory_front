import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

const Signup = ({ navigation }) => {
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    const userReq = {
      userId,
      username,
      phone,
      password,
    };

    try {
      const response = await fetch('http://192.168.200.136:8080/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userReq),
      });

      if (response.ok) {
        const userRes = await response.json();
        Alert.alert('Signup Successful', `Welcome ${userRes.username}!`);
        navigation.navigate('Login'); // 회원가입 후 로그인 화면으로 이동
      } else {
        const errorRes = await response.json();
        Alert.alert('Signup Failed', errorRes.message || 'Something went wrong');
      }
    } catch (error) {
      Alert.alert('Signup Error', 'An error occurred. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>
      <TextInput
        style={styles.input}
        placeholder="ID를 입력해주세요"
        value={userId}
        onChangeText={setUserId}
      />
      <TextInput
        style={styles.input}
        placeholder="이름을 입력해주세요"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="전화번호를 입력해주세요"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호를 입력해주세요"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="회원가입하기" onPress={handleSignup} />
      <Button
        title="로그인 하기"
        onPress={() => navigation.navigate('Login')}
        color="blue"
      />
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

export default Signup;
