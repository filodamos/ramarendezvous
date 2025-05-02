import axiosInstance from '../../../api'

export const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-CA');
}


export const fetchData = async (
  endpoint: string,
  fromDate: Date,
  toDate: Date
) => {
  if (!fromDate || !toDate) {
    alert('Please select a date!')
    return []
  }
 
  try {
    const from = formatDate(fromDate)
    const to = formatDate(toDate) 
    console.log(from)
    const filters = {
      username: 'filodamos',
      reponame: 'ramarendezvous',
      time_period: endpoint,
      start_date: from,
      end_date: to,
    }
  const response = await axiosInstance.get('', {
    params: filters,
  })
    return response.data || []
  } catch (error) {
    console.error('Error fetching data:', error)
    return []
  }
}

// Function to get the days in a month
export const getDaysInMonth = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth()
  const date_0th = new Date(year, month + 1, 0)
  return date_0th.getDate()
}

// Chart data generator for day, week, and month
export const generateChartData = (
  data: any,
  dateRange: { from: Date; to: Date },
  type: 'day' | 'week' | 'month' | 'month_line'
) => {
  if (!data || !dateRange) return []

  const { from, to } = dateRange
  const chartData: any[] = []

  let daysCount = 0
  if (type === 'day') {
    daysCount = 24
  } else if (type === 'week') {
    daysCount = 7
  } else if (type === 'month' || type ==='month_line') {
    daysCount = getDaysInMonth(from)
  }

  for (let i = 0; i < daysCount; i++) {
    const currentDay = new Date(from)
    if (type === 'day') {
      currentDay.setDate(currentDay.getDate())
      console.log(currentDay)
    } else {
      currentDay.setDate(currentDay.getDate() + i)
    }

    const currentDayString = currentDay.toLocaleDateString('en-CA')
    const dayData = data.list_diagram
      ? data.list_diagram.find((item: any) => {
          if (type === 'day') {
            return parseInt(item.hour_or_day) === i
          } else {
            return item.hour_or_day === currentDayString
          }
        })
      : 0
    if (dayData) {
      let additions = dayData.commits_del_add
        ? dayData.commits_del_add.additions
        : 0
      let deletions = dayData.commits_del_add
        ? dayData.commits_del_add.deletions
        : 0
      let totalEdits = dayData.commits_del_add
        ? dayData.commits_del_add.deletions + dayData.commits_del_add.additions
        : 0
      const additionsHeight =
        totalEdits > 0
          ? (additions / totalEdits) * dayData.commits_del_add.commits
          : dayData.commits_del_add.commits
      const deletionsHeight =
        totalEdits > 0
          ? (deletions / totalEdits) * dayData.commits_del_add.commits
          : 0
      let commits = dayData.commits_del_add
        ? dayData.commits_del_add.commits
        : 0
      console.log(commits)
      console.log(deletions)
      if (type === 'day') {
        chartData.push({
          hour: `${i}:00`,
          additionsHeight: additionsHeight || 0,
          deletionsHeight: deletionsHeight || 0,
          additions: additions || 0,
          deletions: deletions || 0,
          commits: commits || 0,
        })

      }
      if(type === 'month_line'){
        chartData.push({
          day: currentDay.toLocaleDateString(),
          additions: additions || 0,
          deletions: deletions || 0,
          commits: commits || 0,
        })
      } 
      else {
        chartData.push({
          day: currentDay.toLocaleDateString(),
          additionsHeight: additionsHeight || 0,
          deletionsHeight: deletionsHeight || 0,
          additions: additions || 0,
          deletions: deletions || 0,
          commits: commits || 0,
        })
      }
    }
  }

  return chartData
}
