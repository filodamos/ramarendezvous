// Calendar.js
import { useState } from 'react'
import DayBarChart from './DaysCommits'
import WeekBarChart from './WeekCommits'
import MonthBarChart from './MonthCommits'
import styles from './index.module.css'
const Calendar = () => {
  const [view, setView] = useState('week') // Default view is 'week'

  return (
    <div>
      {/* Buttons with CSS module classes */}
      <button
        onClick={() => setView('day')}
        className={`${styles.button} ${view === 'day' ? styles.active : styles.inactive}`}
      >
        Day View
      </button>
      <button
        onClick={() => setView('week')}
        className={`${styles.button} ${view === 'week' ? styles.active : styles.inactive}`}
      >
        Week View
      </button>
      <button
        onClick={() => setView('month')}
        className={`${styles.button} ${view === 'month' ? styles.active : styles.inactive}`}
      >
        Month View
      </button>

      {/* Conditionally render the chart */}
      {view === 'day' && <DayBarChart />}
      {view === 'week' && <WeekBarChart />}
      {view === 'month' && <MonthBarChart />}
    </div>
  )
}

export default Calendar
