
import React from "react";
import Layout from "@/components/Layout";
import DashboardSummary from "@/components/DashboardSummary";
import ExpenseChart from "@/components/ExpenseChart";
import CategoryBreakdown from "@/components/CategoryBreakdown";
import RecentExpenses from "@/components/RecentExpenses";

const Index = () => {
  return (
    <Layout>
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-6">Dashboard</h1>
        <div className="grid gap-6">
          <DashboardSummary />
          <div className="grid md:grid-cols-2 gap-6">
            <CategoryBreakdown />
            <RecentExpenses />
          </div>
          <ExpenseChart />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
