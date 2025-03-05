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

const codefreq_data = [
  { name: 'Additions', value: 400 },
  { name: 'Deletions', value: 300 },
]

// You can customize the colors for each section of the pie
const COLORS = ['#28a745', '#d73a49']
const MyPieChart = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <h2>Code Frequency</h2>
      <PieChart>
        <Pie
          data={codefreq_data}
          cx="50%" // Center X-axis
          cy="50%" // Center Y-axis
          innerRadius={60} // Inner radius (makes it a donut chart, optional)
          outerRadius={80} // Outer radius
          dataKey="value"
          labelLine={false} // Disable the lines that connect labels to slices
        >
          {codefreq_data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
          {/* <Label
            value="Additions & Deletions"
            position="center"
            style={{ fontSize: 18, fontWeight: 'bold', fill: '#333' }}
          /> */}
        </Pie>
        <Tooltip />
        <Legend
          verticalAlign="top" // Place the legend above the pie chart
          align="center"
          layout="horizontal"
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default MyPieChart
