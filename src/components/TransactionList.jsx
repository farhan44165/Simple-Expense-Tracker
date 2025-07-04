const TransactionList = ({ transactions, onDelete }) => {
  return (
    <div className="bg-white bg-opacity-90 dark:bg-[#23272F] dark:text-white rounded-lg p-4 shadow-md dark:shadow-[0_4px_32px_rgba(0,0,0,0.7)] dark:border dark:border-slate-700">
      <h2 className="text-xl font-bold mb-3">Transaction History</h2>

      {transactions.length === 0 ? (
        <p className="text-gray-500 text-center">No transactions yet.</p>
      ) : (
        <ul className="space-y-2">
          {transactions.map((txn) => (
            <li
              key={txn.id}
              className={`flex justify-between items-center p-2 rounded border-l-4 dark:bg-[#23272F] dark:text-white ${
                txn.type === "income" ? "border-green-400" : "border-red-400"
              }`}
            >
              <div>
                <p className="font-medium">{txn.description}</p>
                <p className={`text-sm font-semibold ${txn.type === "income" ? "text-green-500 dark:text-green-400" : "text-red-500 dark:text-red-400"}`}>
                  Rs {txn.amount}
                </p>
              </div>
              <button
                onClick={() => onDelete(txn.id)}
                className="text-red-500 hover:text-red-400 font-semibold dark:text-red-400 dark:hover:text-red-300"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionList;
