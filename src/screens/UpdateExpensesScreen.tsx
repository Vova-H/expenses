import React from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../app/store';
import {
  fetchExpenses,
  updateExpense,
} from '../features/expenses/expensesActions';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {Expense} from '../features/expenses/expenseTypes';
import ExpenseForm from '../components/ExpenseForm.tsx';

type RouteParams = {
  expense: Expense;
};

const UpdateExpensesScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const route = useRoute<RouteProp<Record<string, RouteParams>, string>>();
  const {expense} = route.params;

  const handleUpdate = async (data: {
    title: string;
    amount: string;
    category: string;
    date: Date;
    currency: 'UAH' | 'USD' | 'EUR';
  }) => {
    const updatedExpense: Expense = {
      id: expense.id,
      title: data.title,
      amount: parseFloat(data.amount),
      category: data.category,
      date: data.date.toISOString(),
      currency: data.currency,
    };
    try {
      await dispatch(updateExpense(updatedExpense)).unwrap();
      await dispatch(fetchExpenses());
      navigation.goBack();
    } catch (err) {
      console.log(err);
      Alert.alert('Error', (err as string) || 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Expense</Text>
      <ExpenseForm
        defaultValues={{
          title: expense.title,
          amount: expense.amount.toString(),
          category: expense.category,
          date: new Date(expense.date),
          currency: expense.currency,
        }}
        onSubmit={handleUpdate}
        submitButtonText="Update"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 40},
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 20},
  input: {
    borderBottomWidth: 1,
    marginBottom: 12,
    paddingVertical: 6,
    fontSize: 16,
  },
});

export default UpdateExpensesScreen;
