import React from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {AppDispatch} from '../app/store';
import {addExpense, fetchExpenses} from '../features/expenses/expensesActions';
import {Expense} from '../features/expenses/expenseTypes';
import ExpenseForm from '../components/ExpenseForm';

const AddExpenseScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();

  const handleAdd = async (data: any) => {
    const newExpense: Expense = {
      title: data.title,
      amount: parseFloat(data.amount),
      category: data.category,
      date: data.date.toISOString(),
      currency: data.currency,
    };

    try {
      await dispatch(addExpense(newExpense)).unwrap();
      await dispatch(fetchExpenses());
      navigation.goBack();
    } catch (err) {
      console.log(err);
      Alert.alert('Error', (err as string) || 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Expense</Text>
      <ExpenseForm onSubmit={handleAdd} submitButtonText="Save" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 40},
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 20},
});

export default AddExpenseScreen;
