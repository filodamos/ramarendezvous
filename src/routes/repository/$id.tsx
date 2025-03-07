import { createFileRoute, useParams } from '@tanstack/react-router'
import styles from './index.module.css'
import { useCallback, useEffect, useState } from 'react'
import { createRepo, fetchData, prFetchData } from '../../api'
import { useMutation, useQuery } from '@tanstack/react-query'

import HorizontalBarChart from '../../../src/components/RepositoryComponents/ScoreCommit'
import MyPieChart from '../../components/RepositoryComponents/PieCharts/FrequencyChart'
import LanguagePieChart from '../../components/RepositoryComponents/PieCharts/LauguangeChart'
import HealthScoreBarChart from '../../components/RepositoryComponents/HealthMetrics/HealthBar'
import ComponentA from '../../components/RepositoryComponents/HealthMetrics/Metrics'
import Calendar from '../../components/RepositoryComponents/CalendarCommits'


import LineChartCommits from '../../components/RepositoryComponents/LineChartCommits'
export const Route = createFileRoute('/repository/$id')({
  component: RouteComponent,
})

interface DataResponse {
  message: string
}


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
        <h2>Commits per Day/ Week/ Month</h2>
        <div className={styles.days_week_month}>
          <Calendar />
        </div>
      </div>
      <div className={styles.chart_two}>

        <div className={styles.stats}>
          <HorizontalBarChart />
          <ComponentA />
        </div>
      </div>
      <div className={styles.chart_three}>
        <h2>Commits over the Month</h2>
        <LineChartCommits />
      </div>
      <div className={styles.chart_four}>
         <HealthScoreBarChart />
         <LanguagePieChart />
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
