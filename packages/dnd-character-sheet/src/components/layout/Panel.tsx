import { cn } from '@ageorgedev/toolbelt/cn'
import { useMemo } from 'react'
import styles from './Panel.module.css'

type Corner = 'scooped' | 'regular'

export type PanelProps = {
  outerClasses?: string

  topLeftCorner?: Corner
  topRightCorner?: Corner
  bottomRightCorner?: Corner
  bottomLeftCorner?: Corner
} & React.HTMLAttributes<HTMLDivElement>

export function Panel({
  topLeftCorner = 'regular',
  topRightCorner = 'regular',
  bottomRightCorner = 'regular',
  bottomLeftCorner = 'regular',
  className,
  outerClasses,
  ...rest
}: PanelProps) {
  const cornerStyles = useMemo(
    () => [
      topLeftCorner === 'scooped'
        ? styles.scoopedTopLeft
        : styles.regularTopLeft,
      topRightCorner === 'scooped'
        ? styles.scoopedTopRight
        : styles.regularTopRight,
      bottomRightCorner === 'scooped'
        ? styles.scoopedBottomRight
        : styles.regularBottomRight,
      bottomLeftCorner === 'scooped'
        ? styles.scoopedBottomLeft
        : styles.regularBottomLeft,
    ],
    [topLeftCorner, topRightCorner, bottomRightCorner, bottomLeftCorner]
  )

  return (
    <div className={cn(styles.panelWrapper, cornerStyles, outerClasses)}>
      <div
        {...rest}
        className={cn(
          styles.panelRoot,
          cornerStyles,
          'bg-white h-full',
          className
        )}
      />
    </div>
  )
}
