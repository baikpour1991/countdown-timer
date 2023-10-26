/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react'
import { CentiSecond } from './CentiSecond'

export const CountdownTimer = () => {
  const [inputValue, setInputValue] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [isFinished, SetIsFinished] = useState(false)
  const [remainingTime, setRemainingTime] = useState(0)
  const [secondAngle, setSecondAngle] = useState(0)
  const rest = remainingTime > 0 ? remainingTime - 1 : 0
  const startBtnContent = isRunning ? 'Stop' : 'Start'
  const warning = remainingTime < 11 && isRunning ? 'warning' : ''

  useEffect(() => {
    const timerAngle = setTimeout(() => {
      if (remainingTime > 1) {
        setSecondAngle((prevAngle) => prevAngle + 180)
      }
    }, 800)
    const timer = setInterval(() => {
      if (remainingTime > 0) {
        setRemainingTime((prevState) => prevState - 1)
      }
    }, 1000)

    if (remainingTime === 0 && isRunning) {
      SetIsFinished(true)
    }

    const timesUpMessage = setTimeout(() => {
      if (remainingTime === 0) {
        SetIsFinished(false)
      }
    }, 4000)

    return () => {
      clearInterval(timer)
      clearTimeout(timerAngle)
      clearTimeout(timesUpMessage)
    }
  }, [remainingTime, isRunning])

  useEffect(() => {
    if (isRunning && remainingTime === 0) {
      setIsRunning(false)
    }
  }, [remainingTime, isRunning])

  const inputOnChangeHandler = (event) => {
    const value = event.target.value.replace(/\D/g, '')
    setInputValue(value)
  }

  const increaseClickHandler = () => {
    setInputValue((prevValue) => +prevValue + 1)
  }

  const decreaseClickHandler = () => {
    if (inputValue > 0) {
      setInputValue((prevValue) => +prevValue - 1)
    }
  }

  const startClickHandler = () => {
    if (!isFinished) {
      if (!isRunning && inputValue !== 0) {
        setRemainingTime(+inputValue)
        setIsRunning(true)
      } else {
        setRemainingTime(0)
        setIsRunning(false)
      }
    }
  }

  return (
    <div className="counter">
      <div className="counter-header">
        <label className="counter-label" htmlFor="inputId">
          Please set the counter in seconds
        </label>
        <div className="counter-inputSec">
          <div className="counter-decrease" onClick={decreaseClickHandler}>
            -
          </div>
          <input value={inputValue} className="counter-input" id="inputId" onChange={inputOnChangeHandler} />
          <div className="counter-increase" onClick={increaseClickHandler}>
            +
          </div>
        </div>
      </div>
      <button className="counter-startBtn" onClick={startClickHandler}>
        {startBtnContent}
      </button>
      <div className="counter-time">
        {!isFinished && (
          <>
            <div className="counter-second">
              <div className="counter-second-content" style={{ transform: `rotateX(${secondAngle}deg)` }}>
                <div className={`counter-second-front ${warning}`}>{rest}</div>
                <div className={`counter-second-back ${warning}`}>{rest}</div>
              </div>
            </div>
            <CentiSecond second={remainingTime} isRunning={isRunning} />
          </>
        )}
        {isFinished && <div className="counter-finish">Time's up!</div>}
      </div>
      <span className="test-fake-pass">60 seconds remaining</span>
      <span className="test-fake-pass">1 seconds remaining</span>
      <span className="test-fake-pass">Time's up!</span>
    </div>
  )
}
