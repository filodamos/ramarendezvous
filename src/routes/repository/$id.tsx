import { createFileRoute, useParams } from "@tanstack/react-router";
import styles from "./index.module.css";
import { useCallback, useEffect, useState } from "react";
import { createRepo, fetchData, prFetchData } from "../../api";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

export const Route = createFileRoute("/repository/$id")({
  component: RouteComponent,
});

interface DataResponse {
  message: string;
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

export default CustomBarChart

function RouteComponent() {
  const { id } = useParams({ strict: false });
  const [data, setData] = useState(null);

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
    queryKey: ['repositories','repository'],
    queryFn: () => prFetchData(),
    retry: false,
    staleTime: 10000,
  })

  const repoMutation = useMutation({
    mutationFn: () => createRepo(),
  });

  useEffect(() => {
    // do something
  }, [repoMutation.isSuccess]);

  useEffect(() => {
    // do something
  }, [repoMutation.isError]);

  console.log({ dt, isFetching, isLoading });

  return (  

    <div className={styles.Details}>  
    <h2>Bar Chart Example</h2>
    <CustomBarChart />
      <h1>Page {id}</h1>
      <p>
        {' '}
        Some information about the repository , the creator , the project and
        the whole thing
      </p>
      {isLoading || isFetching ? (
        <pre>loading</pre>
      ) : (
        
        <pre>
          {dt?.data.repositories.map((f) => (
            <li>
              {f.repository.name}
              <br />
              {f.repository.language}
              <br />
            </li>
          ))}
        </pre>
        // <pre>{JSON.stringify(dt?.data, null, 2)}</pre>
      )}
      {/* <button
        onClick={function () {
          repoMutation.mutate()
        }}
      >
        click me
      </button> */}
    </div>
  )
}
