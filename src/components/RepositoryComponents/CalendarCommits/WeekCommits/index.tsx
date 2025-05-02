import React from 'react'
import { useState } from 'react'
import 'react-day-picker/style.css'
import styles from './index.module.css'
import { DayPicker } from 'react-day-picker'
import { endOfWeek, startOfWeek } from 'date-fns'
import { useQuery } from '@tanstack/react-query'
import { fetchData, generateChartData } from '../CalendarUtils'
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
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



// const WeekBarChart: React.FC = () => {
//   const [showCalendar, setShowCalendar] = useState(false)
//   const [selectedWeek, setSelectedWeek] = useState<
//     { from: Date; to: Date } | undefined
//   >(undefined)

//   const fetchWeekData = async (selectedWeek) => {
//     return await fetchData('/week', selectedWeek.from, selectedWeek.to)
//   }

//   const { data, refetch, error, isLoading } = useQuery({
//     queryKey: ['per_day', selectedWeek],
//     queryFn: () => fetchWeekData(selectedWeek),
//     enabled: !!selectedWeek, // Here if the selectedWeek is empty basically enabled: !!selectedWeek is false, so useQuery does not run.
//     // So the data is undefined
//   })

//   if (isLoading) return <div>Loading...</div>
//   if (error) return <div>An error occurred: {error.message}</div>

//   const chartData = generateChartData(data, selectedWeek, 'week')

//   const handleDayClick = (day: Date, modifiers: any) => {
//     if (modifiers.selected) {
//       setSelectedWeek(undefined)
//       return
//     }
//     const newWeek = {
//       from: startOfWeek(day),
//       to: endOfWeek(day),
//     }
//     setSelectedWeek(newWeek)
//     console.log('Selected Week:', newWeek)
//   }

//   const handleInputClick = () => {
//     setShowCalendar(!showCalendar)
//   }

//   const handleTransferDates = () => {
//     if (selectedWeek) {
//       console.log(
//         'Selected Week Start:',
//         selectedWeek.from.toLocaleDateString()
//       )
//       console.log('Selected Week End:', selectedWeek.to.toLocaleDateString())
//       setShowCalendar(false)
//     }
//   }

//   return (
//     <div style={{ position: 'relative' }}>
//       <input
//         type="text"
//         value={
//           selectedWeek
//             ? `${selectedWeek.from.toLocaleDateString()} - ${selectedWeek.to.toLocaleDateString()}`
//             : ''
//         }
//         onClick={handleInputClick}
//         readOnly
//         placeholder="Select a date"
//       />
//       {selectedWeek && (
//         <button onClick={handleTransferDates} className="transferButton">
//           Transfer Dates
//         </button>
//       )}
//       {showCalendar && (
//         <div>
//           <DayPicker
//             className={styles.calendar}
//             showWeekNumber
//             showOutsideDays
//             modifiers={{
//               selected: selectedWeek ? selectedWeek : undefined,
//               range_start: selectedWeek?.from,
//               range_end: selectedWeek?.to,
//               range_middle: (date) =>
//                 selectedWeek
//                   ? date > selectedWeek.from && date < selectedWeek.to
//                   : false,
//             }}
//             onDayClick={handleDayClick}
//             footer={
//               selectedWeek
//                 ? `Week from ${selectedWeek.from.toLocaleDateString()} to ${selectedWeek.to.toLocaleDateString()}`
//                 : 'No week selected'
//             }
//           />
//         </div>
//       )}
//       <h2>
//         Week from {selectedWeek?.from.toLocaleDateString()} to{' '}
//         {selectedWeek?.to.toLocaleDateString()}
//       </h2>

//       <ResponsiveContainer width="100%" height={200}>
//         <BarChart data={chartData}>
//           <XAxis dataKey="day" />
//           <YAxis />
//           <Tooltip content={<CustomTooltip />} />
//           <Bar
//             dataKey="additionsHeight"
//             fill="#28a745"
//             stackId="a"
//             radius={[0, 0, 0, 0]}
//           />
//           <Bar
//             dataKey="deletionsHeight"
//             fill="#d73a49"
//             stackId="a"
//             radius={[5, 5, 0, 0]}
//           />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   )
// }


const WeekBarChart: React.FC<{
  selectedWeek: { from: Date; to: Date } | undefined
  setSelectedWeek: React.Dispatch<
    React.SetStateAction<{ from: Date; to: Date } | undefined>
  >
}> = ({ selectedWeek, setSelectedWeek }) => {
  const [showCalendar, setShowCalendar] = useState(false)

  const fetchWeekData = async (selectedWeek: { from: Date; to: Date }) => {
    return await fetchData('week', selectedWeek.from, selectedWeek.to)
  }

  const { data, refetch, error, isLoading } = useQuery({
    queryKey: ['per_day', selectedWeek],
    queryFn: () => fetchWeekData(selectedWeek),
    enabled: !!selectedWeek,
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>An error occurred: {error.message}</div>

  const chartData = generateChartData(data, selectedWeek, 'week')

  const handleDayClick = (day: Date, modifiers: any) => {
    if (modifiers.selected) {
      setSelectedWeek(undefined) // Clear selection if the same day is clicked
      return
    }
    const newWeek = {
      from: startOfWeek(day),
      to: endOfWeek(day),
    }
    setSelectedWeek(newWeek) // Update the selected week state
    console.log('Selected Week:', newWeek)
  }

  const handleInputClick = () => {
    setShowCalendar(!showCalendar)
  }

  const handleTransferDates = () => {
    if (selectedWeek) {
      console.log(
        'Selected Week Start:',
        selectedWeek.from.toLocaleDateString()
      )
      console.log('Selected Week End:', selectedWeek.to.toLocaleDateString())
      setShowCalendar(false)
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      <input
        type="text"
        value={
          selectedWeek
            ? `${selectedWeek.from.toLocaleDateString()} - ${selectedWeek.to.toLocaleDateString()}`
            : ''
        }
        onClick={handleInputClick}
        readOnly
        placeholder="Select a date"
      />
      {selectedWeek && (
        <button onClick={handleTransferDates} className="transferButton">
          Transfer Dates
        </button>
      )}
      {showCalendar && (
        <div>
          <DayPicker
            className={styles.calendar}
            showWeekNumber
            showOutsideDays
            modifiers={{
              selected: selectedWeek ? selectedWeek : undefined,
              range_start: selectedWeek?.from,
              range_end: selectedWeek?.to,
              range_middle: (date) =>
                selectedWeek
                  ? date > selectedWeek.from && date < selectedWeek.to
                  : false,
            }}
            onDayClick={handleDayClick}
            footer={
              selectedWeek
                ? `Week from ${selectedWeek.from.toLocaleDateString()} to ${selectedWeek.to.toLocaleDateString()}`
                : 'No week selected'
            }
          />
        </div>
      )}
      <h2>
        Week from {selectedWeek?.from.toLocaleDateString()} to{' '}
        {selectedWeek?.to.toLocaleDateString()}
      </h2>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={chartData}>
          <XAxis dataKey="day" />
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
            radius={[5, 5, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default WeekBarChart

