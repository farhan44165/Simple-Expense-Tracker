import { useState, useRef, useEffect } from "react";

const Header = ({ onToggleHistory, showHistory, onClearHistory, theme, setTheme }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    if (!showMenu) return;
    function handleClick(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        setShowMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showMenu]);

  return (
    <div className="flex items-center justify-between mb-6 relative">
      <h1 className="text-3xl font-bold text-black dark:text-white">Expense Tracker</h1>

      {/* Menu Icon */}
      <div className="relative">
        <button
          ref={btnRef}
          onClick={() => setShowMenu((v) => !v)}
          className="text-black dark:text-white text-3xl focus:outline-none hover:text-blue-800 dark:hover:text-blue-300"
        >
          ☰
        </button>

        {showMenu && (
          <div ref={menuRef} className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#23272F] shadow-md rounded text-sm z-50 border dark:text-white dark:shadow-[0_4px_32px_rgba(0,0,0,0.7)] dark:border-slate-700">
            <div className="px-4 py-2 border-b dark:border-gray-700">
              <span className="block text-xs text-gray-500 dark:text-gray-300 mb-1">Theme</span>
              <select
                value={theme}
                onChange={e => setTheme(e.target.value)}
                className="w-full p-1 rounded border dark:bg-gray-800 dark:text-white dark:border-gray-600"
              >
                <option value="system">System</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
            <button
              onClick={() => {
                onToggleHistory();
                setShowMenu(false);
              }}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white"
            >
              {showHistory ? "Hide History" : "Show History"}
            </button>

            <button
              onClick={() => {
                onClearHistory();
                setShowMenu(false);
              }}
              className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-gray-800"
            >
              Clear History
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
