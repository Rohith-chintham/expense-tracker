
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useExpenses } from "@/context/ExpenseContext";
import { formatCurrency } from "@/utils/categoryUtils";
import { ArrowDown, ArrowUp, DollarSign } from "lucide-react";

const DashboardSummary = () => {
  const { totalExpenses, monthlyChange } = useExpenses();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="animate-slide-in">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(totalExpenses)}</div>
          <p className="text-xs text-muted-foreground">
            Current month
          </p>
        </CardContent>
      </Card>
      
      <Card className="animate-slide-in animate-delay-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Monthly Change</CardTitle>
          {monthlyChange >= 0 ? (
            <ArrowUp className="h-4 w-4 text-green-500" />
          ) : (
            <ArrowDown className="h-4 w-4 text-red-500" />
          )}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            <span className={monthlyChange >= 0 ? "text-green-500" : "text-red-500"}>
              {monthlyChange >= 0 ? "+" : ""}
              {monthlyChange}%
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            From last month
          </p>
        </CardContent>
      </Card>
      
      <Card className="animate-slide-in animate-delay-200 md:col-span-2 lg:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Budget Status</CardTitle>
          <div className="h-4 w-4 rounded-full bg-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">On Track</div>
          <div className="mt-2 h-2 w-full rounded-full bg-muted">
            <div 
              className="h-2 rounded-full bg-gradient-purple" 
              style={{ width: '65%' }} 
            />
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            65% of monthly budget used
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardSummary;
