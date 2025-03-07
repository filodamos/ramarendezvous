import React from 'react'
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from 'recharts'

import styles from './index.module.css'

const generateMonthlyData = () => {
  const daysInMonth = 30 // Adjust if needed
  const startDate = new Date(2025, 1, 1) // February 1, 2025 (Month index 1 for Feb)

  return Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i)

    const value = Math.floor(Math.random() * 40) + 10 // Random value (10-50)
    const additions = Math.floor(Math.random() * 30) // Random additions (0-30)
    const deletions = Math.floor(Math.random() * 30) // Random deletions (0-30)

    return {
      date: date.toISOString().split('T')[0],
      value,
      additions,
      deletions,
    }
  })
}

const rawData = generateMonthlyData()

const data = rawData.map(({ date, value, additions, deletions }) => {
  const totalEdits = additions + deletions

  const additionsHeight =
    totalEdits > 0 ? (additions / totalEdits) * value : value
  const deletionsHeight = totalEdits > 0 ? (deletions / totalEdits) * value : 0

  return {
    date,
    additionsHeight,
    deletionsHeight,
    additions,
    deletions,
  }
})
const CustomTooltip = ({ payload, label }: any) => {
  if (payload && payload.length) {
    const { additions, deletions } = payload[0].payload
    return (
      <div className={styles.customTooltip}>
        <p>
          <strong>{label}</strong>
        </p>
        <p className={styles.additionText}>Additions: {additions}</p>
        <p className={styles.deletionText}>Deletions: {deletions}</p>
      </div>
    )
  }
  return null
}

const MonthBarChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <XAxis
          dataKey="date"
          tickFormatter={(date) =>
            new Date(date).toLocaleDateString('en-US', {
              month: 'short',
              day: '2-digit',
            })
          }
          angle={0} // Tilt labels for better spacing
          interval={2} // Show fewer labels for readability
        />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />

        <Bar
          dataKey="additionsHeight"
          fill="#28a745"
          stackId="a"
          radius={[0, 0, 0, 0]}
        />
        <Bar
          dataKey="deletionsHeight"
          fill="#d73a49"
          stackId="a"
          radius={[0, 0, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
export default MonthBarChart