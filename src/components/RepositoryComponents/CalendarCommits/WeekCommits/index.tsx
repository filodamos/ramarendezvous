import React from 'react'
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from 'recharts'
import styles from './index.module.css' // Import the CSS module

const rawData = [
  { date: '2025-02-03', value: 15, additions: 20, deletions: 5 },
  { date: '2025-02-04', value: 8, additions: 2, deletions: 6 },
  { date: '2025-02-05', value: 20, additions: 12, deletions: 8 },
  { date: '2025-02-06', value: 25, additions: 0, deletions: 10 },
  { date: '2025-02-07', value: 10, additions: 8, deletions: 2 },
  { date: '2025-02-08', value: 30, additions: 25, deletions: 5 },
  { date: '2025-02-09', value: 18, additions: 14, deletions: 4 },
]

// Transform data to calculate proportional bar heights
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

// Custom tooltip with external styling
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

const WeekBarChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data}>
        <XAxis
          dataKey="date"
          tickFormatter={(date) => new Date(date).toLocaleDateString()}
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
          radius={[5, 5, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default WeekBarChart
