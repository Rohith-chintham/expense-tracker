
import React from "react";
import Layout from "@/components/Layout";
import ExpenseList from "@/components/ExpenseList";

const Expenses = () => {
  return (
    <Layout>
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-6">Manage Expenses</h1>
        <ExpenseList />
      </div>
    </Layout>
  );
};

export default Expenses;
