import React from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {registerUser} from '../features/auth/authActions';
import {AppDispatch} from '../app/store';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/types.ts';
import AuthForm, {AuthFormValues} from '../components/AuthForm.tsx';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

const RegisterScreen = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation<NavigationProp>();

    const handleRegister = async (data: AuthFormValues) => {
        try {
            await dispatch(registerUser({email: data.email, password: data.password})).unwrap();
            navigation.navigate('Home');
        } catch (err: any) {
            Alert.alert('Registration error', err);
        }
    };

    return (
        <View style={styles.container}>
            <AuthForm onSubmit={handleRegister} submitButtonText="Register"/>
            <Text onPress={() => navigation.navigate('Login')} style={styles.link}>
                Don't have an account?
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {flex: 1, justifyContent: 'center', padding: 20},
    title: {fontSize: 24, fontWeight: 'bold', marginBottom: 10},
    link: {color: 'blue', marginTop: 10, textAlign: 'center'},
});

export default RegisterScreen;
