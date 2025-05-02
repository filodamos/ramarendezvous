import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { useState } from 'react'
import styles from './index.module.css'
import DatePicker from 'react-datepicker'
import { useQuery } from '@tanstack/react-query'
import { fetchData, generateChartData } from '../CalendarCommits/CalendarUtils'
// const generateMonthlyData = (year, month) => {
//   const daysInMonth = new Date(year, month, 0).getDate()

//   return Array.from({ length: daysInMonth }, (_, i) => ({
//     day: i + 1, // Day of the month (X-Axis)
//     commits: Math.floor(Math.random() * 50), // Commits per day (Green line)
//     deletions: Math.floor(Math.random() * 20), // Issues closed per day (Blue line)
//     additions: Math.floor(Math.random() * 10), // PRs merged per day (Red line)
//   }))
// }

// const data = generateMonthlyData(2025, 3)

const LineChartCommits: React.FC<{
  selectedMonth: { from: Date; to: Date } | undefined
  setSelectedMonth: React.Dispatch<
    React.SetStateAction<{ from: Date; to: Date } | undefined>
  >
}> = ({ selectedMonth, setSelectedMonth }) => {
  const [hoveredLine, setHoveredLine] = useState(null)

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

  const chartData = generateChartData(data, selectedMonth, 'month_line')
  console.log(chartData)
  const getLastDayOfMonth = (year: number, month: number) => {
    // We set the date to the 0th day of the next month, which gives us the last day of the selected month
    const date = new Date(year, month, 0)
    return date
  }

  const handleMonthChange = (date: Date) => {
    if (date) {
      // Get the year and month from the selected date
      const year = date.getFullYear()
      const month = date.getMonth() // Month is 0-based (0 = January, 1 = February, etc.)

      // Calculate the first and last days of the selected month
      const from = new Date(year, month, 1) // First day of the selected month

      const to = getLastDayOfMonth(year, month + 1) // Last day of the selected month
      console.log(`here${to.toISOString().split('T')[0]}`)
      // Update the selectedMonth state with the calculated dates
      setSelectedMonth({ from, to })
    }
  }

  return (
    <div>
      {/* <div className="card-header">
        <h2>Commits over the Month</h2>
      </div>
      <div className="card-body"> */}
        <div>
          <label htmlFor="month-picker">
            Select Month and Year
            <DatePicker
              selected={selectedMonth?.from}
              onChange={handleMonthChange}
              showMonthYearPicker
              dateFormat="yyyy-MM"
              placeholderText="Select a month"
            />
          </label>
        </div>

        <h2>
          Month from {selectedMonth?.from.toLocaleDateString()} to{' '}
          {selectedMonth?.to.toLocaleDateString()}
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            {/* Grid and Axes */}
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.5} />
            <XAxis
              dataKey="day"
              label={{
                value: 'Days',
                position: 'insideBottomRight',
                offset: -5,
                style: { fontSize: 12 },
              }}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                borderRadius: '5px',
                fontSize: '12px',
              }}
            />
            <Legend wrapperStyle={{ fontSize: '12px' }} />

            {/* Green Line → Commits */}
            <Line
              type="monotone"
              dataKey="commits"
              stroke="#0088fe"
              name="Commits"
              strokeWidth={2}
              dot={false}
              opacity={hoveredLine === null || hoveredLine === 'blue' ? 1 : 0.2}
            />

            {/* Blue Line → Issues Closed */}
            <Line
              type="monotone"
              dataKey="deletions"
              stroke="#d73a49"
              name="Deletions"
              strokeWidth={2}
              dot={false}
              opacity={hoveredLine === null || hoveredLine === 'red' ? 1 : 0.2}
            />

            {/* Red Line → PRs Merged */}
            <Line
              type="monotone"
              dataKey="additions"
              stroke="#28a745"
              name="Additions"
              strokeWidth={2}
              dot={false}
              opacity={
                hoveredLine === null || hoveredLine === 'green' ? 1 : 0.2
              }
            />
          </LineChart>
        </ResponsiveContainer>
        {/* <div className="card-actions"> */}
        <div className={styles.viewlines}>
          <button
            className="button_page"
            onClick={() => setHoveredLine('blue')}
          >
            View Commits
          </button>
          <button
            className="button_page"
            onClick={() => setHoveredLine('green')}
          >
            View Additions
          </button>
          <button className="button_page" onClick={() => setHoveredLine('red')}>
            View Deletions
          </button>
        </div>
        {/* <button className="button_page">Previous</button>
          <button className="button_page">Next</button>
        </div> */}
      {/* </div> */}
    </div>
  )
}

export default LineChartCommits
