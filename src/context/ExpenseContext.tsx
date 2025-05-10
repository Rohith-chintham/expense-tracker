
import React, { createContext, useState, useContext, useEffect } from "react";
import { Expense, ExpenseCategory, CategoryTotal, MonthlyData } from "@/types/expense";
import { toast } from "sonner";

// Helper to generate a random ID
const generateId = () => {
  return Math.random().toString(36).substring(2, 15);
};

// Get a date string in YYYY-MM-DD format
const getFormattedDate = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

// Sample data for initial state
const demoExpenses: Expense[] = [
  {
    id: generateId(),
    amount: 35.50,
    description: "Grocery shopping",
    category: "food",
    date: getFormattedDate(new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)),
  },
  {
    id: generateId(),
    amount: 120.00,
    description: "Electricity bill",
    category: "utilities",
    date: getFormattedDate(new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)),
  },
  {
    id: generateId(),
    amount: 50.00,
    description: "Movie tickets",
    category: "entertainment",
    date: getFormattedDate(new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)),
  },
  {
    id: generateId(),
    amount: 850.00,
    description: "Monthly rent",
    category: "housing",
    date: getFormattedDate(new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)),
  },
  {
    id: generateId(),
    amount: 95.20,
    description: "Gas refill",
    category: "transport",
    date: getFormattedDate(new Date()),
  },
];

// Generate random monthly data for the previous 6 months
const generateMonthlyData = (): MonthlyData[] => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  return months.map((month, index) => ({
    month,
    amount: Math.floor(Math.random() * 1000) + 500,
  }));
};

interface ExpenseContextType {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, "id">) => void;
  deleteExpense: (id: string) => void;
  totalExpenses: number;
  categoryTotals: CategoryTotal[];
  monthlyData: MonthlyData[];
  monthlyChange: number;
  getFilteredExpenses: (category?: ExpenseCategory | null, startDate?: string, endDate?: string) => Expense[];
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load expenses from localStorage or use demo data
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses ? JSON.parse(savedExpenses) : demoExpenses;
  });

  const [monthlyData] = useState<MonthlyData[]>(generateMonthlyData());

  // Save expenses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  // Calculate the total amount of all expenses
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  // Calculate category totals and percentages
  const calculateCategoryTotals = (): CategoryTotal[] => {
    const categoryMap: Record<string, number> = {};
    
    // Sum up amounts by category
    expenses.forEach((expense) => {
      if (categoryMap[expense.category]) {
        categoryMap[expense.category] += expense.amount;
      } else {
        categoryMap[expense.category] = expense.amount;
      }
    });
    
    // Calculate percentages and create CategoryTotal objects
    const categoryTotals: CategoryTotal[] = [];
    for (const [category, total] of Object.entries(categoryMap)) {
      categoryTotals.push({
        category: category as ExpenseCategory,
        total,
        percentage: totalExpenses ? Math.round((total / totalExpenses) * 100) : 0,
      });
    }
    
    // Sort by total (descending)
    return categoryTotals.sort((a, b) => b.total - a.total);
  };

  // Calculate month-over-month change (just a random demo value here)
  const monthlyChange = Math.floor(Math.random() * 30) - 10; // Random value between -10% and +20%

  // Add a new expense
  const addExpense = (expense: Omit<Expense, "id">) => {
    const newExpense: Expense = {
      ...expense,
      id: generateId(),
    };
    
    setExpenses([...expenses, newExpense]);
    toast.success("Expense added successfully");
  };

  // Delete an expense by ID
  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
    toast.success("Expense deleted successfully");
  };

  // Get filtered expenses based on category and date range
  const getFilteredExpenses = (
    category?: ExpenseCategory | null,
    startDate?: string,
    endDate?: string
  ): Expense[] => {
    return expenses.filter((expense) => {
      const matchesCategory = !category || expense.category === category;
      const matchesDateRange =
        (!startDate || expense.date >= startDate) &&
        (!endDate || expense.date <= endDate);
      
      return matchesCategory && matchesDateRange;
    });
  };

  const value = {
    expenses,
    addExpense,
    deleteExpense,
    totalExpenses,
    categoryTotals: calculateCategoryTotals(),
    monthlyData,
    monthlyChange,
    getFilteredExpenses,
  };

  return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>;
};

// Custom hook to use the ExpenseContext
export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error("useExpenses must be used within an ExpenseProvider");
  }
  return context;
};
