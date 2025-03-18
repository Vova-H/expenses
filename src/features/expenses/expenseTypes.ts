export interface Expense {
  id?: string;
  title: string;
  amount: number;
  category: string;
  date: string | Date; // ISO string або "YYYY-MM-DD"
  currency: 'UAH' | 'USD' | 'EUR';
}
