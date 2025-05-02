import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import styles from './index.module.css'

const score = [
  { name: 'Health Score', value: 75 }, 
]

const HealthScoreBarChart = () => {
  return (
    <div className={`${styles.healthbar} card`}>
      <div className="card-header">
        <h2>HealthScore</h2>
      </div>
      <div className="card-body">
        <ResponsiveContainer
          className={styles.responsiveChart}
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
