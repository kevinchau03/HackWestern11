"use client";

import { signOut, useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Wallet, PiggyBank, HandCoins, CircleDollarSign, Hand } from 'lucide-react';

export default function Dashboard() {
  const { data: session, status } = useSession(); // Always call this hook at the top

  interface FinanceData {
    accountBalance: number;
    expenses: number;
    income: number;
    transactions: {
      transactionId: string;
      description: string;
      amount: number;
      date: string;
      category: string;
    }[];
  }

  const [financeData, setFinanceData] = useState<FinanceData | null>(null);
  const [loadingFinance, setLoadingFinance] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch finance data
  useEffect(() => {
    if (status === "authenticated") {
      const fetchFinanceData = async () => {
        try {
          const response = await fetch("/api/finance");
          if (!response.ok) {
            throw new Error("Failed to fetch finance data");
          }
          const data = await response.json();
          setFinanceData(data);
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("An unknown error occurred");
          }
        } finally {
          setLoadingFinance(false);
        }
      };

      fetchFinanceData();
    }
  }, [status]);

  // Handle authentication action
  const handleAuthAction = () => {
    if (status === "authenticated") {
      signOut({ redirect: false }).then(() => router.push("/"));
    } else {
      signIn();
    }
  };

  // User details
  const fullName = session?.user?.name || "Guest";

  // Conditional Rendering Logic
  if (status === "loading" || (status === "authenticated" && loadingFinance)) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="">Loading data...</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="">Please sign in to view your financial data.</p>
        <button
          onClick={handleAuthAction}
          className="px-4 py-2 bg-foreground text-white rounded-lg hover:bg-blue-600"
        >
          Sign In
        </button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // Main dashboard content
  return (
    <div className="w-screen h-screen flex flex-col">
      <header className="w-full flex justify-between items-center p-4 text-white">
        <h1 className="text-2xl font-bold">Welcome, {fullName}</h1>
        <button
          onClick={handleAuthAction}
          className="px-4 py-2 rounded-lg border-2 border-white transition bg-foreground hover:bg-white hover:text-foreground"
        >
          {status === "authenticated" ? "Sign Out" : "Sign In"}
        </button>
      </header>

      <main className="flex flex-grow flex-col p-4 gap-4">
        {/* Finance Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-grow">
          <div className="bg-foreground p-2 rounded-xl border border-gray-400 shadow-md flex flex-col justify-between">
            <h2 className="text-xl font-semibold">Account Balance
              <Wallet size={24} />
            </h2>
            <p className="text-4xl font-bold">${financeData?.accountBalance}</p>
            <p className="text-md ">20% change since last month.</p>
          </div>
          <div className="bg-foreground p-2 rounded-xl border border-gray-400 shadow-md flex flex-col justify-between">
            <h2 className="text-xl font-semibold">Total Expenses
              <CircleDollarSign size={24} />
            </h2>
            <p className="text-4xl font-bold">${financeData?.expenses}</p>
            <p className="text-md ">20% change since last month.</p>
          </div>
          <div className="bg-foreground p-2 rounded-xl border border-gray-400 shadow-md flex flex-col justify-between">
            <h2 className="text-xl font-semibold">Total Income
              <HandCoins size={24} />
            </h2>
            <p className="text-4xl font-bold">${financeData?.income}</p>
            <p className="text-md ">20% change since last month.</p>
          </div>
          <div className="bg-foreground p-2 rounded-xl border border-gray-400 shadow-md flex flex-col justify-between">
            <h2 className="text-xl font-semibold">Budget Goals:
              <PiggyBank size={24} />
            </h2>
            <p className="text-4xl font-bold">$5000.00</p>
            <p className="text-md ">50% to goal.</p>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-foreground p-6 rounded-lg shadow-md flex-grow border border-gray-400">
          <h2 className="text-xl font-semibold">Recent Transactions</h2>
          <ul>
            {financeData?.transactions.slice(0, 5).map((transaction) => (
              <li
                key={transaction.transactionId}
                className="border-b border-gray-200 py-2"
              >
                <div className="flex justify-between">
                  <span className="text-lg">{transaction.description}</span>
                  <span className="text-lg font-bold">
                    ${transaction.amount.toFixed(2)}
                  </span>
                </div>
                <div className="text-sm ">
                  {new Date(transaction.date).toLocaleDateString()} •{" "}
                  {transaction.category}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
