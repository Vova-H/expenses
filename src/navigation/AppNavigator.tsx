import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import LoginScreen from '../screens/LoginScreen';

import HomeScreen from '../screens/HomeScreen';
import {RootState} from '../app/store.ts';
import RegisterScreen from '../screens/RegistrationScreen.tsx';
import AddExpenseScreen from '../screens/AddExpensesScreen.tsx';
import UpdateExpensesScreen from '../screens/UpdateExpensesScreen.tsx';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {user ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
            <Stack.Screen
              name="UpdateExpense"
              component={UpdateExpensesScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
