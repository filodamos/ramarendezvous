import { createFileRoute, useParams } from '@tanstack/react-router'
import styles from './index.module.css'
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/repository/$id')({
  component: RouteComponent,
})

interface DataResponse {
  message: string
}

function RouteComponent() {
  const { id } = useParams({ strict: false })
 
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
     console.time('fetchTime')
        const response = await fetch(
          'http://127.0.0.1:8000/repos/EleftheriaEkatommati'
        )
        console.timeLog('fetchTime', 'Received response')

        // Check if the response is OK (status 200)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const json = await response.json()
        setData(json)
        console.timeEnd('fetchTime')

    }

    fetchData()
  }, [])

  return (
    <div className={styles.Details}>
      <h1>Page {id}</h1>
      <p>
        {' '}
        Some information about the repository , the creator , the project and
        the whole thing
      </p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
