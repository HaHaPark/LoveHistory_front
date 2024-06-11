import React from 'react';
import { View, Text, Button, StyleSheet , Alert} from 'react-native';
import axios from 'axios';

const RealHome = ({ route, navigation }) => {
  const { userId, username,coupleId, coupleDate, userId1, userId2 } = route.params;

  // 커플 시작 날짜로부터 현재까지의 경과 일수 계산
  const calculateDPlus = (date) => {
    const startDate = new Date(date);
    const currentDate = new Date();
    const timeDifference = currentDate - startDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference;
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://192.168.200.136:8080/users/logout', {}, {
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


  const dPlusDays = calculateDPlus(coupleDate);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>RealHome Screen</Text>
      <Text style={styles.text}>Username: {username}</Text>
      <Text style={styles.text}>CoupleID: {coupleId}</Text>
      <Text style={styles.text}>주목~~  {userId1}  님과  {userId2} 사귄다</Text>
      <Text style={styles.text}>사귄 날짜: {coupleDate}</Text>
      <Text style={styles.text}>D+{dPlusDays}일</Text>

      <View style={styles.buttonContainer}>
        <Button
          title="데이트 기록"
          onPress={() => navigation.navigate('DateRecords', { userId, coupleId })}
        />
        <Button
          title="사귄 날짜 수정"
          onPress={() => navigation.navigate('EditDate', { username, coupleId, coupleDate, userId1, userId2 })}
        />
      </View>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  text: {
    fontSize: 18,
    marginBottom: 12,
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    justifyContent: 'space-around',
  },
});

export default RealHome;
