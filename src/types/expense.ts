
export type ExpenseCategory = 
  | "food" 
  | "transport" 
  | "entertainment" 
  | "utilities" 
  | "housing" 
  | "health" 
  | "education" 
  | "shopping" 
  | "other";

export type Expense = {
  id: string;
  amount: number;
  description: string;
  category: ExpenseCategory;
  date: string;
};

export type CategoryTotal = {
  category: ExpenseCategory;
  total: number;
  percentage: number;
};

export interface MonthlyData {
  month: string;
  amount: number;
}

export interface DashboardData {
  totalExpenses: number;
  monthlyChange: number;
  categoryTotals: CategoryTotal[];
  recentExpenses: Expense[];
  monthlyData: MonthlyData[];
}
