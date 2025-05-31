import { useContext } from 'react'
import { ShopContext } from '../context/shopContext'

const ThemeToggle = () => {
  const { darkMode, toggleDarkMode } = useContext(ShopContext)

  return (
    <button
      onClick={toggleDarkMode}
      className="px-3 py-1 rounded border text-sm text-gray-700 dark:text-white dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  )
}

export default ThemeToggle
