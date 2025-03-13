import { createLazyFileRoute } from '@tanstack/react-router'
import styles from './index.module.css'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

const TableComponent = ({ data }: { data: any }) => {
  return (
    <table className="table">
      <tbody>
        <i className="fa-solid fa-thumbtack"></i>
        {data.map((row: any, index: any) => (
          <tr key={index}>
            <td>{row[0]}</td>
            <td>{row[1]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TableComponent
const tableData1 = [
  ['Total Issues', '2'],
  ['Issues Done', ' 2'],
  ['Issues in Progress', '2'],
  ['Issues in To do', '2'],
  ['Issues in Review', ' 2'],
  ['Issues with No Status', '2'],
]

const tableData2 = [
  ['Total Repositories', ' 2'],
  ['Total Deletions', '2'],
  ['Total Additions', ' 2'],
  ['Total Merges', '2'],
  ['Total Commits', '30'],
  ['Total Pulls', '13'],
  ['Total Clones', '13'],
  ['Total Forks', '13'],
  ['Total Branches', '13'],
  ['Total Protected Branches', '13'],
]
const tableData3 = [
  ['Most Active Repository', '2'],
  ['Most Active Team', '2'],
  ['Oldest Repository', ' 2'],
  ['Newest Repository', ' 2'],
  ['Biggest Size Repository', '5'],
  ['The Repository with the biggest deletion rate ', ' 2'],
  ['The Repository with the biggest addition rate', ' 2'],
]
function Index() {
  return (
    <div className={styles.layout}>
      <h2>Welcome Home!</h2>
      <p>
        <h3>Check out the repository stats</h3>
      </p>
      <div className={styles.notes}>
        <div className={styles.box1}>
          <TableComponent data={tableData2} />
        </div>
        <div className={styles.box2}>
          <TableComponent data={tableData3} />
        </div>
        <div className={styles.box3}>
          <TableComponent data={tableData1} />
        </div>
      </div>
    </div>
  )
}
