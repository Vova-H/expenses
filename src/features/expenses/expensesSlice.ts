import {createSlice} from '@reduxjs/toolkit';
import {Expense} from './expenseTypes';
import {
  addExpense,
  deleteExpense,
  fetchExpenses,
  updateExpense,
} from './expensesActions.ts';

interface ExpensesState {
  items: Expense[];
  loading: boolean;
  error: string | null;
}

const initialState: ExpensesState = {
  items: [],
  loading: false,
  error: null,
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    clearExpenses: state => {
      state.items = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // fetch
      .addCase(fetchExpenses.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // add
      .addCase(addExpense.fulfilled, () => {})

      // update
      .addCase(updateExpense.fulfilled, () => {})

      // delete
      .addCase(deleteExpense.fulfilled, () => {});
  },
});

export const {clearExpenses} = expensesSlice.actions;
export default expensesSlice.reducer;
