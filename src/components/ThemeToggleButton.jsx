import React from 'react';
import { HiMoon, HiSun } from 'react-icons/hi'; // Ensure you have react-icons installed
import useTheme from '../contexts/theme';

const ThemeToggleButton = () => {
  const { themeMode, darkTheme, lightTheme } = useTheme();

  const toggleTheme = () => {
    if (themeMode === 'light') {
      darkTheme();
    } else {
      lightTheme();
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className='p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all cursor-pointer'
      aria-label='Toggle Dark Mode'
    >
      {themeMode === 'dark' ? (
        <HiSun className='text-yellow-400' />
      ) : (
        <HiMoon className='text-gray-900' />
      )}
    </button>
  );
};

export default ThemeToggleButton;
