import { formatINR, type ScheduleRow } from '../lib/emi'
import styles from './ScheduleTable.module.css'

type Props = {
  rows: ScheduleRow[]
}

export function ScheduleTable({ rows }: Props) {
  return (
    <div className={styles.wrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Month</th>
            <th>EMI</th>
            <th>Interest</th>
            <th>Principal</th>
            <th>Loan Paid</th>
            <th>Loan Remaining</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.month} className={row.month % 12 === 0 ? styles.yearEnd : undefined}>
              <td>{row.month}</td>
              <td>{formatINR(row.emi)}</td>
              <td>{formatINR(row.interest)}</td>
              <td>{formatINR(row.principal)}</td>
              <td>{formatINR(row.paid)}</td>
              <td>{formatINR(row.remaining)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
