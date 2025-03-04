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

export const Route = createFileRoute('/repository/$id')({
  component: RouteComponent,
})

interface DataResponse {
  message: string
}

const data = [
  { date: '2025-02-02', value: 10 },
  { date: '2025-02-03', value: 15 },
  { date: '2025-02-04', value: 8 },
  { date: '2025-02-05', value: 20 },
]

const CustomBarChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis
          dataKey="date"
          tickFormatter={(date) => new Date(date).toLocaleDateString()}
        />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )
}

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

const codefreq_data = [
  { name: 'Additions', value: 400 },
  { name: 'Deletions', value: 300 },
]

// You can customize the colors for each section of the pie
const COLORS = ['#28a745', '#d73a49']
const MyPieChart = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
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
          <Label
            value="Additions & Deletions"
            position="center"
            style={{ fontSize: 18, fontWeight: 'bold', fill: '#333' }}
          />
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

const score = [
  { name: 'Health Score', value: 75 }, // Health score of 75
]

const HealthScoreBarChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={score}>
        <XAxis type="category" dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default HealthScoreBarChart
const ComponentA = () => (
  <div className={styles.list_info}>
    <h2>Metrics</h2>
    <table>
      
      <tr>
        <th>Total Commits</th>
        <td>30</td>
      </tr>
      <tr>
        <th>Total Forks</th>
        <td>5</td>
      </tr>
      <tr>
        <th>Total Merges</th>
        <td>10</td>
      </tr>
      <tr>
        <th>Total Clones</th>
        <td>50</td>
      </tr>
      <tr>
        <th>Total Views</th>
        <td>100</td>
      </tr>
    </table>

  </div>
)

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
        <CustomBarChart />
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
        <h2>Code Frequency</h2>
        <MyPieChart />
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
