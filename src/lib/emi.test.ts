import { describe, expect, it } from 'vitest'
import { buildSchedule, calculateEmi, formatINR } from './emi'

describe('calculateEmi', () => {
  it('matches the known EMI for ₹10 lakh at 8.5% over 5 years', () => {
    expect(calculateEmi(1_000_000, 8.5, 5)).toBeCloseTo(20516.52, 1)
  })

  it('splits the principal evenly at 0% interest', () => {
    expect(calculateEmi(120_000, 0, 1)).toBe(10_000)
  })
})

describe('buildSchedule', () => {
  const cases: [number, number, number][] = [
    [1_000_000, 8.5, 5],
    [10_000, 5, 1],
    [10_000_000, 50, 30],
    [10_000_000, 5, 30],
  ]

  it.each(cases)('P=%d rate=%d years=%d has one row per month', (p, rate, years) => {
    expect(buildSchedule(p, rate, years)).toHaveLength(years * 12)
  })

  it.each(cases)('P=%d rate=%d years=%d ends at exactly ₹0', (p, rate, years) => {
    const rows = buildSchedule(p, rate, years)
    expect(rows.at(-1)!.remaining).toBe(0)
    expect(rows.at(-1)!.paid).toBeCloseTo(p, 4)
  })

  it.each(cases)('P=%d rate=%d years=%d keeps every row consistent', (p, rate, years) => {
    const emi = calculateEmi(p, rate, years)
    for (const row of buildSchedule(p, rate, years)) {
      for (const v of Object.values(row)) expect(Number.isFinite(v)).toBe(true)
      expect(row.paid + row.remaining).toBeCloseTo(p, 4)
      expect(row.interest + row.principal).toBeCloseTo(row.emi, 6)
      // The final month absorbs accumulated float drift (< 1 paisa even at 50% over 30 years).
      expect(row.emi).toBeCloseTo(emi, 1)
    }
  })
})

describe('formatINR', () => {
  it('uses Indian digit grouping and whole rupees', () => {
    expect(formatINR(1_000_000)).toBe('₹10,00,000')
    expect(formatINR(20516.52)).toBe('₹20,517')
  })
})
