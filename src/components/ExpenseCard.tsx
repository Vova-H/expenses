import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Expense } from '../features/expenses/expenseTypes';
import { useNavigation } from '@react-navigation/native';
import { deleteExpense, fetchExpenses } from '../features/expenses/expensesActions.ts';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store.ts';
import { formatDate } from '../utils/formatDate.ts';

interface Props {
    expense: Expense;
}

const getCurrencySymbol = (currency: string) => {
    switch (currency) {
        case 'UAH':
            return '₴';
        case 'USD':
            return '$';
        case 'EUR':
            return '€';
        default:
            return currency;
    }
};

const ExpenseCard = ({ expense }: Props) => {
    const navigation = useNavigation();
    const dispatch = useDispatch<AppDispatch>();

    const goToUpdateExpenseScreen = () => {
        // @ts-ignore
        navigation.navigate('UpdateExpense', { expense });
    };

    const handleDelete = () => {
        Alert.alert('Delete Expense', 'Are you sure you want to delete this expense?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: async () => {
                    await dispatch(deleteExpense(expense.id!));
                    await dispatch(fetchExpenses());
                },
            },
        ]);
    };

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={goToUpdateExpenseScreen}
            onLongPress={handleDelete}>
            <View style={styles.row}>
                <Text style={styles.title}>{expense.title}</Text>
                <Text style={styles.amount}>
                    {Number(expense.amount).toFixed(2)} {getCurrencySymbol(expense.currency)}
                </Text>
            </View>
            <Text style={styles.meta}>
                {expense.category} | {formatDate(new Date(expense.date))}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        padding: 14,
        marginVertical: 6,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 17,
        fontWeight: '600',
        color: '#333',
        flex: 1,
    },
    amount: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'green',
        marginLeft: 8,
        textAlign: 'right',
    },
    meta: {
        fontSize: 13,
        color: '#888',
        marginTop: 6,
    },
});

export default ExpenseCard;
