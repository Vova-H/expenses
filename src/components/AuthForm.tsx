import React from 'react';
import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { authSchema } from '../validation/authSchema';

export type AuthFormValues = {
    email: string;
    password: string;
};

type AuthFormProps = {
    onSubmit: (data: AuthFormValues) => void;
    submitButtonText: string;
};

const AuthForm: React.FC<AuthFormProps> = ({ onSubmit, submitButtonText }) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<AuthFormValues>({
        resolver: yupResolver(authSchema),
    });

    return (
        <View style={styles.form}>
            <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                    <>
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor="#999"
                            style={[styles.input, errors.email && styles.inputError]}
                            value={value}
                            onChangeText={onChange}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        {errors.email && (
                            <Text style={styles.error}>{errors.email.message}</Text>
                        )}
                    </>
                )}
            />

            <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                    <>
                        <TextInput
                            placeholder="Passwrod"
                            placeholderTextColor="#999"
                            style={[styles.input, errors.password && styles.inputError]}
                            value={value}
                            onChangeText={onChange}
                            secureTextEntry
                        />
                        {errors.password && (
                            <Text style={styles.error}>{errors.password.message}</Text>
                        )}
                    </>
                )}
            />

            <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
                <Text style={styles.buttonText}>{submitButtonText}</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    form: {
        width: '100%',
        gap: 12,
    },
    input: {
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    inputError: {
        borderColor: 'tomato',
    },
    error: {
        color: 'tomato',
        marginTop: -8,
        marginBottom: 4,
        marginLeft: 4,
        fontSize: 13,
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 14,
        borderRadius: 10,
        marginTop: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
});

export default AuthForm;
