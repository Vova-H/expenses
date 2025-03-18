import * as yup from 'yup';

export const expenseSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  amount: yup
    .string()
    .matches(/^\d+(\.\d{1,2})?$/, 'Amount must be a valid number')
    .required('Amount is required'),
  category: yup.string().required('Category is required'),
  date: yup.date().required('Date is required'),
  currency: yup.string().oneOf(['UAH', 'USD', 'EUR']).required('Currency is required'),
});
