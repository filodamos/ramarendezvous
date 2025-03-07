import styles from './index.module.css'
const ComponentA = () => (
  <div className={styles.table}>
    <h2>Metrics</h2>
  <div className={styles.box}>
    <div className={styles.list_info}>
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
    </div>
  </div>
  
)
export default ComponentA