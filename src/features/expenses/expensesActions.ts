import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import {db} from '../../app/firebase';
import {Expense} from './expenseTypes';
import {RootState} from '../../app/store';
import {query, orderBy} from 'firebase/firestore';

export const fetchExpenses = createAsyncThunk<
  Expense[],
  void,
  {state: RootState}
>('expenses/fetchExpenses', async (_, {getState, rejectWithValue}) => {
  try {
    const uid = getState().auth.user?.uid;
    if (!uid) throw new Error('No user');

    const expensesRef = collection(db, `users/${uid}/expenses`);
    const q = query(expensesRef, orderBy('date', 'desc'));

    const snapshot = await getDocs(q);
    const data: Expense[] = snapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Expense),
    }));

    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const addExpense = createAsyncThunk<void, Expense, {state: RootState}>(
  'expenses/addExpense',
  async (expense, {getState, rejectWithValue}) => {
    try {
      const uid = getState().auth.user?.uid;
      if (!uid) throw new Error('No user');
      await addDoc(collection(db, `users/${uid}/expenses`), expense);
      return;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateExpense = createAsyncThunk<
  void,
  Expense,
  {state: RootState}
>('expenses/updateExpense', async (expense, {getState, rejectWithValue}) => {
  try {
    const uid = getState().auth.user?.uid;
    if (!uid || !expense.id) throw new Error('Invalid data');

    const {id, ...data} = expense;
    await updateDoc(doc(db, `users/${uid}/expenses`, id), data);
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const deleteExpense = createAsyncThunk<void, string, {state: RootState}>(
  'expenses/deleteExpense',
  async (id, {getState, rejectWithValue}) => {
    try {
      const uid = getState().auth.user?.uid;
      if (!uid) throw new Error('No user');
      await deleteDoc(doc(db, `users/${uid}/expenses`, id));
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
