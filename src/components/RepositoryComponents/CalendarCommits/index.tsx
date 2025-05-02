import { useState, useEffect } from 'react'
import DayBarChart from './DaysCommits'
import WeekBarChart from './WeekCommits'
import MonthBarChart from './MonthCommits'
import styles from './index.module.css'

const Calendar = () => {
  const [view, setView] = useState('week')
  // Function to get the month range for a given date
  const getMonthRange = (date: Date) => {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1) // First day of the month
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0) // Last day of the month
    return { from: startOfMonth, to: endOfMonth }
  }

  const getWeekRange = (date: Date) => {
    const startOfWeek = new Date(date)
    startOfWeek.setDate(date.getDate() - date.getDay()) // Set to the start of the week (Sunday)
    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 6) // Set to the end of the week (Saturday)
    return { from: startOfWeek, to: endOfWeek }
  }
  const [selectedWeek, setSelectedWeek] = useState<
    { from: Date; to: Date } | undefined
  >(getWeekRange(new Date()))

  const [selectedMonth, setSelectedMonth] = useState<
    { from: Date; to: Date } | undefined
  >(getMonthRange(new Date()))

  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  // Function to get the start and end of the week for a given date
  const handlePreviousWeek = () => {
    if (!selectedWeek) return
    const previousWeek = getPreviousWeek(selectedWeek.from)
    setSelectedWeek(previousWeek)
  }
  // Handle the "Previous" button click to go to the previous week
  const handleNextWeek = () => {
    if (!selectedWeek) return
    const nextWeek = getNextWeek(selectedWeek.from)
    setSelectedWeek(nextWeek)
  }

  // Handle the "Previous" button click for months
  const handlePreviousMonth = () => {
    if (!selectedMonth) return
    const previousMonth = getPreviousMonth(selectedMonth.from)
    setSelectedMonth(previousMonth)
  }

  // Handle the "Next" button click for months
  const handleNextMonth = () => {
    if (!selectedMonth) return
    const nextMonth = getNextMonth(selectedMonth.from)
    setSelectedMonth(nextMonth)
  }
  const getPreviousWeek = (currentDate: Date) => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() - 7) // Subtract 7 days
    return getWeekRange(newDate)
  }

  // Get the next week range
  const getNextWeek = (currentDate: Date) => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + 7) // Add 7 days
    return getWeekRange(newDate)
  }

  // Get the previous month range
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

  // Log selected view for debugging purposes
  useEffect(() => {
    console.log(
      view === 'week'
        ? 'Selected Week: ' + selectedWeek
        : 'Selected Month: ' + selectedMonth
    )
  }, [selectedWeek, selectedMonth])

  return (
    <div className={`${styles.calendar} card`}>
      <div className="card-header">
        <h2>Commits per Day/ Week/ Month</h2>
        <div className={styles.view_buttons}>
          <button
            onClick={() => setView('day')}
            className={`button_page ${view === 'day' ? 'active' : 'inactive'}`}
          >
            Day View
          </button>
          <button
            onClick={() => setView('week')}
            className={`button_page ${view === 'week' ? 'active' : 'inactive'}`}
          >
            Week View
          </button>
          <button
            onClick={() => setView('month')}
            className={`button_page ${view === 'month' ? 'active' : 'inactive'}`}
          >
            Month View
          </button>
        </div>
      </div>
      <div className="card-body">
        <div className={styles.graph}>
          {view === 'day' && (
            <DayBarChart
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          )}
          {view === 'week' && (
            <WeekBarChart
              selectedWeek={selectedWeek}
              setSelectedWeek={setSelectedWeek}
            />
          )}
          {view === 'month' && (
            <MonthBarChart
              selectedMonth={selectedMonth}
              setSelectedMonth={setSelectedMonth}
            />
          )}
        </div>
      </div>

      <div className="card-actions">
        <div>
          {view === 'week' && selectedWeek && (
            <div>
              <button className="button_page" onClick={handlePreviousWeek}>
                Previous Week
              </button>
              <button className="button_page" onClick={handleNextWeek}>
                Next Week
              </button>
            </div>
          )}
          {view === 'month' && selectedMonth && (
            <div>
              <button className="button_page" onClick={handlePreviousMonth}>
                Previous Month
              </button>
              <button className="button_page" onClick={handleNextMonth}>
                Next Month
              </button>
            </div>
          )}
          {view === 'day' && selectedDate && (
            <div>
              <button
                className="button_page"
                onClick={() =>
                  setSelectedDate((prev) => new Date(prev.getTime() - 86400000))
                }
              >
                Previous Day
              </button>
              <button
                className="button_page"
                onClick={() =>
                  setSelectedDate((prev) => new Date(prev.getTime() + 86400000))
                }
              >
                Next Day
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Calendar
