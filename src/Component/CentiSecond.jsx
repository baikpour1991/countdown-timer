import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

export const CentiSecond = ({ second, isRunning }) => {
  const [centiSecond, setCentiSecond] = useState(0)
  const prettyZero = centiSecond < 10 ? '0' : ''

  useEffect(() => {
    if (second > 0) {
      setCentiSecond(99)
    }
  }, [second])

  useEffect(() => {
    const timer = setInterval(() => {
      if (centiSecond > 0) {
        setCentiSecond((prevState) => prevState - 1)
      }
      if (!isRunning) {
        setCentiSecond(0)
      }
    }, 10)
    return () => {
      clearInterval(timer)
    }
  }, [centiSecond, isRunning])
  return (
    <div className="counter-centiSecond">
      {prettyZero}
      {centiSecond}
    </div>
  )
}

CentiSecond.propTypes = {
  second: PropTypes.number.isRequired,
  isRunning: PropTypes.bool.isRequired,
}
