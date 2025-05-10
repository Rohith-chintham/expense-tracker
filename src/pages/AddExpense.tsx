
import React from "react";
import Layout from "@/components/Layout";
import AddExpenseForm from "@/components/AddExpenseForm";

const AddExpense = () => {
  return (
    <Layout>
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-6">Add Expense</h1>
        <AddExpenseForm />
      </div>
    </Layout>
  );
};

export default AddExpense;
