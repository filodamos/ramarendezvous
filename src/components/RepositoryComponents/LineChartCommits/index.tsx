import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import styles from './index.module.css' // Import the CSS file
const generateMonthlyData = (year, month) => {
  const daysInMonth = new Date(year, month, 0).getDate() // Get the number of days in the month
  const data = []

  // Generate random data for each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month - 1, day) // Create the date for each day
    const value = Math.floor(Math.random() * 100) + 1 // Random value between 1 and 100
    data.push({
      date: date.toISOString().split('T')[0], // Format the date as 'YYYY-MM-DD'
      day: day, // Store the day number
      value: value,
    })
  }

  return data
}

const LineChartCommits = () => {
  // Generate data for March 2025
  const data = generateMonthlyData(2025, 3) // March is the 3rd month

  return (
    <div className={styles.box}>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        {/* Grid and axes */}
        <CartesianGrid strokeDasharray="3 3" />

        {/* X-Axis with only day number */}
        <XAxis
          dataKey="day" // Use the day number instead of the full date
        />

        {/* Y-Axis with labels */}
        <YAxis
          label={{ value: 'Commits', angle: -90, position: 'insideLeft' }}
        />

        {/* Tooltip */}
        <Tooltip />

        {/* Line with no labels over the points */}
        <Line
          type="monotone"
          dataKey="value"
          stroke="#28a745"
          activeDot={{ r: 8 }}
        />

        {/* Optional: Add Legend */}
        <Legend />
      </LineChart>
    </ResponsiveContainer>
    </div>
  )
}

export default LineChartCommits
