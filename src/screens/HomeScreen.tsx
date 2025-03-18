import React, {useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchExpenses} from '../features/expenses/expensesActions.ts';
import {AppDispatch, RootState} from '../app/store';
import {Expense} from '../features/expenses/expenseTypes';
import {logoutUser} from '../features/auth/authActions';
import ExpenseCard from '../components/ExpenseCard';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../components/CustomBatton.tsx';

const HomeScreen = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation();
    const {items, loading, error} = useSelector(
        (state: RootState) => state.expenses,
    );

    useEffect(() => {
        dispatch(fetchExpenses());
    }, [dispatch]);

    const renderItem = ({item}: { item: Expense }) => (
        <ExpenseCard expense={item}/>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Your Expenses</Text>
                <CustomButton title={'Logout'}
                              onPress={() => dispatch(logoutUser())}
                              style={styles.logoutButton}
                />
            </View>

            {loading && <Text>Loading...</Text>}
            {error && <Text style={styles.error}>{error}</Text>}

            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={item => item.id!}
                ListEmptyComponent={<Text>No expenses yet.</Text>}
            />
            <CustomButton title={'Add Expense'} onPress={() => navigation.navigate('AddExpense' as never)}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {flex: 1, padding: 16, paddingTop: 40},
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    logoutButton: {
        paddingHorizontal: 30,
    },
    title: {fontSize: 24, fontWeight: 'bold'},
    error: {color: 'red', marginVertical: 8},
});

export default HomeScreen;
