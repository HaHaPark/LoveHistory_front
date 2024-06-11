import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const EditQuestionPage = ({ route, navigation }) => {
  const { questionId } = route.params;
  const [questionContent, setQuestionContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

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

 

  const handleUpdate = async () => {
    try {
      await axios.put(`http://192.168.200.136:8080/question/${questionId}`, {
        questionContent,
      });
      await fetchQuestions(); // 질문 수정 후, 질문 목록을 다시 로드합니다.
      navigation.goBack();
    } catch (error) {
      console.error('Error updating question:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ marginVertical: 20 }}></View>
      <View style={{ marginVertical: 20 }}></View>
      <Text style={styles.label}>질문 수정</Text>
      <TextInput
        style={styles.input}
        value={questionContent}
        onChangeText={setQuestionContent}
      />
      <Button title="수정 완료" onPress={handleUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default EditQuestionPage;
