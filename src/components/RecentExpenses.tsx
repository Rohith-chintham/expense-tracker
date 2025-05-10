
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useExpenses } from "@/context/ExpenseContext";
import { formatCurrency, getCategoryIcon, formatDate } from "@/utils/categoryUtils";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

const RecentExpenses = () => {
  const { expenses, deleteExpense } = useExpenses();
  
  // Get the 5 most recent expenses
  const recentExpenses = [...expenses]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <Card className="animate-slide-in animate-delay-300">
      <CardHeader>
        <CardTitle>Recent Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentExpenses.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              No expenses recorded yet
            </div>
          ) : (
            recentExpenses.map((expense) => (
              <div
                key={expense.id}
                className="flex items-center justify-between rounded-lg border p-3 transition-all hover:bg-accent"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-lg">
                    {getCategoryIcon(expense.category)}
                  </div>
                  <div>
                    <div className="font-medium">{expense.description}</div>
                    <div className="text-sm text-muted-foreground">
                      {formatDate(expense.date)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">
                    {formatCurrency(expense.amount)}
                  </span>
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
      </CardContent>
    </Card>
  );
};

export default RecentExpenses;
