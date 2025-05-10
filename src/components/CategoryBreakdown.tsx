
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useExpenses } from "@/context/ExpenseContext";
import { formatCurrency, getCategoryIcon, getCategoryLabel } from "@/utils/categoryUtils";
import { Progress } from "@/components/ui/progress";

const CategoryBreakdown = () => {
  const { categoryTotals } = useExpenses();

  return (
    <Card className="animate-slide-in animate-delay-500">
      <CardHeader>
        <CardTitle>Category Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {categoryTotals.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              No expense data available
            </div>
          ) : (
            categoryTotals.map((category) => (
              <div key={category.category} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getCategoryIcon(category.category)}</span>
                      <span>{getCategoryLabel(category.category)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      {formatCurrency(category.total)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {category.percentage}%
                    </span>
                  </div>
                </div>
                <Progress value={category.percentage} className="h-2" />
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryBreakdown;
