// Calendar.js
import { useState } from 'react'
import DayBarChart from './DaysCommits'
import WeekBarChart from './WeekCommits'
import MonthBarChart from './MonthCommits'
import styles from './index.module.css'
const Calendar = () => {
  const [view, setView] = useState('week') // Default view is 'week'

  return (
    <div className={styles.calendar}>
      {/* Buttons with CSS module classes */}
      <h2>Commits per Day/ Week/ Month</h2>
      <div className={styles.view}>
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
      </div>
      
      <div className={styles.graph}>
        {/* Conditionally render the chart */}
        {view === 'day' && <DayBarChart />}
        {view === 'week' && <WeekBarChart />}
        {view === 'month' && <MonthBarChart />}
      </div>
      <div className={styles.paging}>
        <button className={styles.prenext}>Previous</button>
        <button className={styles.prenext}>Next</button>
      </div>
    </div>
  )
}

export default Calendar
