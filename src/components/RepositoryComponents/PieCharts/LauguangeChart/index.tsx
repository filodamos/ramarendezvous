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
const languagesData = [
  { name: 'JavaScript', value: 3000 },
  { name: 'Python', value: 2000 },
  { name: 'Java', value: 1500 },
  { name: 'CSS', value: 1200 },
  { name: 'HTML', value: 800 },
  { name: 'TypeScript', value: 500 },
]

const dexcol = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#D66B3B',
  '#C850C0',
]

const LanguagePieChart = () => {
  return (
    <div className = {styles.box}>
      <h2>Languages in Repo</h2>
      <PieChart className={styles.position} width={400} height={400}>
        <Pie
          data={languagesData}
          dataKey="value"
          nameKey="name"
          outerRadius={150}
          fill="#8884d8"
          label
        >
          {languagesData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={dexcol[index % dexcol.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  )
}

export default LanguagePieChart