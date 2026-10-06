export type ScheduleRow = {
  month: number
  emi: number
  interest: number
  principal: number
  /** Cumulative principal repaid so far. */
  paid: number
  remaining: number
}

export function calculateEmi(principal: number, annualRate: number, years: number): number {
  const r = annualRate / 12 / 100
  const n = years * 12
  if (r === 0) return principal / n
  const growth = (1 + r) ** n
  return (principal * r * growth) / (growth - 1)
}

export function buildSchedule(principal: number, annualRate: number, years: number): ScheduleRow[] {
  const r = annualRate / 12 / 100
  const n = years * 12
  const emi = calculateEmi(principal, annualRate, years)
  const rows: ScheduleRow[] = []
  let balance = principal
  let paid = 0

  for (let month = 1; month <= n; month++) {
    const interest = balance * r
    // Pay off exactly what's left on the last month so floating-point drift doesn't leave a stray paisa.
    const principalPart = month === n ? balance : emi - interest
    balance = month === n ? 0 : balance - principalPart
    paid += principalPart
    rows.push({
      month,
      emi: principalPart + interest,
      interest,
      principal: principalPart,
      paid,
      remaining: balance,
    })
  }
  return rows
}

const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

export function formatINR(value: number): string {
  return inr.format(value)
}
