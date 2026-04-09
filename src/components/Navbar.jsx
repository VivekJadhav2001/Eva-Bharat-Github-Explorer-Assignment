// import { useTheme } from "../context/ThemeContext";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

function Navbar() {
  const { dark, toggleTheme } = useContext(ThemeContext)
const navigate = useNavigate()

  return (
    <div className="flex justify-between items-center px-6 py-4 shadow-sm bg-white dark:bg-gray-900">
      <h1 className="font-bold cursor-pointer text-lg dark:text-white" onClick={()=>navigate("/")}>
        GitHub Explorer
      </h1>

      <button
        onClick={toggleTheme}
        className="px-3 py-1 border rounded-md text-sm cursor-pointer dark:text-white"
      >
        {dark ? "🌙 Dark" : "☀️ Light"}
      </button>
    </div>
  );
}

export default Navbar;