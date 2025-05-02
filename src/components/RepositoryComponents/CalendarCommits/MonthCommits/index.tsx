import { useState } from 'react'
import styles from './index.module.css'
import DatePicker from 'react-datepicker'
import { useQuery } from '@tanstack/react-query'
import 'react-datepicker/dist/react-datepicker.css'
import { fetchData, generateChartData } from '../CalendarUtils'
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from 'recharts'


const CustomTooltip = ({ payload, label }: any) => {
  if (payload && payload.length) {
    const { additions, deletions, commits } = payload[0].payload
    return (
      <div className={styles.customTooltip}>
        <p>
          <strong>{label}</strong>
        </p>
        <p className={styles.additionText}>Commits: {commits}</p>
        <p className={styles.additionText}>Additions: {additions}</p>
        <p className={styles.deletionText}>Deletions: {deletions}</p>
      </div>
    )
  }
  return null
}

const MonthBarChart: React.FC<{
  selectedMonth: { from: Date; to: Date } | undefined
  setSelectedMonth: React.Dispatch<
    React.SetStateAction<{ from: Date; to: Date } | undefined>
  >
}> = ({ selectedMonth, setSelectedMonth }) => {
  // const [selectedMonth, setSelectedMonth] = useState<
  //   { from: Date; to: Date } | undefined
  // >(undefined)

  const fetchMonthData = async (selectedMonth) => {
    return await fetchData('month', selectedMonth.from, selectedMonth.to)
  }

  const { data, refetch, error, isLoading } = useQuery({
    queryKey: ['per_day', selectedMonth],
    queryFn: () => fetchMonthData(selectedMonth),
    enabled: !!selectedMonth, // Here if the selectedMonth is empty basically enabled: !!selectedMonth is false, so useQuery does not run.
    // So the data is undefined
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>An error occurred: {error.message}</div>

  const chartData = generateChartData(data, selectedMonth, 'month')

  const getLastDayOfMonth = (year: number, month: number) => {
    // We set the date to the 0th day of the next month, which gives us the last day of the selected month
    const date = new Date(year, month, 0)
    return date
  }

  const handleMonthChange = (date: Date) => {
    if (date) {
      const year = date.getFullYear()
      const month = date.getMonth() // Month is 0-based (0 = January, 1 = February, etc.)

      const from = new Date(year, month, 1) // First day of the selected month
      const to = getLastDayOfMonth(year, month + 1) // Last day of the selected month

      console.log(`here${to.toISOString().split('T')[0]}`)
      setSelectedMonth({ from, to })
    }
  }

  return (
    <div>
      <div>
        <label htmlFor="month-picker">Select Month and Year</label>
        <DatePicker
          selected={selectedMonth?.from}
          onChange={handleMonthChange}
          showMonthYearPicker
          dateFormat="yyyy-MM"
          placeholderText="Select a month"
        />
      </div>

      <h2>
        Month from {selectedMonth?.from.toLocaleDateString()} to{' '}
        {selectedMonth?.to.toLocaleDateString()}
      </h2>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={chartData}>
          <XAxis
            dataKey="day"
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
    </div>
  )
}
export default MonthBarChart
