import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {UserData} from './authTypes';
import {auth} from '../../app/firebase.ts';
import {clearExpenses} from '../expenses/expensesSlice.ts';


export const registerUser = createAsyncThunk<UserData, { email: string; password: string }, { rejectValue: string }>(
    'auth/registerUser',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            return { email: user.email || '', uid: user.uid };
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);


export const loginUser = createAsyncThunk<UserData, { email: string; password: string }, { rejectValue: string }>(
    'auth/loginUser',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            return { email: user.email || '', uid: user.uid };
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_, { dispatch }) => {
        await auth.signOut();
        dispatch(clearExpenses());
    }
);
