import { useMemo, useState } from 'react'
import styles from './App.module.css'
import { ScheduleTable } from './components/ScheduleTable'
import { SliderInput } from './components/SliderInput'
import { SummaryCards } from './components/SummaryCards'
import { buildSchedule, formatINR } from './lib/emi'

function App() {
  const [amount, setAmount] = useState(1_000_000)
  const [years, setYears] = useState(5)
  const [rate, setRate] = useState(8.5)

  const schedule = useMemo(() => buildSchedule(amount, rate, years), [amount, rate, years])
  const totalInterest = schedule.reduce((sum, row) => sum + row.interest, 0)

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1>EMI Calculator</h1>
        <p>Adjust the loan amount, tenure and interest rate to see your monthly repayment schedule.</p>
      </header>

      <section className={styles.inputs} aria-label="Loan details">
        <SliderInput
          label="Loan amount"
          value={amount}
          min={10_000}
          max={10_000_000}
          step={10_000}
          onChange={setAmount}
          format={formatINR}
          unit="₹"
          unitPosition="prefix"
        />
        <SliderInput
          label="Tenure"
          value={years}
          min={1}
          max={30}
          step={1}
          onChange={setYears}
          format={(v) => `${v} ${v === 1 ? 'yr' : 'yrs'}`}
          unit="yrs"
        />
        <SliderInput
          label="Interest rate (p.a.)"
          value={rate}
          min={5}
          max={50}
          step={0.1}
          onChange={setRate}
          format={(v) => `${v}%`}
          unit="%"
        />
      </section>

      <SummaryCards
        emi={schedule[0].emi}
        totalInterest={totalInterest}
        totalPayment={amount + totalInterest}
      />

      <section className={styles.schedule}>
        <h2>
          Repayment schedule <span>{schedule.length} months</span>
        </h2>
        <ScheduleTable rows={schedule} />
      </section>
    </main>
  )
}

export default App
