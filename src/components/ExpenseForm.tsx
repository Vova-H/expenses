import {yupResolver} from '@hookform/resolvers/yup';
import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import {useForm, Controller} from 'react-hook-form';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Platform,
  StyleSheet,
} from 'react-native';

import {formatDate} from '../utils/formatDate';
import {expenseSchema} from '../validation/expenseSchema';
import CustomButton from './CustomBatton.tsx';
import {Picker} from '@react-native-picker/picker';

type FormValues = {
  title: string;
  amount: string;
  category: string;
  date: Date;
  currency: 'UAH' | 'USD' | 'EUR';
};

type FormProps = {
  defaultValues?: FormValues;
  onSubmit: (data: FormValues) => void;
  submitButtonText: string;
};

const ExpenseForm: React.FC<FormProps> = ({
  defaultValues = {
    title: '',
    amount: '',
    category: '',
    date: new Date(),
    currency: 'UAH',
  },
  onSubmit,
  submitButtonText,
}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
    setValue,
  } = useForm<FormValues>({
    resolver: yupResolver(expenseSchema),
    defaultValues,
  });

  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const date = watch('date') || defaultValues.date;

  const handleDateChange = (_: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setValue('date', selectedDate);
    }
  };

  return (
    <View style={styles.form}>
      <Controller
        control={control}
        name="title"
        render={({field: {onChange, value}}) => (
          <>
            <TextInput
              placeholder="Title"
              placeholderTextColor="#999"
              style={[styles.input, errors.title && styles.inputError]}
              value={value}
              onChangeText={onChange}
            />
            {errors.title && (
              <Text style={styles.error}>{errors.title.message}</Text>
            )}
          </>
        )}
      />

      <View>
        <View style={styles.row}>
          <Controller
            control={control}
            name="amount"
            render={({field: {onChange, value}}) => (
              <TextInput
                placeholder="Amount"
                placeholderTextColor="#999"
                style={[
                  styles.input,
                  styles.amountInput,
                  errors.amount && styles.inputError,
                ]}
                keyboardType="numeric"
                value={value}
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="currency"
            render={({field: {onChange, value}}) => (
              <View style={[styles.input, styles.currencyPicker]}>
                <Picker
                  selectedValue={value}
                  onValueChange={onChange}
                  dropdownIconColor="#000"
                >
                  <Picker.Item
                    label="₴"
                    value="UAH"
                    style={styles.currencyItem}
                  />
                  <Picker.Item
                    label="$"
                    value="USD"
                    style={styles.currencyItem}
                  />
                  <Picker.Item
                    label="€"
                    value="EUR"
                    style={styles.currencyItem}
                  />
                </Picker>
              </View>
            )}
          />
        </View>
        {errors.amount && (
          <Text style={styles.error}>{errors.amount.message}</Text>
        )}
        {errors.currency && (
          <Text style={styles.error}>{errors.currency.message}</Text>
        )}
      </View>

      <Controller
        control={control}
        name="category"
        render={({field: {onChange, value}}) => (
          <>
            <TextInput
              placeholder="Category"
              placeholderTextColor="#999"
              style={[styles.input, errors.category && styles.inputError]}
              value={value}
              onChangeText={onChange}
            />
            {errors.category && (
              <Text style={styles.error}>{errors.category.message}</Text>
            )}
          </>
        )}
      />

      <Pressable
        onPress={() => setShowDatePicker(true)}
        style={[styles.input, styles.dateInput]}>
        <Text style={styles.dateText}>{formatDate(date)}</Text>
      </Pressable>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <CustomButton title={submitButtonText} onPress={handleSubmit(onSubmit)} />
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
    color: '#000',
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
  dateInput: {
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#000',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  amountInput: {
    flex: 1,
    color: '#000',
  },
  currencyPicker: {
    width: 110,
    height: 60,
    justifyContent: 'center',
  },
  currencyItem: {
    color: '#000',
    backgroundColor: '#f5f5f5',
    height: 50,
  },
});

export default ExpenseForm;
