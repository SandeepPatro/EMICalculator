import { useId, useState, type CSSProperties } from 'react'
import styles from './SliderInput.module.css'

type Props = {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (value: number) => void
  /** Formats the min/max captions under the slider. */
  format?: (value: number) => string
  /** Short unit shown inside the number box, e.g. "₹", "yrs", "%". */
  unit?: string
  unitPosition?: 'prefix' | 'suffix'
}

function clampToStep(raw: number, min: number, max: number, step: number): number {
  const clamped = Math.min(max, Math.max(min, raw))
  const snapped = min + Math.round((clamped - min) / step) * step
  const decimals = (String(step).split('.')[1] ?? '').length
  return Number(Math.min(max, snapped).toFixed(decimals))
}

export function SliderInput({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format = String,
  unit,
  unitPosition = 'suffix',
}: Props) {
  const id = useId()
  // While the user is typing, keep their raw text; commit (clamp + snap) on blur or Enter.
  const [draft, setDraft] = useState<string | null>(null)

  const commit = () => {
    if (draft === null) return
    const parsed = Number(draft)
    if (draft.trim() !== '' && Number.isFinite(parsed)) {
      onChange(clampToStep(parsed, min, max, step))
    }
    setDraft(null)
  }

  const fill = ((value - min) / (max - min)) * 100

  return (
    <div className={styles.field}>
      <div className={styles.header}>
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        <div className={styles.box}>
          {unit && unitPosition === 'prefix' && <span className={styles.unit}>{unit}</span>}
          <input
            id={id}
            type="number"
            inputMode="decimal"
            className={styles.number}
            min={min}
            max={max}
            step={step}
            value={draft ?? value}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') commit()
              if (e.key === 'Escape') setDraft(null)
            }}
          />
          {unit && unitPosition === 'suffix' && <span className={styles.unit}>{unit}</span>}
        </div>
      </div>
      <input
        type="range"
        aria-label={label}
        className={styles.range}
        style={{ '--fill': `${fill}%` } as CSSProperties}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => {
          setDraft(null)
          onChange(Number(e.target.value))
        }}
      />
      <div className={styles.bounds}>
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  )
}
