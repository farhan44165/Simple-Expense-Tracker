import { useEffect, useState } from "react";
import Header from "./components/Header";
import Balance from "./components/Balance";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";

const getSystemTheme = () => {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

const App = () => {
  const [transactions, setTransactions] = useState(() => {
    const stored = localStorage.getItem("transactions");
    return stored ? JSON.parse(stored) : [];
  });

  const [showHistory, setShowHistory] = useState(true);

  // Theme state
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('theme');
    return stored || 'system';
  });

  useEffect(() => {
    let appliedTheme = theme;
    if (theme === 'system') {
      appliedTheme = getSystemTheme();
    }
    const root = document.documentElement;
    if (appliedTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Listen to system theme changes if 'system' is selected
  useEffect(() => {
    if (theme !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      const root = document.documentElement;
      if (mq.matches) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [theme]);

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
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-lg p-6 backdrop-blur-md dark:bg-[#23272F] dark:text-white dark:shadow-[0_4px_32px_rgba(0,0,0,0.7)] dark:border dark:border-slate-700">
        <Header
          onToggleHistory={() => setShowHistory(!showHistory)}
          showHistory={showHistory}
          onClearHistory={handleClearHistory}
          theme={theme}
          setTheme={setTheme}
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
