
import { ExpenseCategory } from "@/types/expense";

export const getCategoryIcon = (category: ExpenseCategory): string => {
  const icons: Record<ExpenseCategory, string> = {
    food: "🍔",
    transport: "🚗",
    entertainment: "🎬",
    utilities: "💡",
    housing: "🏠",
    health: "⚕️",
    education: "📚",
    shopping: "🛍️",
    other: "📦",
  };
  
  return icons[category] || "📦";
};

export const getCategoryColor = (category: ExpenseCategory): string => {
  const colors: Record<ExpenseCategory, string> = {
    food: "#FF9F43", // Orange
    transport: "#54BAB9", // Teal
    entertainment: "#FF6B6B", // Red
    utilities: "#4CAF50", // Green
    housing: "#9B87F5", // Purple
    health: "#2196F3", // Blue
    education: "#F06292", // Pink
    shopping: "#AA77FF", // Violet
    other: "#78909C", // Blue Gray
  };
  
  return colors[category] || "#78909C";
};

export const getCategoryLabel = (category: ExpenseCategory): string => {
  return category.charAt(0).toUpperCase() + category.slice(1);
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

export const getAllCategories = (): ExpenseCategory[] => {
  return [
    "food", 
    "transport", 
    "entertainment", 
    "utilities", 
    "housing", 
    "health", 
    "education", 
    "shopping", 
    "other"
  ];
};
