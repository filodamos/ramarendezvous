import { createFileRoute, useParams } from '@tanstack/react-router'
import styles from './index.module.css'
import { useCallback, useEffect, useState } from 'react'
import { createRepo, fetchData, prFetchData } from '../../api'
import { useMutation, useQuery } from '@tanstack/react-query'
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
import HorizontalBarChart  from '../../../src/components/RepositoryComponents/ScoreCommit'
import MyPieChart from '../../components/RepositoryComponents/PieCharts/FrequencyChart'
import LanguagePieChart from '../../components/RepositoryComponents/PieCharts/LauguangeChart'
import HealthScoreBarChart from '../../components/RepositoryComponents/HealthMetrics/HealthBar'
import ComponentA from '../../components/RepositoryComponents/HealthMetrics/Metrics'
// import WeekBarChart from '../../components/RepositoryComponents/CalendarCommits/WeekCommits'
// import MonthBarChart from '../../components/RepositoryComponents/CalendarCommits/MonthCommits'
// import DayBarChart from '../../components/RepositoryComponents/CalendarCommits/DaysCommits'
import Calendar from '../../components/RepositoryComponents/CalendarCommits'
export const Route = createFileRoute('/repository/$id')({
  component: RouteComponent,
})

interface DataResponse {
  message: string
}

// const data = [
//   { date: '2025-02-02', value: 10 },
//   { date: '2025-02-03', value: 15 },
//   { date: '2025-02-04', value: 8 },
//   { date: '2025-02-05', value: 20 },
// ]

// const CustomBarChart: React.FC = () => {
//   return (
//     <ResponsiveContainer width="100%" height={300}>
//       <BarChart data={data}>
//         <XAxis
//           dataKey="date"
//           tickFormatter={(date) => new Date(date).toLocaleDateString()}
//         />
//         <YAxis />
//         <Tooltip />
//         <Bar dataKey="value" fill="#8884d8" />
//       </BarChart>
//     </ResponsiveContainer>
//   )
// }









function RouteComponent() {
  const { id } = useParams({ strict: false })
  const [data, setData] = useState(null)

  // const ftData = useCallback(async () => {
  //   setLoading(true);
  //   const dt = await fetchData();
  //   setData(dt);
  //   setLoading(false);
  // }, []);

  // useEffect(() => {
  //   ftData();
  // }, []);

  const {
    data: dt,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ['repositories', 'repository'],
    queryFn: () => prFetchData(),
    retry: false,
    staleTime: 10000,
  })

  const repoMutation = useMutation({
    mutationFn: () => createRepo(),
  })

  useEffect(() => {
    // do something
  }, [repoMutation.isSuccess])

  useEffect(() => {
    // do something
  }, [repoMutation.isError])

  console.log({ dt, isFetching, isLoading })

  return (
    <div className={styles.repopage}>
      <div className={styles.chart_one}>
        <h2>Commits per day of this month</h2>
        <div className={styles.days_week_month}>
           {/* <WeekBarChart /> */}
           {/* <MonthBarChart/> */}
           {/* <DayBarChart/> */}
           <Calendar/>
           <button className={styles.Week}></button>
        </div>
      </div>
      <div className={styles.chart_two}>
        <h2>Top commiters of this repository</h2>
        <HorizontalBarChart />
      </div>
      <div className={styles.some_stats}>
        <HealthScoreBarChart />
        <ComponentA />
      </div>
      <></>
      <div className={styles.pie_chart}>
        {/* <h2>Code Frequency</h2> */}
        <MyPieChart />
        <LanguagePieChart/>
      </div>
    </div>
  )
}
// {/*
//       <h1>Page {id}</h1>
//       <p>
//         {' '}
//         Some information about the repository , the creator , the project and
//         the whole thing
//       </p> */}
//  {/* {isLoading || isFetching ? (
//     <pre>loading</pre>
//   ) : (

//     <pre>
//       {dt?.data.repositories.map((f) => (
//         <li>
//           {f.repository.commmiter
//           }
//           <br />
//           {f.repository.language}
//           <br />
//         </li>
//       ))}
//     </pre>
//     // <pre>{JSON.stringify(dt?.data, null, 2)}</pre>
//   )} */}
//   {/* <button
//     onClick={function () {
//       repoMutation.mutate()
//     }}
//   >
//     click me
//   </button> */}
