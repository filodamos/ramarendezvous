
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import styles from './index.module.css'

const commits_data = [
  { commmiter: 'Category A', value: 400 },
  { commmiter: 'Category B', value: 300 },
  { commmiter: 'Category C', value: 500 },
  { commmiter: 'Category D', value: 200 },
  { commmiter: 'Category E', value: 600 },
  { commmiter: 'Category F', value: 700 },
  { commmiter: 'Category G', value: 900 },
  { commmiter: 'Category H', value: 500 },
]

const HorizontalBarChart = () => {
  const sortedData = [...commits_data].sort((a, b) => b.value - a.value)
  return (
    <div className = {styles.box}>
      <h2>Commit Score of each Team </h2>
      <ResponsiveContainer className={styles.scorechart} width="100%" height={400}>
        <BarChart
          data={sortedData}
          layout="vertical" // Makes bars horizontal
          margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
        >
          <XAxis type="number" />
          <YAxis dataKey="commmiter" type="category" />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      </div>
  )
}

export default HorizontalBarChart
