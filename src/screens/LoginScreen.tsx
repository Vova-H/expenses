import React from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {loginUser} from '../features/auth/authActions';
import {AppDispatch} from '../app/store';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/types.ts';
import AuthForm, {AuthFormValues} from '../components/AuthForm.tsx';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation<NavigationProp>();

    const handleLogin = async (data: AuthFormValues) => {
        try {
            await dispatch(loginUser({email: data.email, password: data.password})).unwrap();
        } catch (error: any) {
            console.log(error);
            Alert.alert('Authentication Error', error);
        }

    };

    return (
        <View style={styles.container}>
            <AuthForm onSubmit={handleLogin} submitButtonText="Login"/>
            <Text onPress={() => navigation.navigate('Register')} style={styles.link}>
                Don't have an account? Register
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {flex: 1, justifyContent: 'center', padding: 20},
    title: {fontSize: 24, fontWeight: 'bold', marginBottom: 10},
    input: {borderBottomWidth: 1, marginBottom: 10, padding: 5},
    error: {color: 'red', marginBottom: 10},
    link: {color: 'blue', marginTop: 10, textAlign: 'center'},
});

export default LoginScreen;
