import { useState, useEffect } from 'react'
import LineChartCommits from "./index"
import styles from './index.module.css'

const LineChartBox = () => {

  const getMonthRange = (date: Date) => {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1) // First day of the month
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0) // Last day of the month
    return { from: startOfMonth, to: endOfMonth }
  }
  const [selectedMonth, setSelectedMonth] = useState<
    { from: Date; to: Date } | undefined
  >(getMonthRange(new Date()))

  const handlePreviousMonth = () => {
    if (!selectedMonth) return
    const previousMonth = getPreviousMonth(selectedMonth.from)
    setSelectedMonth(previousMonth)
  }
  const handleNextMonth = () => {
    if (!selectedMonth) return
    const nextMonth = getNextMonth(selectedMonth.from)
    setSelectedMonth(nextMonth)
  }
  const getPreviousMonth = (currentDate: Date) => {
    const newDate = new Date(currentDate)
    newDate.setMonth(newDate.getMonth() - 1) // Subtract 1 month
    return getMonthRange(newDate)
  }

  // Get the next month range
  const getNextMonth = (currentDate: Date) => {
    const newDate = new Date(currentDate)
    newDate.setMonth(newDate.getMonth() + 1) // Add 1 month
    return getMonthRange(newDate)
  }
  return (
    <div className={`${styles.linechart} card`}>
      <div className="card-header">
        <h2>Commits over the Month</h2>
      </div>
      <div className="card-body">
        <LineChartCommits
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
        />
      </div>
      <div className="card-actions">
        <button className="button_page" onClick={handlePreviousMonth}>
          Previous Month
        </button>
        <button className="button_page" onClick={handleNextMonth}>
          Next Month
        </button>
      </div>
    </div>
  )

}

export default LineChartBox