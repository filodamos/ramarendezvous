import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Label,
  Legend,
  ResponsiveContainer,
} from 'recharts'

import styles from './index.module.css'
const score = [
  { name: 'Health Score', value: 75 }, // Health score of 75
]

const HealthScoreBarChart = () => {
  return (
    <div className={styles.bar}>
      <h2>HealthScore</h2>
      <div className={styles.box}>
        <ResponsiveContainer
          className={styles.responsiveChart}
          width="50%"
          height={300}
          minWidth={50}
        >
          <BarChart data={score}>
            <XAxis type="category" dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default HealthScoreBarChart