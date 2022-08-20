import * as React from 'react'

export default function useDailyCountdown(difference: number) {
  const [currentDifference, setCurrentDifference] = React.useState(difference)
  const [tick, setTick] = React.useState(0)
  const [countdown, setCountdown] = React.useState({
    hours: Math.floor(difference / 1000 / 60 / 60)
      .toString()
      .padStart(2, '0'),
    minutes: (Math.floor(difference / 1000 / 60) % 60)
      .toString()
      .padStart(2, '0'),
    seconds: (Math.floor(difference / 1000) % 60).toString().padStart(2, '0'),
  })

  React.useEffect(() => {
    setCurrentDifference(difference)
  }, [difference])

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTick((prevTime) => prevTime + 1)
      const newDifference = currentDifference - 1000 * tick
      if (newDifference < 0) {
        // Reset the daily countdown if the target time has passed.
        setCurrentDifference(86399000)
      } else {
        setCountdown({
          hours: Math.floor(newDifference / 1000 / 60 / 60)
            .toString()
            .padStart(2, '0'),
          minutes: (Math.floor(newDifference / 1000 / 60) % 60)
            .toString()
            .padStart(2, '0'),
          seconds: (Math.floor(newDifference / 1000) % 60)
            .toString()
            .padStart(2, '0'),
        })
      }
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [currentDifference, difference, tick])
  return countdown
}
