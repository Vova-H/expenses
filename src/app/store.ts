import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice.ts';
import expensesReducer from '../features/expenses/expensesSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        expenses: expensesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
