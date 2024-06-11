import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const DateRecords = ({ navigation, route }) => {
    const { userId, coupleId } = route.params;
    const [records, setRecords] = useState([]);

    const fetchRecords = () => {
        axios.get('http://192.168.200.136:8080/history')
            .then(response => {
                setRecords(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    useEffect(() => {
        fetchRecords();

        const unsubscribe = navigation.addListener('focus', () => {
            fetchRecords();
        });

        return unsubscribe;
    }, [navigation]);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.recordContainer}
            onPress={() => navigation.navigate('EditRecord', {
                datingHistoryId: item.datingHistoryId,
                datingDate: item.datingDate,
                datehistory: item.datehistory,
                answer: item.answer,
                questionContent : item.question.questionContent,
                coupleId: item.coupleId,
                userId : userId
            })}
            
        >
            <Text style={styles.date}>{item.datingDate}</Text>
            <Text style={styles.history}>{item.datehistory}</Text>
            
            <Text style={styles.question}>
                {item.question.questionContent}
                {/* (ID: {item.question.questionId}) */}
            </Text>
            <Text style={styles.answer}>{item.answer}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>

             {/* 여기에 빈 공간을 추가합니다. */}
    <View style={{ marginVertical: 20 }}></View>


 {/* 여기에 빈 공간을 추가합니다. */}
 <View style={{ marginVertical: 20 }}></View>


            <Button
                title="데이트 기록 추가"
                onPress={() => navigation.navigate('AddDateRecord', { userId, coupleId })}
            />
            <FlatList
                data={records}
                renderItem={renderItem}
                keyExtractor={(item) => item.datingDate + item.coupleId}
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
    recordContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    date: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    history: {
        fontSize: 14,
        marginTop: 4,
    },
    answer: {
        fontSize: 14,
        marginTop: 4,
        color: '#555',
    },
    question: {
        fontSize: 14,
        marginTop: 4,
        color: '#777',
    },
});

export default DateRecords;
