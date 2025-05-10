
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { DollarSign, BarChart3, PlusCircle, Home } from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: <Home className="h-5 w-5" />,
  },
  {
    title: "Expenses",
    href: "/expenses",
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    title: "Add Expense",
    href: "/add",
    icon: <PlusCircle className="h-5 w-5" />,
  },
];

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-14 items-center">
          <div className="flex items-center gap-2 font-bold text-xl">
            <DollarSign className="h-5 w-5 text-expense-purple" />
            <span>ExpenseTracker</span>
          </div>
        </div>
      </header>
      
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] lg:grid-cols-[240px_1fr] md:gap-6 lg:gap-10 py-6">
        <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
          <div className="py-6 pr-6">
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    location.pathname === item.href
                      ? "bg-accent text-accent-foreground"
                      : "transparent"
                  )}
                >
                  <div className="mr-3">{item.icon}</div>
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
        </aside>
        
        <main className="flex w-full flex-col overflow-hidden">
          {children}
        </main>
      </div>
      
      <footer className="border-t py-6 md:py-0">
        <div className="container flex h-14 items-center">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built with React and Tailwind CSS
          </p>
        </div>
      </footer>
      
      {/* Mobile Navigation */}
      <div className="fixed bottom-0 left-0 z-40 w-full border-t bg-background md:hidden">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex flex-1 flex-col items-center justify-center py-2",
                location.pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Layout;
