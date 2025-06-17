import { useEffect, useState } from "react";
import Header from "./components/Header";
import Balance from "./components/Balance";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";

const App = () => {
  const [transactions, setTransactions] = useState(() => {
    const stored = localStorage.getItem("transactions");
    return stored ? JSON.parse(stored) : [];
  });

  const [showHistory, setShowHistory] = useState(true);

  // Save to localStorage whenever transactions change
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const handleAdd = (txn) => {
    const newTxn = { ...txn, id: Date.now() };
    setTransactions([newTxn, ...transactions]);
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter((txn) => txn.id !== id));
  };

  const handleClearHistory = () => {
    const confirmReset = window.confirm(
      "Are you sure you want to clear all transaction history?"
    );
    if (confirmReset) {
      setTransactions([]);
      localStorage.removeItem("transactions");
    }
  };

  const income = transactions
    .filter((txn) => txn.type === "income")
    .reduce((acc, txn) => acc + txn.amount, 0);

  const expense = transactions
    .filter((txn) => txn.type === "expense")
    .reduce((acc, txn) => acc + txn.amount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white bg-opacity-90 shadow-xl rounded-lg p-6 backdrop-blur-md">
        <Header
          onToggleHistory={() => setShowHistory(!showHistory)}
          showHistory={showHistory}
          onClearHistory={handleClearHistory}
        />

        <Balance income={income} expense={expense} />
        <TransactionForm onAdd={handleAdd} />

        {showHistory && (
          <TransactionList
            transactions={transactions}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

export default App;
