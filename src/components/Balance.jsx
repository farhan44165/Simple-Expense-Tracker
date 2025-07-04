const Balance = ({ income, expense }) => {
  const balance = income - expense;

  return (
    <div className="bg-white bg-opacity-90 dark:bg-[#23272F] dark:text-white rounded-lg p-4 shadow-md mb-4 dark:shadow-[0_4px_32px_rgba(0,0,0,0.7)] dark:border dark:border-slate-700">
      <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-2 text-center">
        Balance: Rs {balance > 0 ? balance : 0}
      </h2>

      {balance < 0 && (
        <p className="text-center text-red-600 dark:text-red-400 text-sm font-medium">
          You're taking loan of Rs {Math.abs(balance)}
        </p>
      )}

      <div className="flex justify-between text-gray-600 font-medium mt-2 rounded p-2 dark:bg-[#23272F] dark:text-white">
        <p className="dark:text-white">Income: Rs {income}</p>
        <p className="dark:text-white">Expense: Rs {expense}</p>
      </div>
    </div>
  );
};

export default Balance;
