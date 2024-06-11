import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

const AdminPage = ({ navigation }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const response = await axios.get('http://192.168.200.136:8080/question');
//         setQuestions(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching questions:', error);
//         setLoading(false);
//       }
//     };

//     fetchQuestions();
//   }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('http://192.168.200.136:8080/question');
      setQuestions(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching questions:', error);
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchQuestions();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

        
    {/* 여기에 빈 공간을 추가합니다. */}
    <View style={{ marginVertical: 20 }}></View>

      <FlatList
        data={questions}
        keyExtractor={(item) => item.questionId.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            {/* <Text style={styles.title}>ID: {item.questionId}</Text> */}
            <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('EditQuestionPage', { questionId: item.questionId })}
          >
            <Text style={styles.content}>{item.questionContent}</Text>
          </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   // justifyContent: 'center',
  //  alignItems: 'center',
    padding: 20,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default AdminPage;
