import { useState } from 'react'
import 'react-day-picker/style.css'
import styles from './index.module.css'
import { DayPicker } from 'react-day-picker'
import { useQuery } from '@tanstack/react-query'
import { fetchData, generateChartData } from '../CalendarUtils'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'

const CustomTooltip = ({ payload, label }: { payload: any; label: any }) => {
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

// const DayBarChart = () => {
//   const [selectedDate, setSelectedDate] = useState('')

//   const fetchHourlyData = async (selectedDate) => {
//     if (!selectedDate) {
//       alert('Please select a date!')
//       return []
//     }
//     try {
//       const response = await axiosInstance.get(
//         `day/${selectedDate}/${selectedDate}`
//       )
//       return response.data || [] // Ensure it returns an array
//     } catch (error) {
//       console.error('Error fetching data:', error)
//       return []
//     }
//   }

//   const { data, error, isLoading } = useQuery({
//     queryKey: ['per_day', selectedDate],
//     queryFn: () => fetchHourlyData(selectedDate),
//     enabled: !!selectedDate, // Here if the selectedDate is empty basically enabled: !!selectedDate is false, so useQuery does not run.
//     // So the data is undefined
//   })
//   if (isLoading) return <div>Loading...</div>
//   if (error) return <div>An error occurred: {error.message}</div>

// const chartData = data
//   ? Array.from({ length: 24 }, (_, hour) => {
//       const hourData = data.list_diagram
//         ? data.list_diagram.find(
//             (item: any) => parseInt(item.hour_or_day) === hour
//           )
//         : 0
//       if (hourData) {
//         let additions = hourData.commits_del_add
//           ? hourData.commits_del_add.additions
//           : 0
//         let deletions = hourData.commits_del_add
//           ? hourData.commits_del_add.deletions
//           : 0
//         let totalEdits = hourData.commits_del_add
//           ? hourData.commits_del_add.deletions +
//             hourData.commits_del_add.additions
//           : 0
//         const additionsHeight =
//           totalEdits > 0
//             ? (additions / totalEdits) * hourData.commits_del_add.commits
//             : hourData.commits_del_add.commits
//         const deletionsHeight =
//           totalEdits > 0
//             ? (deletions / totalEdits) * hourData.commits_del_add.commits
//             : 0
//         let commits = hourData.commits_del_add
//           ? hourData.commits_del_add.commits
//           : 0

//         return {
//           hour: `${hour}:00`,
//           additionsHeight,
//           deletionsHeight,
//           additions,
//           deletions,
//           commits,
//         }
//       }

//       return {
//         hour: `${hour}:00`,
//         additionsHeight: 0,
//         deletionsHeight: 0,
//         additions: 0,
//         deletions: 0,
//         commits: 0,
//       }
//     })
//   : []

//   return (
//     <div className={styles.layout}>
//       {/* <div className={styles.fetch_date}> */}
//       <input
//         type="date"
//         value={selectedDate}
//         onChange={(e) => setSelectedDate(e.target.value)}
//       />
//       {/* <button className={`button_page`} onClick={refetch}>Fetch Data</button> */}
//       {/* </div> */}
// <ResponsiveContainer width="100%" height={200}>
//   <BarChart data={chartData}>
//     <XAxis dataKey="hour" />
//     <YAxis />
//     <Tooltip content={<CustomTooltip />} />
//     <Bar dataKey="additionsHeight" fill="#28a745" stackId="a" />
//     <Bar dataKey="deletionsHeight" fill="#d73a49" stackId="a" />
//   </BarChart>
// </ResponsiveContainer>
//     </div>
//   )
// }

// export default DayBarChart


const DayBarChart: React.FC<{
  selectedDate: Date | undefined
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>
}> = ({ selectedDate, setSelectedDate }) => {
  const [showCalendar, setShowCalendar] = useState(false)

  const fetchDayData = async (selectedDate) => {
    console.log(selectedDate)
    return await fetchData('day', selectedDate, selectedDate)
  }

  const { data, refetch, error, isLoading } = useQuery({
    queryKey: ['per_day', selectedDate],
    queryFn: () => fetchDayData(selectedDate),
    enabled: !!selectedDate, // Here if the selectedDate is empty basically enabled: !!selectedDate is false, so useQuery does not run.
    // So the data is undefined
  })
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>An error occurred: {error.message}</div>

  const chartData = generateChartData(
    data,
    { from: selectedDate, to: selectedDate },
    'day'
  )
  const handleInputClick = () => {
    setShowCalendar(!showCalendar)
  }
  const handleTransferDates = () => {
    if (selectedDate) {
      console.log('Selected Day:', selectedDate.toLocaleDateString())

      setShowCalendar(false)
    }
  }
  return (
    <div style={{ position: 'relative' }}>
      <input
        type="text"
        value={selectedDate ? `${selectedDate.toLocaleDateString()}` : ''}
        onClick={handleInputClick}
        readOnly
        placeholder="Select a date"
      />
      {selectedDate && (
        <button onClick={handleTransferDates} className="transferButton">
          Transfer Dates
        </button>
      )}
      {showCalendar && (
        <div className={styles.calendar}>
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            footer={
              selectedDate
                ? `Selected: ${selectedDate.toLocaleDateString()}`
                : 'Pick a day.'
            }
          />
        </div>
      )}
      <h2>Selected day {selectedDate?.toLocaleDateString()}</h2>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={chartData}>
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="additionsHeight" fill="#28a745" stackId="a" />
          <Bar dataKey="deletionsHeight" fill="#d73a49" stackId="a" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default DayBarChart
