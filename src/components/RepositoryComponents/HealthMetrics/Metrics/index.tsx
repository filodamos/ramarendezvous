import styles from './index.module.css'

const MetricsTable = () => (
  <div className={`${styles.table} card`}>
    <div className="card-header">
      <h2>Metrics</h2>
    </div>
    <div className="card-body">
      <div className={styles.table_values}>
        <table>
          <tbody>
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
          </tbody>
        </table>
      </div>
    </div>
  </div>
)
export default MetricsTable
