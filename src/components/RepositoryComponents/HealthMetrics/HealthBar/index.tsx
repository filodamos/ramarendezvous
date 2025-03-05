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

const score = [
  { name: 'Health Score', value: 75 }, // Health score of 75
]

const HealthScoreBarChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={score}>
        <XAxis type="category" dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default HealthScoreBarChart