import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Signup from './Screens/Signup';
import Login from './Screens/Login';
import Home from './Screens/Home';
import AdminPage from './Screens/AdminPage';
import EditQuestionPage from './Screens/EditQuestionPage';
import RealHome from './Screens/RealHome';
import EditDate from './Screens/EditDate';
import DateRecords from './Screens/DateRecords';
import AddDateRecord from './Screens/AddDateRecord';
import EditRecord from './Screens/EditRecord';


import { StyleSheet } from 'react-native';

// Stack Navigator 생성
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Signup" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AdminPage" component={AdminPage} />
        <Stack.Screen name="EditQuestionPage" component={EditQuestionPage} />
        <Stack.Screen name="RealHome" component={RealHome} />
        <Stack.Screen name="EditDate" component={EditDate} />
        <Stack.Screen name="DateRecords" component={DateRecords} />
        <Stack.Screen name="AddDateRecord" component={AddDateRecord} />
        <Stack.Screen name="EditRecord" component={EditRecord} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
