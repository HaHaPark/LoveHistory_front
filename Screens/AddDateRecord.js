import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const AddDateRecord = ({ navigation, route }) => {
    const { userId, coupleId } = route.params;
    const [question, setQuestion] = useState({});
    const [datingDate, setDatingDate] = useState('');
    const [dateHistory, setDateHistory] = useState('');
    const [answer, setAnswer] = useState('');

    useEffect(() => {
        axios.get('http://192.168.200.136:8080/question/random')
            .then(response => {
                setQuestion(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleSubmit = () => {
        const postData = {
            datingDate,
            datehistory: dateHistory,
            answer
        };

        axios.post(`http://192.168.200.136:8080/history/${coupleId}/${question.questionId}`, postData)
            .then(response => {
                Alert.alert('성공', '데이트 기록이 추가되었습니다.');
                navigation.navigate('DateRecords', { userId, coupleId });
            })
            .catch(error => {
                console.error(error);
                Alert.alert('오류', '데이트 기록을 추가하는 중 오류가 발생했습니다.');
            });
    };

    return (
        <View style={styles.container}>

                       {/* 여기에 빈 공간을 추가합니다. */}
    <View style={{ marginVertical: 20 }}></View>

               {/* 여기에 빈 공간을 추가합니다. */}
               <View style={{ marginVertical: 20 }}></View>


            <Text style={styles.label}>랜덤 질문:</Text>
            <Text style={styles.question}>{question.questionContent}</Text>
            <TextInput
                style={styles.input}
                placeholder="사귄 날짜 (YYYY-MM-DD)"
                value={datingDate}
                onChangeText={setDatingDate}
            />
            <TextInput
                style={styles.input}
                placeholder="데이트 기록"
                value={dateHistory}
                onChangeText={setDateHistory}
            />
            <TextInput
                style={styles.input}
                placeholder="질문의 답"
                value={answer}
                onChangeText={setAnswer}
            />
            <Button
                title="저장"
                onPress={handleSubmit}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    question: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        padding: 8,
    },
});

export default AddDateRecord;
