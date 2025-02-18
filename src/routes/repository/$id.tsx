import { createFileRoute, useParams } from "@tanstack/react-router";
import styles from "./index.module.css";
import { useCallback, useEffect, useState } from "react";
import { createRepo, fetchData, prFetchData } from "../../api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/repository/$id")({
  component: RouteComponent,
});

interface DataResponse {
  message: string;
}

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
    queryKey: ["repository", "details", 5],
    queryFn: () => prFetchData(),
    retry: false,
    staleTime: 10000,
  });

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
      <h1>Page {id}</h1>
      <p>
        {" "}
        Some information about the repository , the creator , the project and
        the whole thing
      </p>
      {isLoading || isFetching ? (
        <pre>loading</pre>
      ) : (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
      <button
        onClick={function () {
          repoMutation.mutate();
        }}
      >
        click me
      </button>
    </div>
  );
}
