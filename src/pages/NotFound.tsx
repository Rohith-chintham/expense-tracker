
import React from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold text-expense-purple">404</h1>
        <p className="text-xl text-gray-600 mb-4">
          Oops! Page not found
        </p>
        <p className="text-gray-500">
          We couldn't find the page you were looking for.
        </p>
        <div className="mt-6">
          <Button asChild>
            <Link to="/">Return to Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
