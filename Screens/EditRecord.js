import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const EditRecord = ({ route, navigation }) => {
    const { datingHistoryId, datingDate, datehistory, answer, questionContent, userId, coupleId } = route.params;
    const [newDatingDate, setNewDatingDate] = useState(datingDate);
    const [newDatehistory, setNewDatehistory] = useState(datehistory);
    const [newAnswer, setNewAnswer] = useState(answer);

    const updateRecord = () => {
        axios.put(`http://192.168.200.136:8080/history/${datingHistoryId}`, {
            datingDate: newDatingDate,
            datehistory: newDatehistory,
            answer: newAnswer,
            questionContent: questionContent,
        })
        .then(response => {
            console.log('Record updated:', response.data);
            navigation.navigate('DateRecords', { userId, coupleId }); 
        })
        .catch(error => {
            console.error('Error updating record:', error);
        });
    };

    const deleteRecord = () => {
        axios.delete(`http://192.168.200.136:8080/history/${datingHistoryId}`)
        .then(response => {
            console.log('Record deleted:', response.data);
            navigation.navigate('DateRecords', { userId, coupleId });
        })
        .catch(error => {
            console.error('Error deleting record:', error);
        });
    };

    const confirmDelete = () => {
        Alert.alert(
            '삭제 확인',
            '정말로 이 기록을 삭제하시겠습니까?',
            [
                { text: '취소', style: 'cancel' },
                { text: '삭제', onPress: deleteRecord },
            ],
            { cancelable: true }
        );
    };

    return (
        <View style={styles.container}>

            
                       {/* 여기에 빈 공간을 추가합니다. */}
    <View style={{ marginVertical: 20 }}></View>

    
                       {/* 여기에 빈 공간을 추가합니다. */}
                       <View style={{ marginVertical: 20 }}></View>
                       
            <Text style={styles.label}>데이트 날짜</Text>
            <TextInput
                style={styles.input}
                value={newDatingDate}
                onChangeText={setNewDatingDate}
            />
            <Text style={styles.label}>데이트 내용</Text>
            <TextInput
                style={styles.input}
                value={newDatehistory}
                onChangeText={setNewDatehistory}
            />
            <Text style={styles.label}>질문 내용</Text>
            <Text style={styles.questionContent}>{questionContent}</Text>
            <Text style={styles.label}>답변</Text>
            <TextInput
                style={styles.input}
                value={newAnswer}
                onChangeText={setNewAnswer}
            />
            <Button title="수정 완료" onPress={updateRecord} />
            <Button title="삭제" onPress={confirmDelete} color="red" />
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
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginBottom: 16,
    },
    questionContent: {
        fontSize: 16,
        marginBottom: 16,
        color: '#333',
    },
});

export default EditRecord;
