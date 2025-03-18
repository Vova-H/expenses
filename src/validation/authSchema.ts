import * as yup from 'yup';

export const authSchema = yup.object().shape({
    email: yup
        .string()
        .email('Invalid email address')
        .required('Email is required'),
    password: yup
        .string()
        .min(6, 'Minimum 6 characters long')
        .required('Password is required'),
});
