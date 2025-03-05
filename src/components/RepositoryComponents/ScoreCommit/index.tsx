
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

const commits_data = [
  { commmiter: 'Category A', value: 400 },
  { commmiter: 'Category B', value: 300 },
  { commmiter: 'Category C', value: 500 },
  { commmiter: 'Category D', value: 200 },
]

const HorizontalBarChart = () => {
  const sortedData = [...commits_data].sort((a, b) => b.value - a.value)
  return (
    <ResponsiveContainer width="100%" height={300}>
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
  )
}

export default HorizontalBarChart
