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

const generateHourlyData = () => {
  return Array.from({ length: 24 }, (_, hour) => {
    const value = Math.floor(Math.random() * 50) + 10 // Random value (10-60)
    const additions = Math.floor(Math.random() * 40) // Random additions (0-40)
    const deletions = Math.floor(Math.random() * 40) // Random deletions (0-40)

    return { hour, value, additions, deletions }
  })
}

const rawData = generateHourlyData()

const data = rawData.map(({ hour, value, additions, deletions }) => {
  const totalEdits = additions + deletions

  const additionsHeight =
    totalEdits > 0 ? (additions / totalEdits) * value : value
  const deletionsHeight = totalEdits > 0 ? (deletions / totalEdits) * value : 0

  return {
    hour,
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


const DayBarChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <XAxis
          dataKey="hour"
          tickFormatter={(hour) => `${hour}:00`} // Show "0:00", "1:00", ..., "23:00"
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
export default DayBarChart