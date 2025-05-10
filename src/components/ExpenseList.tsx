
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useExpenses } from "@/context/ExpenseContext";
import {
  formatCurrency,
  getCategoryIcon,
  getCategoryLabel,
  formatDate,
  getAllCategories,
} from "@/utils/categoryUtils";
import { ExpenseCategory } from "@/types/expense";
import { Trash } from "lucide-react";

const ExpenseList = () => {
  const { expenses, deleteExpense } = useExpenses();
  const [selectedCategory, setSelectedCategory] = useState<ExpenseCategory | null>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  
  const allCategories = getAllCategories();

  // Apply filters to expenses
  const filteredExpenses = expenses.filter((expense) => {
    const matchesCategory = !selectedCategory || expense.category === selectedCategory;
    const matchesDateRange =
      (!startDate || expense.date >= startDate) &&
      (!endDate || expense.date <= endDate);
    const matchesSearch = !searchTerm || expense.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesDateRange && matchesSearch;
  });

  // Sort expenses by date (newest first)
  const sortedExpenses = [...filteredExpenses].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const resetFilters = () => {
    setSelectedCategory(null);
    setStartDate("");
    setEndDate("");
    setSearchTerm("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Input
                placeholder="Search expenses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <Select
                value={selectedCategory || ""}
                onValueChange={(value) => setSelectedCategory(value as ExpenseCategory || null)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  {allCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {getCategoryLabel(category)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                placeholder="Start Date"
              />
              <span className="text-muted-foreground">to</span>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                placeholder="End Date"
              />
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={resetFilters}>
              Reset Filters
            </Button>
            <p className="text-sm text-muted-foreground">
              {filteredExpenses.length} {filteredExpenses.length === 1 ? "expense" : "expenses"} found
            </p>
          </div>
          
          <div className="space-y-4 mt-4">
            {sortedExpenses.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No expenses found matching your filters
              </div>
            ) : (
              sortedExpenses.map((expense) => (
                <div
                  key={expense.id}
                  className="flex items-center justify-between rounded-lg border p-4 transition-all hover:bg-accent"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-xl">
                      {getCategoryIcon(expense.category)}
                    </div>
                    <div>
                      <div className="font-medium">{expense.description}</div>
                      <div className="text-sm flex gap-2">
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs">
                          {getCategoryLabel(expense.category)}
                        </span>
                        <span className="text-muted-foreground">
                          {formatDate(expense.date)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="font-semibold text-right">
                      {formatCurrency(expense.amount)}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteExpense(expense.id)}
                      className="h-8 w-8 p-0"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseList;
