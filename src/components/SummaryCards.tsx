import { formatINR } from '../lib/emi'
import styles from './SummaryCards.module.css'

type Props = {
  emi: number
  totalInterest: number
  totalPayment: number
}

export function SummaryCards({ emi, totalInterest, totalPayment }: Props) {
  return (
    <div className={styles.cards}>
      <div className={`${styles.card} ${styles.primary}`}>
        <span className={styles.label}>Monthly EMI</span>
        <span className={styles.value}>{formatINR(emi)}</span>
      </div>
      <div className={styles.card}>
        <span className={styles.label}>Total Interest</span>
        <span className={styles.value}>{formatINR(totalInterest)}</span>
      </div>
      <div className={styles.card}>
        <span className={styles.label}>Total Payment</span>
        <span className={styles.value}>{formatINR(totalPayment)}</span>
      </div>
    </div>
  )
}
