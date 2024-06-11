import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const EditDate = ({ route, navigation }) => {
  const { username, coupleId, coupleDate,  userId1, userId2 } = route.params;
  const [newCoupleDate, setNewCoupleDate] = useState(coupleDate);

  const handleDateChange = (text) => {
    setNewCoupleDate(text);
  };

  const handleSaveDate = async () => {
    try {
      const response = await axios.put(`http://192.168.200.136:8080/couple/${coupleId}?coupleDate=${newCoupleDate}`, {}, {
        withCredentials: true, // 세션을 사용하고 있다면 필요
      });

      if (response.status === 200) {
        Alert.alert('Success', 'Couple date has been updated.');
        navigation.navigate('RealHome', { username, coupleId, coupleDate: newCoupleDate, userId1, userId2 });
      } else {
        Alert.alert('Update Failed', response.data.message || 'Failed to update couple date');
      }
    } catch (error) {
      if (error.response) {
        Alert.alert('Update Error', error.response.data.message || 'Failed to update couple date');
      } else {
        Alert.alert('Update Error', 'An error occurred. Please try again later.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Couple Date</Text>
      <TextInput
        style={styles.input}
        value={newCoupleDate}
        onChangeText={handleDateChange}
        placeholder="Enter new couple date (YYYY-MM-DD)"
      />
      <Button title="Save Date" onPress={handleSaveDate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default EditDate;
